import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: Record<string, any> = {};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    submit: (state, action: PayloadAction<Record<string, any>>) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const { submit } = formSlice.actions;

export const getFormData = (state: RootState) => state.form;

const { reducer } = formSlice;
export default reducer;
