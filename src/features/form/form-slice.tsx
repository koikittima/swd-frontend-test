import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  title: string;
  first_name: string;
  last_name: string;
  birth_day: string | null; 
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
  },
});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;
