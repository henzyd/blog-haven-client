import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "~/components/fields/form-field";
import { Button } from "~/components/ui/button";

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
      client:load
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async () => {}}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col gap-4"
        >
          <FormField name="title" label="Title" />
          <FormField name="subtitle" label="Subtitle" />
          <FormField name="subtitle" label="Description" />

          <Button isLoading={isSubmitting} type="submit" className="self-end">
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
}
