import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormLanguageState {
  language: string;
}

const initialState: FormLanguageState = {
  language: 'en',
};

const formLanguageSlice = createSlice({
  name: 'form-language',
  initialState,
  reducers: {
    setFormLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setFormLanguage } = formLanguageSlice.actions;
export default formLanguageSlice.reducer;
