import {
  render,
  screen,
  renderHook,
  act,
  fireEvent,
} from "@testing-library/react";
// import fireEvent from '@testing-library/user-event'

import { validations } from "./validation";
import useDynamicForm from "./useDynamicForm";
import { FormFields } from "../../types/fields";

const formFields: FormFields = [
  {
    id: "firstName",
    placeholder: "First name",
    required: true,
    type: "text",
  },
  {
    id: "phone",
    required: true,
    type: "phone",
    placeholder: "111-111-1111",
  },
];

describe("Dynamic Form Test", () => {
  beforeAll(() => {});
  it("Invalid Phone Number 1", () => {
    const validRes = validations.phone.validate("+1 (111) 234-5678");
    expect(validRes).toBe("Invalid phone");
  });
  it("Invalid Phone Number 2", () => {
    const validRes = validations.phone.validate("+1 111 234-5678");
    expect(validRes).toBe("Invalid phone");
  });
  it("Invalid Phone Number 3", () => {
    const validRes = validations.phone.validate("234-5678");
    expect(validRes).toBe("Invalid phone");
  });
  it("Valid Phone Number 1", () => {
    const validRes = validations.phone.validate("(111) 234-5678");
    expect(validRes).toBe(undefined);
  });
  it("Valid Phone Number 2", () => {
    const validRes = validations.phone.validate("111-234-5678");
    expect(validRes).toBe(undefined);
  });
  it("Valid Phone Number 3", () => {
    const validRes = validations.phone.validate("1112345678");
    expect(validRes).toBe(undefined);
  });
  it("Valid Phone Number 4", () => {
    const validRes = validations.phone.validate("111 234 5678");
    expect(validRes).toBe(undefined);
  });
  it("Invalid Email Address 1", () => {
    const validRes = validations.email.validate("helloworld");
    expect(validRes).toBe("Invalid email");
  });
  it("Invalid Email Address 2", () => {
    const validRes = validations.email.validate("helloworld@gmail");
    expect(validRes).toBe("Invalid email");
  });
  it("Invalid Email Address 3", () => {
    const validRes = validations.email.validate("helloworld@gmail.");
    expect(validRes).toBe("Invalid email");
  });
  it("Valid Email Address 1", () => {
    const validRes = validations.email.validate("helloworld@gmail.com");
    expect(validRes).toBe(undefined);
  });
  it("Valid Email Address 2", () => {
    const validRes = validations.email.validate("hello.world@gmail.com");
    expect(validRes).toBe(undefined);
  });
  it("Valid Email Address 3", () => {
    const validRes = validations.email.validate("hello.world+1@gmail.com");
    expect(validRes).toBe(undefined);
  });
  it("Failed Submit", async () => {
    const submitFn = jest.fn();
    const { result } = renderHook(() =>
      useDynamicForm(async () => {
        submitFn();
      })
    );
    act(() => {
      render(<result.current.Form fields={formFields} />);
    });
    await act(async () => {
      await result.current.onSave();
    });
    //simulate submit button click
    expect(submitFn).toBeCalledTimes(0);
  });
  it("Success Submit", async () => {
    const submitFn = jest.fn();
    const { result } = renderHook(() =>
      useDynamicForm(async () => {
        submitFn();
      })
    );

    act(() => {
      render(<result.current.Form fields={formFields} />);
    });

    const firstNameInput = screen.getByPlaceholderText("First name");
    fireEvent.change(firstNameInput, { target: { value: "Hello" } });

    const phoneNumberInput = screen.getByPlaceholderText("111-111-1111");
    fireEvent.change(phoneNumberInput, { target: { value: "111-111-1111" } });
    await act(async () => {
      await result.current.onSave();
    });

    expect((firstNameInput as any).value).toBe("Hello");
    expect((phoneNumberInput as any).value).toBe("111-111-1111");

    expect(submitFn).toHaveBeenCalledTimes(1);
  });
});
