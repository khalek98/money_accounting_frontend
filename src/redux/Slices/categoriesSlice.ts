import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";

import { ICategory, StatusType, IApiGetCategories } from "@/@types";

interface CategoriesSliceInterface {
  incomeCategories: ICategory[] | [];
  expenseCategories: ICategory[] | [];
  sataus: StatusType;
  message: string;
}

export const fetchIncomeCategories = createAsyncThunk<IApiGetCategories>(
  "categories/fetchIncomeCategories",
  async () => {
    const { data } = await axios.get<IApiGetCategories>("/api/categories/incomeList");

    return data;
  },
);

export const fetchExpenseCategories = createAsyncThunk<IApiGetCategories>(
  "categories/fetchExpenseCategories",
  async () => {
    const { data } = await axios.get<IApiGetCategories>("/api/categories/expenseList");

    return data;
  },
);

const initialState: CategoriesSliceInterface = {
  incomeCategories: [],
  expenseCategories: [],
  sataus: StatusType.HOLD,
  message: "",
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomeCategories.pending, (state) => {
        state.sataus = StatusType.LOADING;
        state.message = "";
      })
      .addCase(fetchIncomeCategories.fulfilled, (state, action) => {
        state.incomeCategories = action.payload.data;
        state.sataus = StatusType.SUCCESS;
        state.message = "";
      })
      .addCase(fetchIncomeCategories.rejected, (state) => {
        state.sataus = StatusType.ERROR;
        state.message = "Income categories fetch failed!";
      })
      .addCase(fetchExpenseCategories.pending, (state) => {
        state.sataus = StatusType.LOADING;
        state.message = "";
      })
      .addCase(fetchExpenseCategories.fulfilled, (state, action) => {
        state.expenseCategories = action.payload.data;
        state.sataus = StatusType.SUCCESS;
        state.message = "";
      })
      .addCase(fetchExpenseCategories.rejected, (state) => {
        state.sataus = StatusType.ERROR;
        state.message = "Expense categories fetch failed!";
      });
  },
});

export const {} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
