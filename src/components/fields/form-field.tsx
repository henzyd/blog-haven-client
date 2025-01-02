"use client";

import { useState } from "react";
import { ErrorMessage, Field, type FieldConfig, type FieldProps } from "formik";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { Button } from "../ui/button";
import { Label, type LabelProps } from "../ui/label";
import { cn } from "~/lib/utils/helpers";
import { Input, type InputProps } from "../ui/input";
import { Textarea, type TextareaProps } from "../ui/textarea";

type Props = (InputProps & TextareaProps) &
  FieldConfig & {
    wrapperClassName?: string;
    label?: string;
    multiline?: boolean;
    row?: number;
    labelProps?: LabelProps;
  };

export default function FormField({
  className,
  wrapperClassName,
  color,
  required,
  multiline = false,
  row,
  type,
  label,
  labelProps,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field {...props}>
      {({ field }: FieldProps) => (
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
          {multiline ? (
            <Textarea rows={5} className={cn("w-full", className)} {...field} {...props} />
          ) : (
            <Input
              className={cn("w-full", className)}
              {...field}
              {...props}
              type={type === "password" ? (showPassword ? "text" : "password") : type}
              endAdornment={
                type === "password" && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <BsEyeSlash /> : <AiOutlineEye />}
                  </Button>
                )
              }
            />
          )}
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
