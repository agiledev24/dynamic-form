import "@testing-library/react/dont-cleanup-after-each";
import {
  render,
  screen,
  queryByAttribute,
  fireEvent,
  RenderResult,
  cleanup,
} from "@testing-library/react";

import App from "./App";

const getById = queryByAttribute.bind(null, "id");

let renderResult: RenderResult;
let submitBtn: HTMLElement;

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const ERROR_MSG_SELECTOR = ".text-red-500.text-xs.italic";

const FIRST_NAME = "Hello";
const LAST_NAME = "World";
const EMAIL_ADDRESS = "helloworld@gmail.com";
const CITY = "Miami";
const VALID_PHONE_NUMBER = "111-234-5678";
const INVLAID_PHONE_NUMBER = "234-5678";
const JOB_TITLE = "Engineer - front end focused";

describe("Testing App", () => {
  afterAll(() => {
    cleanup();
  });
  test("Should Render Submission Form", () => {
    renderResult = render(<App />);
    const submissionForm = screen.getByTestId("submission-form");
    expect(submissionForm).toBeInTheDocument();

    const thanksForms = screen.queryAllByTestId("thanks-form");
    expect(thanksForms.length).toBe(0);
  });
  test("Should render submit button", () => {
    submitBtn = screen.getByText(/Submit/);
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toHaveAttribute("type", "submit");
    expect(submitBtn).toBeEnabled();
  });

  test("Setting Inputs", () => {
    const firstNameInput = screen.getByPlaceholderText("First name");
    const lastNameInput = screen.getByPlaceholderText("Last name");
    const emailInput = renderResult.container.querySelector(
      "#email"
    ) as Element;
    const cityInput = getById(renderResult.container, "city") as Element;
    const phoneInput = getById(renderResult.container, "phone") as Element;

    fireEvent.change(firstNameInput, { target: { value: FIRST_NAME } });
    fireEvent.change(lastNameInput, { target: { value: LAST_NAME } });
    fireEvent.change(emailInput, { target: { value: EMAIL_ADDRESS } });
    fireEvent.change(cityInput, { target: { value: CITY } });
    fireEvent.change(phoneInput, { target: { value: INVLAID_PHONE_NUMBER } });

    expect((firstNameInput as any).value).toBe(FIRST_NAME);
    expect((lastNameInput as any).value).toBe(LAST_NAME);
    expect((emailInput as any).value).toBe(EMAIL_ADDRESS);
    expect((cityInput as any).value).toBe(CITY);
    expect((phoneInput as any).value).toBe(INVLAID_PHONE_NUMBER);
  });
  test("Submitting Invalid", async () => {
    fireEvent.click(submitBtn);

    //because I created submit function as a async, we can't get the exact value right after the submission
    await sleep(1000);
    //it's time to check

    //Invalid job title
    const jobTitleRequired = screen.getByText("jobTitle is required");
    expect(jobTitleRequired).toBeEnabled();

    //Invalid phone number
    const invalidPhoneNumber = screen.getByText("Invalid phone");
    expect(invalidPhoneNumber).toBeEnabled();

    //Invalid inputs are only two
    const invalidInputs =
      renderResult.container.querySelectorAll(ERROR_MSG_SELECTOR);
    expect(invalidInputs.length).toBe(2);
  });

  test("Updating Phone Number", async () => {
    const phoneInput = getById(renderResult.container, "phone") as Element;
    fireEvent.change(phoneInput, { target: { value: VALID_PHONE_NUMBER } });

    fireEvent.click(submitBtn);

    //because I created submit function as a async, we can't get the exact value right after the submission
    await sleep(1000);

    //it's time to check
    const invalidInputs =
      renderResult.container.querySelectorAll(ERROR_MSG_SELECTOR);
    expect(invalidInputs.length).toBe(1);
  });
  test("Submitting Valid form", async () => {
    //updating job title
    const jobTitle = getById(renderResult.container, "jobTitle") as Element;
    fireEvent.change(jobTitle, { target: { value: JOB_TITLE } });

    fireEvent.click(submitBtn);

    //because I created submit function as a async, we can't get the exact value right after the submission
    await sleep(1000);

    //it's time to check
    const invalidInputs =
      renderResult.container.querySelectorAll(ERROR_MSG_SELECTOR);
    expect(invalidInputs.length).toBe(0);

    const thanksForm = screen.getByTestId("thanks-form");
    expect(thanksForm).toBeInTheDocument();
  });

  test("Checking Values in ThanksPage", () => {
    const thanksForm = screen.getByTestId("thanks-form");
    expect((thanksForm.querySelector("#firstName") as any).value).toBe(
      FIRST_NAME
    );
    expect((thanksForm.querySelector("#lastName") as any).value).toBe(
      LAST_NAME
    );
    expect((thanksForm.querySelector("#email") as any).value).toBe(
      EMAIL_ADDRESS
    );
    expect((thanksForm.querySelector("#address1") as any).value).toBe("");
    expect((thanksForm.querySelector("#city") as any).value).toBe(CITY);
    expect((thanksForm.querySelector("#state") as any).value).toBe("");
    expect((thanksForm.querySelector("#zip") as any).value).toBe("");
    expect((thanksForm.querySelector("#phone") as any).value).toBe(
      VALID_PHONE_NUMBER
    );
    expect((thanksForm.querySelector("#jobTitle") as any).value).toBe(
      JOB_TITLE
    );
  });
});
