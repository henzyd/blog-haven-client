import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "~/components/fields/form-field";
import { Button } from "~/components/ui/button";
import FileField from "~/components/fields/file-field";
import { filterPrivateValues } from "~/lib/utils/helpers";
import BlogService from "~/lib/services/blog";
import { queryClient } from "~/providers/tanstack-query";

const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  subtitle: Yup.string().required("Subtitle is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed<File>()
    .required("Image is required")
    .test("fileType", `Each file must be a valid ${allowedFormats.join(", ")}`, (value) => {
      if (!value) return false;
      return allowedFormats.includes(value.type);
    })
    .test("fileSize", "File must be less than 5MB", (value) => {
      if (!value) return false;
      return value.size <= 5 * 1024 * 1024;
    }),
});

const initialValues: Record<"title" | "subtitle" | "description", string> & {
  image: File | null;
} = {
  title: "",
  subtitle: "",
  description: "",
  image: null,
};

export default function Form() {
  const { mutateAsync: createBlog } = useMutation(
    {
      mutationFn: BlogService.createBlog,
      onError: (error) => {
        if (isAxiosError(error)) {
          console.log(error);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["blogs"],
        });
      },
    },
    queryClient
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        const submissionValues = filterPrivateValues(values);
        await createBlog(submissionValues, {
          onSuccess: () => {
            resetForm();
          },
        });
      }}
      validateOnBlur={false}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} method="POST" className="flex flex-col gap-4">
          <FileField name="image" label={"Image"} required preview />
          <FormField name="title" label="Title" required />
          <FormField name="subtitle" label="Subtitle" required />
          <FormField name="description" label="Description" multiline required />
          <Button isLoading={isSubmitting} type="submit" className="mt-2 self-end">
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
}
