import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";

interface FormState {
  id: string;
  title: string;
  first_name: string;
  last_name: string;
  birth_day: Dayjs | null;
  nationality: string;
  citizen: string;
  gender: string;
  mobile_phone: {
    country_code: string;
    number: string;
  };
  passport_no: string;
  expected_salary: number | "";
}

const initialState: FormState = {
  id: "",
  title: "",
  first_name: "",
  last_name: "",
  birth_day: null,
  nationality: "",
  citizen: "",
  gender: "",
  mobile_phone: {
    country_code: "",
    number: "",
  },
  passport_no: "",
  expected_salary: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
  },
});

export const { setFormData, resetForm } = formSlice.actions;
export default formSlice.reducer;
