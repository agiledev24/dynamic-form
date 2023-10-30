import { FormFields } from "../../types/fields";

export const formFields: FormFields = [
  [
    {
      id: "firstName",
      placeholder: "First name",
      required: true,
      type: "text",
    },
    {
      id: "lastName",
      placeholder: "Last name",
      required: true,
      type: "text",
    },
  ],
  {
    id: "email",
    required: true,
    type: "email",
  },
  {
    id: "address1",
    placeholder: "Address 1",
    type: "text",
  },
  [
    {
      id: "city",
      type: "text",
    },
    {
      id: "state",
      type: "text",
    },
    {
      id: "zip",
      type: "text",
    },
  ],
  {
    id: "phone",
    required: true,
    type: "phone",
    placeholder: "111-111-1111",
  },
  {
    id: "jobTitle",
    options: [
      "Engineer - lead",
      "Engineer - mid level",
      "Engineer - junior",
      "Engineer - front end focused",
      "Engineer - backend focused",
      "Engineer - full stack",
    ],
    placeholder: "Please select job title",
    type: "select",
    required: true,
  },
  {
    id: "reason",
    placeholder:
      "Describe why you are a good fit for the job you are applying for.",
    type: "textarea",
  },
];
