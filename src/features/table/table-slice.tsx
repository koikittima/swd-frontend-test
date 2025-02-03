import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";

export interface TableEntry {
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

const mockData: TableEntry[] = Array.from({ length: 12 }, (_, i) => ({
  id: `mock-${i + 1}`,
  title: i % 2 === 0 ? "mr" : "ms",
  first_name: `First${i + 1}`,
  last_name: `Last${i + 1}`,
  birth_day: i % 2 === 0 ? dayjs() : null,
  nationality: i % 2 === 0 ? "thai" : "american",
  citizen: "1234567890123",
  gender: i % 2 === 0 ? "male" : "female",
  mobile_phone: { country_code: "66", number: `08123456${i % 10}` },
  passport_no: `AB12345${i}`,
  expected_salary: 50000 + i * 1000,
}));

const loadFromLocalStorage = (): TableEntry[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("tableData");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return [];
  }
};

const saveToLocalStorage = (data: TableEntry[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("tableData", JSON.stringify(data));
  }
};

const initialState: TableEntry[] = (() => {
  const storedData = loadFromLocalStorage();
  return storedData.length ? storedData : mockData;
})();

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<TableEntry>) => {
      state.push(action.payload);
      saveToLocalStorage(state);
    },

    updateEntry: (state, action: PayloadAction<TableEntry>) => {
      const index = state.findIndex((entry) => entry.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        saveToLocalStorage(state);
      }
    },

    deleteEntry: (state, action: PayloadAction<string>) => {
      const updatedState = state.filter((entry) => entry.id !== action.payload);
      saveToLocalStorage(updatedState);
      return updatedState;
    },
  },
});

export const { addEntry, updateEntry, deleteEntry } = tableSlice.actions;
export default tableSlice.reducer;
