import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";

import { ITransaction, StatusType, IApiGetTransactions, IApiAddTransaction } from "@/@types";

interface TransactionsSliceInterface {
  incomeTransactions: ITransaction[] | [];
  expenseTransactions: ITransaction[] | [];
  sataus: StatusType;
  message: string;
}

export const fetchTransactions = createAsyncThunk<IApiGetTransactions>(
  "transactions/fetchTransactions",
  async () => {
    const { data } = await axios.get<IApiGetTransactions>("/api/transactions");

    return data;
  },
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction: ITransaction) => {
    const { data } = await axios.post<IApiAddTransaction>("/api/transactions", transaction);

    return data;
  },
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id: string) => {
    const { data } = await axios.delete(`/api/transactions/${id}`);

    return data;
  },
);

const initialState: TransactionsSliceInterface = {
  incomeTransactions: [],
  expenseTransactions: [],
  sataus: StatusType.HOLD,
  message: "",
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.sataus = StatusType.LOADING;
        state.message = "";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        const incomeTransactions = action.payload.userTransactions.filter(
          (transaction) => transaction.type === "income",
        );
        const expenseTransactions = action.payload.userTransactions.filter(
          (transaction) => transaction.type === "expense",
        );

        state.incomeTransactions = incomeTransactions;
        state.expenseTransactions = expenseTransactions;
        state.sataus = StatusType.SUCCESS;
        state.message = "";
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.sataus = StatusType.ERROR;
        state.message = "Transactions fetch failed!";
      })
      .addCase(addTransaction.pending, (state) => {
        state.sataus = StatusType.LOADING;
        state.message = "";
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.sataus = StatusType.SUCCESS;
        state.message = "Transaction added successfully!";
      })
      .addCase(addTransaction.rejected, (state) => {
        state.sataus = StatusType.ERROR;
        state.message = "Transaction not added!";
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.sataus = StatusType.LOADING;
        state.message = "";
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.sataus = StatusType.SUCCESS;
        state.message = "Transaction deleted successfully!";
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.sataus = StatusType.ERROR;
        state.message = "Transaction not deleted!";
      });
  },
});

export const {} = transactionsSlice.actions;

export const transactionsReducer = transactionsSlice.reducer;
