export type BasicFormField =
  | {
      type: "text" | "email" | "phone" | "number" | "password" | "textarea";
    }
  | {
      type: "select";
      options: (string | number)[];
    };

export type FormField = {
  id: string;
  required?: boolean;
  placeholder?: string;
} & BasicFormField;

export type FormFields = Array<FormField[] | FormField>;
