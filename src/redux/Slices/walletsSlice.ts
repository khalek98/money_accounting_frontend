import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";

import { IWallet, StatusType, IApiGetWallets } from "@/@types";

interface WalletsSliceInterface {
  wallets: IWallet[] | [];
  status: StatusType;
  message: string;
}

export const fetchWallets = createAsyncThunk<IApiGetWallets>("wallets/fetchWallets", async () => {
  const { data } = await axios.get<IApiGetWallets>("/api/wallets/");

  return data;
});

const initialState: WalletsSliceInterface = {
  wallets: [],
  status: StatusType.HOLD,
  message: "",
};

const walletsSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallets.pending, (state) => {
        state.status = StatusType.LOADING;
        state.message = "";
      })
      .addCase(fetchWallets.fulfilled, (state, action) => {
        state.wallets = action.payload.allUserWallets;
        state.status = StatusType.SUCCESS;
        state.message = "";
      })
      .addCase(fetchWallets.rejected, (state) => {
        state.status = StatusType.ERROR;
        state.message = "Wallets fetch failed!";
      });
  },
});

export const {} = walletsSlice.actions;

export const walletsReducer = walletsSlice.reducer;
