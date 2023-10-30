import formReducer from "./slices/form";
import { submit } from "./slices/form";
import { configureStore } from "@reduxjs/toolkit";

const SAMPLE_DATA = {
  FirstName: "Hello",
  LastName: "World",
  Email: "helloworld@gmail.com",
  phone: "(111)123-4567",
};
describe("Form Save Test", () => {
  test("Saving into Redux", () => {
    const store = configureStore({
      reducer: formReducer,
    });
    store.dispatch(submit(SAMPLE_DATA));

    const data = store.getState();
    expect(data).toStrictEqual(SAMPLE_DATA);
  });
});
