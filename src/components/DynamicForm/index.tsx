import {
  FieldValues,
  SubmitHandler,
  UseFormProps,
  Controller,
} from "react-hook-form";
import { useForm, UseFormReturn } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import type { RegisterOptions } from "react-hook-form/dist/types/validator";
import { FormField, FormFields } from "../../types/fields";
import { MutableRefObject, createRef } from "react";
import { validations } from "./validation";

export type FormValidation<T extends Record<string, any>> = Partial<
  Record<keyof T, RegisterOptions>
>;

export type DynamicFormProps<T extends FieldValues> = {
  defaultValues?: UseFormProps<T>["defaultValues"];
  fields: FormFields;
  allFieldsDisabled?: boolean;
  validation?: FormValidation<T>;
  onSubmit?: SubmitHandler<T>;
  autoFocus?: boolean;
};

const createInput = <T extends FieldValues>(
  methods: UseFormReturn<T>,
  field: FormField,
  disabled = false
) => {
  const { control, formState } = methods;
  const { id, required, placeholder, type } = field;

  const error = formState?.errors?.[id] as FieldError;

  const { message, type: errorType } = error || {};

  const errorMessage =
    message || (errorType === "required" ? `${id} is required` : undefined);

  const rules = {
    required,
    ...((validations as any)[type] || {}),
  };

  return (
    <Controller
      control={control}
      name={id as any}
      render={({ field: _field }) => {
        if (type === "select") {
          const className = `block appearance-none w-full bg-gray-200 border ${
            errorMessage ? "border-red-500 " : "border-gray-200"
          } text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`;

          return (
            <>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor={id}
              >
                {(placeholder || id).toUpperCase()}
                {required ? <span className="text-red-500">*</span> : ""}
              </label>
              <div className="relative">
                <select
                  disabled={disabled}
                  className={className}
                  id={id}
                  {..._field}
                  value={_field.value || ""}
                >
                  <option value="">{placeholder}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-xs italic">{errorMessage}</p>
              )}
            </>
          );
        } else {
          const className = `appearance-none block w-full bg-gray-200 text-gray-700 border ${
            errorMessage ? "border-red-500 " : "border-gray-200"
          } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`;
          return (
            <>
              <label
                htmlFor={id}
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                {" "}
                {id.toUpperCase()}{" "}
                {required ? <span className="text-red-500">*</span> : ""}
              </label>
              {type !== "textarea" && (
                <input
                  type="text"
                  id={id}
                  disabled={disabled}
                  className={className}
                  placeholder={placeholder}
                  {..._field}
                  value={_field.value || ""}
                />
              )}
              {type === "textarea" && (
                <textarea
                  id={id}
                  disabled={disabled}
                  className={className}
                  placeholder={placeholder}
                  {..._field}
                  value={_field.value || ""}
                />
              )}
              {errorMessage && (
                <p className="text-red-500 text-xs italic">{errorMessage}</p>
              )}
            </>
          );
        }
      }}
      rules={rules}
    />
  );
};

const createElement = <T extends FieldValues>(
  methods: UseFormReturn<T>,
  fields: FormFields,
  allFieldsDisabled = false
) => {
  return fields.map((item, index) => {
    if (Array.isArray(item)) {
      return (
        <div key={index} className="flex flex-wrap -mx-3 mb-6">
          {item.map((field) => (
            <div
              key={field.id}
              className={`w-full md:flex-1 px-3 mb-6 md:mb-0`}
            >
              {createInput(methods, field, allFieldsDisabled)}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div key={item.id} className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            {createInput(methods, item, allFieldsDisabled)}
          </div>
        </div>
      );
    }
  });
};

const DynamicForm = <T extends FieldValues>({
  defaultValues,
  fields,
  onSubmit,
  allFieldsDisabled = false,
  formRef = createRef<UseFormReturn<T>>(),
}: DynamicFormProps<T> & {
  formRef?: MutableRefObject<UseFormReturn<T> | null>;
}) => {
  const methods = useForm<T>({ defaultValues });

  formRef.current = methods;

  return (
    <form
      className="w-full max-w-lg"
      onSubmitCapture={methods.handleSubmit(onSubmit || (() => {}))}
    >
      {createElement(methods, fields, allFieldsDisabled)}
    </form>
  );
};

export default DynamicForm;
