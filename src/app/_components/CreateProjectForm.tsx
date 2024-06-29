import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, DatePicker, Input, Spacer, Textarea, Link } from '@nextui-org/react';
import { today, getLocalTimeZone } from "@internationalized/date";
import { api } from "~/trpc/react";
import toast, { Toaster } from 'react-hot-toast';



export const CreateProjectForm = () => {

  const createProject = api.post.create.useMutation({
    onSuccess: (res) => {
      toast.success(res.message);
    },
  });


  const validationSchema = Yup.object({
    title: Yup.string()
      .max(100, 'Must be 100 characters or less')
      .required('Required'),
    imgTitle: Yup.string().max(50).required('Required'),
    description: Yup.string().required('Required'),
    budget: Yup.number().min(0, 'Must not be a negative budget').required('Required'),
    start: Yup.date().min(today(getLocalTimeZone()), 'Must not start earlier than today').required('Required'),
    end: Yup.date().min(today(getLocalTimeZone()), 'Cannot end earlier than today').required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      imgTitle: "",
      description: "",
      budget: 0,
      start: today(getLocalTimeZone()),
      end: today(getLocalTimeZone()),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const startDate = values.start.toDate("Asia/Singapore");
      const endDate = values.end.toDate("Asia/Singapore");
      const { start, end, ...remainValues } = values;
      const inputValues = { ...remainValues, startDate, endDate };
      createProject.mutate(inputValues);
      formik.setSubmitting(false);
      formik.resetForm();
    },
  });

  return (
    <section className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative px-12 py-12 mx-96 bg-white shadow rounded-3xl sm:p-10 min-h-6 min-w-6">
        <h2 className="mb-2 text-xl font-bold text-gray-700 dark:text-white"> Create a DevLink Journey</h2>

        <form onSubmit={formik.handleSubmit}>
          <Input type="text" isClearable isRequired name="title" label="Title" placeholder="Enter your title"
            value={formik.values.title}
            onChange={formik.handleChange}
            isDisabled={formik.isSubmitting}
            isInvalid={formik.touched.title && Boolean(formik.errors.title)}
            errorMessage={formik.errors.title}
            variant="underlined"
          /><Spacer x={0} y={2} />
          <Input type="text" isClearable isRequired name="imgTitle" label="imgTitle" placeholder="Enter a description for your project image to be generated"
            value={formik.values.imgTitle}
            onChange={formik.handleChange}
            isDisabled={formik.isSubmitting}
            isInvalid={formik.touched.imgTitle && Boolean(formik.errors.imgTitle)}
            errorMessage={formik.errors.imgTitle}
            variant="underlined"
          /><Spacer x={0} y={2} />
          <Textarea
            isRequired
            name="description"
            label="Description"
            placeholder="Enter your description"
            className="max-w-s"
            value={formik.values.description}
            onChange={formik.handleChange}
            isDisabled={formik.isSubmitting}
            isInvalid={formik.touched.description && Boolean(formik.errors.description)}
            errorMessage={formik.errors.description}
          /><Spacer x={0} y={2} />
          <Input type="number" step="0.1" isClearable isRequired name="budget" label="Budget" placeholder="Enter your title"
            value={formik.values.budget.toString()}
            onChange={formik.handleChange}
            isDisabled={formik.isSubmitting}
            isInvalid={formik.touched.budget && Boolean(formik.errors.budget)}
            errorMessage={formik.errors.budget}
            variant="underlined"
          /><Spacer x={0} y={2} />
          <DatePicker
            name="start"
            label="Start Date"
            isRequired
            minValue={today(getLocalTimeZone())}
            defaultValue={today(getLocalTimeZone())}
            className="max-w-xs"
            value={formik.values.start}
            onChange={(value) => {
              void formik.setFieldValue('start', value);
            }}
            isDisabled={formik.isSubmitting}
            isInvalid={formik.touched.start && Boolean(formik.errors.start)}
            errorMessage="Please enter a valid date"
          /><Spacer x={0} y={2} />
          <DatePicker
            name="end"
            label="End Date"
            isRequired
            minValue={today(getLocalTimeZone())}
            defaultValue={today(getLocalTimeZone())}
            className="max-w-xs"
            value={formik.values.end}
            onChange={(value) => {
              void formik.setFieldValue('end', value);
            }}
            isDisabled={formik.isSubmitting}
            isInvalid={formik.touched.end && Boolean(formik.errors.end)}
            errorMessage="Please enter a valid date"
          />
          <Spacer x={0} y={2} />
          <div className="inline-flex rounded-md shadow-sm">
            <Button color="primary" variant="ghost" type="submit">Submit</Button>
            <Spacer x={2} y={0} />
            <Button color="secondary" variant="ghost" type="button" as={Link} href='/dashboard' >Cancel</Button>
          </div>
        </form>
      </div>
      <Toaster />
    </section>
  );
};
