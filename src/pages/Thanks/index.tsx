import useDynamicForm from "../../components/DynamicForm/useDynamicForm";
import { useAppSelector } from "../../store/hooks";
import { formFields } from "../Submission/fields";

const Thanks = () => {
  const { Form } = useDynamicForm(async (data) => {});

  const formValues = useAppSelector((state) => state.form);

  return (
    <div className="flex justify-center p-8" data-testid="thanks-form">
      <div>
        <Form
          fields={formFields}
          defaultValues={formValues}
          allFieldsDisabled
        />
      </div>
    </div>
  );
};

export default Thanks;
