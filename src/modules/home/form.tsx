import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "~/components/fields/form-field";
import { Button } from "~/components/ui/button";
import FileField from "~/components/fields/file-field";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  subtitle: Yup.string().required("Subtitle is required"),
  description: Yup.string().required("Description is required"),
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
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async () => {}}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} method="POST" className="flex flex-col gap-4">
          <FileField name="image" label={"Image"} required preview />
          <FormField name="title" label="Title" />
          <FormField name="subtitle" label="Subtitle" />
          <FormField name="description" label="Description" />
          <Button isLoading={isSubmitting} type="submit" className="mt-2 self-end">
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
}
