
import { z } from "zod";
import { createTRPCRouter, db, publicProcedure } from "~/server/api/trpc";
import { createApi } from 'unsplash-js';
import type { Timestamp } from "firebase-admin/firestore";

interface AppProject {
  docid?: string;
  title: string;
  imgTitle: string;
  imageUrl: string;
  description: string;
  budget: number;
  startDate: string;
  endDate: string;
  interest?: number;
}

if (!process.env.UNSPLASH_KEY) {
  throw new Error('UNSPLASH_KEY environment variable is not defined.');
}


const unsplash = createApi({
  accessKey: process.env.UNSPLASH_KEY,
});

const DEFAULT_PHOTO_URL = "https://images.unsplash.com/photo-1520970519539-8fa53b242458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2Mjc5Mjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTk2MzU4OTZ8&ixlib=rb-4.0.3&q=80&w=1080";

async function getRandomPhotoUrl(inputTitle: string): Promise<string> {
  try {
    const encodedTitle = encodeURIComponent(inputTitle);
    const result = await unsplash.photos.getRandom({ query: encodedTitle, count: 1 });

    if (result.response) {
      const response = result.response;

      if (Array.isArray(response) && response.length > 0 && response[0]) {
        return response[0].urls.regular; // Get the regular-sized image URL from the first photo
      } else {
        console.error("No photos found");
        return DEFAULT_PHOTO_URL; // Return default photo URL if no photos found
      }
    } else {
      console.error("Response is undefined");
      return DEFAULT_PHOTO_URL; // Return default photo URL if response is undefined
    }
  } catch (error) {
    console.error("Error fetching random photo:", error);
    return DEFAULT_PHOTO_URL; // Return default photo URL on error
  }
}


export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      title: z.string().max(100),
      imgTitle: z.string().max(50),
      description: z.string(),
      budget: z.number(),
      startDate: z.date(),
      endDate: z.date(),
    }))
    .mutation(async ({ ctx, input }) => {
      const uid = ctx.headers.get('x-user-id') ?? "orphan";
      const newProjectRef = db.collection('projects').doc(uid).collection('journeys');
      try {
        const imageUrl = await getRandomPhotoUrl(input.imgTitle);
        console.log(imageUrl);
        await newProjectRef.add({ ...input, imageUrl });
        console.log(`${input.title} saved to db`)
        return { "status": "OK", "message": `OK project ${input.title} Created` };
      } catch (e) {
        console.error(e);
        return { "status": "Error", "message": `Error project ${input.title} Not Created` };
      }

    }),
  edit: publicProcedure
    .input(z.object({
      docid: z.string(),
      title: z.string().max(100),
      imgTitle: z.string().max(50),
      description: z.string(),
      budget: z.number(),
      startDate: z.date(),
      endDate: z.date(),
    }))
    .mutation(async ({ ctx, input }) => {
      const uid = ctx.headers.get('x-user-id') ?? "orphan";
      const newProjectRef = db.collection('projects').doc(uid).collection('journeys').doc(input.docid);
      try {
        const imageUrl = await getRandomPhotoUrl(input.imgTitle);
        console.log(imageUrl);
        await newProjectRef.set({ ...input, imageUrl });
        console.log(`${input.title} saved to db`)
        return { "status": "OK", "message": `OK project ${input.title} Created` };
      } catch (e) {
        console.error(e);
        return { "status": "Error", "message": `Error project ${input.title} Not Created` };
      }

    }),
  delete: publicProcedure
    .input(z.object({
      docid: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const uid = ctx.headers.get('x-user-id') ?? "orphan";
      const toDeleteProjectRef = db.collection('projects').doc(uid).collection('journeys').doc(input.docid);
      try {
       
        await toDeleteProjectRef.delete();
        console.log(`${input.docid} projected deleted to db`)
        return { "status": "OK", "message": `OK project ${input.docid} Deleted` };
      } catch (e) {
        console.error(e);
        return { "status": "Error", "message": `Error project${input.docid} Not Deleted` };
      }

    }),
  getProject: publicProcedure
    .input(z.object({
      docid: z.string()
    }))
    .query(
      async ({ ctx, input }) => {
        const uid = ctx.headers.get('x-user-id') ?? "orphan";
        const projectRef = db.collection('projects').doc(uid).collection('journeys').doc(input.docid);
        try {
          const doc = await projectRef.get();
          const project: AppProject = {
            docid: input.docid,
            title: "",
            imgTitle: "",
            imageUrl: "",
            description: "",
            budget: 0,
            startDate: "",
            endDate: "",
            interest: 0 // Optional property, no need for default value
          };
          if (doc.exists) {
            const data = doc.data() as AppProject;
            const startDate = (data.startDate as unknown as Timestamp).toDate().toISOString().split("T")[0];
            const endDate = (data.endDate as unknown as Timestamp).toDate().toISOString().split("T")[0];
            const returnProject: AppProject = {
              docid: input.docid,
              title: data.title,
              imgTitle: data.imgTitle,
              imageUrl: data.imageUrl,
              description: data.description,
              budget: data.budget,
              startDate: startDate ?? "",
              endDate: endDate ?? "",
              interest: data.interest // Optional property, no need for default value
            };
            return returnProject;
          }
          return project;
        } catch (e) {
          console.error(e);
          return { "status": "Error", "message": `unable to fetch project ${input.docid}` };
        }

      }),
  getProjects: publicProcedure.input(z.object({})).query(
    async ({ ctx }) => {
      console.log("called getProjects")
      const uid = ctx.headers.get('x-user-id') ?? "orphan";
      const projectRef = db.collection('projects').doc(uid).collection('journeys');
      const snapshot = await projectRef.get();
      const projectList: AppProject[] | PromiseLike<AppProject[]> = [];
      snapshot.forEach(element => {
        const id = element.id; // Get the document ID
        const data = element.data() as AppProject;
        const project: AppProject = {
          docid: id,
          title: data.title,
          imgTitle: data.imgTitle,
          imageUrl: data.imageUrl,
          description: data.description,
          budget: data.budget,
          startDate: data.startDate,
          endDate: data.endDate,
          interest: data.interest // Optional property
        };
        return projectList.push(project);
      });
      return projectList;

    }
  )
});
