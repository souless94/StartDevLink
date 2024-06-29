import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, DatePicker, Input, Spacer, Textarea, Image, Link, useDisclosure, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress } from '@nextui-org/react';
import { today, getLocalTimeZone, parseDate } from "@internationalized/date";
import { api } from "~/trpc/react";
import toast, { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';


export const EditProjectForm = () => {

  const uid = usePathname().split("/").at(-1) ?? "";
  const { data: project, isLoading, isError } = api.post.getProject.useQuery({ docid: uid });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const editProject = api.post.edit.useMutation({
    onSuccess: (res) => {
      toast.success(res.message);
    },
  });

  const deleteProject = api.post.delete.useMutation({
    onSuccess: (res) => {
      toast.success(res.message);
    },
  });

  const deleteProjectHandler = () => {

    if (formik.isSubmitting) {
      deleteProject.mutate({ docid: uid });
      formik.setSubmitting(false);
      formik.resetForm();
    }
  }
  useEffect(() => {
    if (isError || !project || 'status' in project) {
      toast.error("Failed to fetch data");
    }
  }, [isError, project]);

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(100, 'Must be 100 characters or less')
      .required('Required'),
    imgTitle: Yup.string().max(50).required('Required'),
    description: Yup.string().required('Required'),
    budget: Yup.number().min(0, 'Must not be a negative budget').required('Required'),
    start: Yup.date().required('Required'),
    end: Yup.date().min(today(getLocalTimeZone()), 'Cannot end earlier than today').required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      imgTitle: "",
      description: "",
      budget: 0,
      start: today(getLocalTimeZone()), // Set default if startDate is not available
      end: today(getLocalTimeZone()), // Set default if endDate is not available
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const docid = uid;
      const startDate = values.start.toDate("Asia/Singapore");
      const endDate = values.end.toDate("Asia/Singapore");
      const { start, end, ...remainValues } = values;
      const inputValues = { ...remainValues, startDate, endDate, docid };
      if (formik.isSubmitting) {
        editProject.mutate(inputValues);
        formik.setSubmitting(false);
        formik.resetForm();
      }
    },
  });
  useEffect(() => {
    if (project && !('status' in project)) {
      // Update Formik values only once when project is valid and doesn't have a 'status' property , hence not putting in the useEffect dependency
      void formik.setValues({
        title: project.title ?? "",
        imgTitle: project.imgTitle ?? "",
        description: project.description ?? "",
        budget: project.budget ?? 0,
        start: project.startDate ? parseDate(project.startDate) : today(getLocalTimeZone()),
        end: project.endDate ? parseDate(project.endDate) : today(getLocalTimeZone()),
      });
    }
  }, [project]);

  // Handle loading state or errors
  if (isLoading) {
    return <Progress
      size="md"
      isIndeterminate
      aria-label="Loading..."
      className="max-w-full"
    />;
  }

  if (isError || !project || 'status' in project) {
    return <div>Error fetching data</div>;
  }


  return (
    <section className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative px-12 py-12 mx-96 bg-white shadow rounded-3xl sm:p-10 min-h-6 min-w-6">
        <h2 className="mb-2 text-xl font-bold text-gray-700 dark:text-white"> Change a DevLink Journey</h2>
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={project.imgTitle}
          className="w-full object-cover h-[250px]"
          src={project.imageUrl}
        />
        <form onSubmit={formik.handleSubmit}>
          <Input type="text" isClearable isRequired name="title" label="Title" placeholder="Enter your title"
            value={formik.values.title}
            onChange={formik.handleChange}
            isDisabled={formik.isSubmitting}
            isInvalid={formik.touched.title && Boolean(formik.errors.title)}
            errorMessage={formik.errors.title}
            variant="underlined"
          /><Spacer x={0} y={2} />
          <Input type="text" isClearable isRequired name="imgTitle" label="imgTitle" placeholder="Enter your description for your project image"
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

            <Spacer x={2} y={0} />

            <Button variant="ghost" color="danger" onPress={onOpen}>Delete</Button>
          </div>
        </form>
      </div>
      <Toaster />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader className="flex flex-col gap-1">You are about to delete this StartDevLink Journey</ModalHeader>
              <ModalBody>Press Confirm to delete project</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="ghost" onPress={deleteProjectHandler}>
                  Confirm
                </Button>
                <Button color="primary" variant="ghost" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </div>)}
        </ModalContent>
      </Modal>
    </section>
  );
};
