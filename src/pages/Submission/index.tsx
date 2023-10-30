import { useNavigate } from "react-router-dom";
import useDynamicForm from "../../components/DynamicForm/useDynamicForm";
import { useAppDispatch } from "../../store/hooks";
import { submit } from "../../store/slices/form";
import { formFields } from "./fields";

const Submission = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { Form, onSave } = useDynamicForm(async (data) => {
    dispatch(submit(data));
    navigate("/thanks");
  });

  return (
    <div className="flex justify-center p-8" data-testid="submission-form">
      <div>
        <Form fields={formFields} />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onSave}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Submission;
