import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";

import { ICategory, StatusType, IApiGetCategories, IApiAddCategory } from "@/@types";

interface CategoriesSliceInterface {
  incomeCategories: ICategory[] | [];
  expenseCategories: ICategory[] | [];
  status: StatusType;
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

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (category: ICategory) => {
    const { data } = await axios.post<IApiAddCategory>("/api/categories", category);

    return data;
  },
);

export const deleteCategory = createAsyncThunk("categories/deleteCategory", async (id: string) => {
  const { data } = await axios.delete(`/api/categories/${id}`);

  return data;
});

const initialState: CategoriesSliceInterface = {
  incomeCategories: [],
  expenseCategories: [],
  status: StatusType.HOLD,
  message: "",
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomeCategories.pending, (state) => {
        state.status = StatusType.LOADING;
        state.message = "";
      })
      .addCase(fetchIncomeCategories.fulfilled, (state, action) => {
        state.incomeCategories = action.payload.data;
        state.status = StatusType.SUCCESS;
        state.message = "";
      })
      .addCase(fetchIncomeCategories.rejected, (state) => {
        state.status = StatusType.ERROR;
        state.message = "Income categories fetch failed!";
      })
      .addCase(fetchExpenseCategories.pending, (state) => {
        state.status = StatusType.LOADING;
        state.message = "";
      })
      .addCase(fetchExpenseCategories.fulfilled, (state, action) => {
        state.expenseCategories = action.payload.data;
        state.status = StatusType.SUCCESS;
        state.message = "";
      })
      .addCase(fetchExpenseCategories.rejected, (state) => {
        state.status = StatusType.ERROR;
        state.message = "Expense categories fetch failed!";
      })
      .addCase(addCategory.pending, (state) => {
        state.status = StatusType.LOADING;
        state.message = "";
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.status = StatusType.SUCCESS;
        state.message = "Category added successfully!";
      })
      .addCase(addCategory.rejected, (state) => {
        state.status = StatusType.ERROR;
        state.message = "Category not added!";
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = StatusType.LOADING;
        state.message = "";
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.status = StatusType.SUCCESS;
        state.message = "Category deleted successfully!";
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.status = StatusType.ERROR;
        state.message = "Category not deleted!";
      });
  },
});

export const {} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
