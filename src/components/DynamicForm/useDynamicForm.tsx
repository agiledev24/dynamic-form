import { FieldValues } from "react-hook-form";
import { UseFormReturn } from "react-hook-form";
import { MutableRefObject, useCallback, useMemo, useRef } from "react";
import DynamicForm, { DynamicFormProps } from ".";

const useDynamicForm = <T extends FieldValues>(
  fn: (data: T) => Promise<void>
) => {
  const formRef = useRef<UseFormReturn<T>>() as MutableRefObject<
    UseFormReturn<T>
  >;

  const onSaveRef = useRef((() => {
    if (!formRef?.current?.formState?.isSubmitting) {
      return formRef?.current?.handleSubmit((data) => fn?.(data as never))();
    }
  }) as () => Promise<void>);

  const Form = useCallback(
    (props: DynamicFormProps<T>) => (
      <DynamicForm formRef={formRef} {...props} />
    ),
    []
  );

  return useMemo(
    () => ({
      formRef,
      onSave: onSaveRef.current,
      Form,
    }),
    [Form]
  );
};

export default useDynamicForm;
