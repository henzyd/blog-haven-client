"use client";

import { useEffect, useRef } from "react";
import { ErrorMessage, Field, type FieldConfig, type FieldProps, useField } from "formik";
import { Label, type LabelProps } from "../ui/label";
import { Input, type InputProps } from "../ui/input";
import { cn } from "~/lib/utils/helpers";

type Props = InputProps &
  FieldConfig & {
    accept?: string;
    wrapperClassName?: string;
    preview?: boolean;
    label?: string;
    labelProps?: LabelProps;
  };

export default function FileField({
  className,
  wrapperClassName,
  required,
  label,
  preview = false,
  accept = "image/png, image/jpeg, image/jpg",
  labelProps,
  ...props
}: Props) {
  const [nameField] = useField(`_${props.name}_name`);
  const [base64StrField] = useField(`_${props.name}_base64`);

  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const objectUrl = useRef<string>(null);

  useEffect(() => {
    return () => {
      if (objectUrl.current) {
        URL.revokeObjectURL(objectUrl.current);
      }
    };
  }, []);

  return (
    <Field {...props}>
      {({ field, form }: FieldProps) => (
        <div className={cn("flex w-full flex-col gap-1", wrapperClassName)}>
          {(label || labelProps) && (
            <div className="flex w-full items-center justify-between">
              <Label
                {...labelProps}
                htmlFor={props.name}
                className={cn(`!text-xs`, labelProps?.className)}
              >
                {label || labelProps?.children}
                {required && <span className="pl-1 !text-xs !text-red-600">*</span>}
              </Label>
            </div>
          )}
          <Input
            className={cn("w-full [&_*]:!cursor-pointer", className)}
            {...field}
            {...props}
            value={
              field.value
                ? `${nameField.value} ${
                    field.value instanceof File
                      ? `(${(field.value.size / 1024 / 1024).toFixed(2)} MB)`
                      : ""
                  }`
                : nameField.value || ""
            }
            placeholder="Click to upload"
            onClick={() => hiddenInputRef.current?.click()}
            readOnly
          />
          {preview && (field.value || base64StrField.value) && (
            <img
              src={base64StrField.value || "File Selected"}
              width={150}
              height={150}
              className="mt-2 block rounded border border-slate-200 p-1"
              alt={nameField.value || "File Selected"}
            />
          )}
          <input
            type="file"
            ref={hiddenInputRef}
            className="hidden"
            accept={accept}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const maxSize = 5 * 1024 * 1024;
                if (file.size > maxSize) {
                  form.setFieldError(props.name, "File size must be less than 5MB");
                  return;
                }

                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  form.setFieldValue(props.name, file);
                  form.setFieldValue(`_${props.name}_name`, file.name);
                  form.setFieldValue(`_${props.name}_base64`, reader.result);
                };
              }
            }}
          />
          <ErrorMessage
            name={props.name}
            className={`pl-1 !text-xs !font-medium !text-red-600`}
            component={"p"}
          />
        </div>
      )}
    </Field>
  );
}
