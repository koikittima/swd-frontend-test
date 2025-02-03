import { configureStore } from '@reduxjs/toolkit';
import formLanguageReducer from './features/form/form-language';
import formReducer from './features/form/form-slice';
import tableReducer from './features/table/table-slice';

export const store = configureStore({
  reducer: {
    formLanguage: formLanguageReducer,  
    form: formReducer,
    table: tableReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

