import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import Cookies from "js-cookie";

import {
  IUser,
  SignInResponseType,
  StatusType,
  SignUpResponseType,
  SignInFormType,
  SignUpFormType,
  fetchUserResponseType,
} from "@/@types";
import { AxiosResponse } from "axios";

interface AuthSliceStates {
  user: IUser | null;
  isAuth: boolean;
  status: StatusType;
  message: string;
}

export const fetchUser = createAsyncThunk<fetchUserResponseType>("auth/fetchUser", async () => {
  const { data } = await axios.get<fetchUserResponseType>("/api/auth/");

  return data;
});

export const fetchSignIn = createAsyncThunk<SignInResponseType, SignInFormType>(
  "auth/fetchSignIn",
  async (user) => {
    const { data } = await axios.post<SignInResponseType>("/api/auth/signin", user);
    Cookies.set("token", data.token, { expires: 1, path: "/" });

    return data;
  },
);

export const fetchSignUp = createAsyncThunk<AxiosResponse<SignUpResponseType>, SignUpFormType>(
  "auth/fetchSignUp",
  async (user) => {
    const res = axios.post<SignUpResponseType>("/api/auth/signup", user);

    return res;
  },
);

const initialState: AuthSliceStates = {
  user: null,
  isAuth: false,
  status: StatusType.HOLD,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut(state) {
      state.user = null;
      state.isAuth = false;
    },
    setStatus(state) {
      state.status = StatusType.HOLD;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignIn.pending, (state) => {
        state.isAuth = false;
        state.status = StatusType.LOADING;
        state.user = null;
        state.message = "";
      })
      .addCase(fetchSignIn.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.isAuth = true;
        state.status = StatusType.SUCCESS;
        state.user = payload.user;
        state.message = "Sign in successfully!";
      })
      .addCase(fetchSignIn.rejected, (state) => {
        state.isAuth = false;
        state.status = StatusType.ERROR;
        state.message = "Sign in failed!";
        state.user = null;
      })
      .addCase(fetchSignUp.pending, (state) => {
        state.isAuth = false;
        state.status = StatusType.LOADING;
        state.message = "";
      })
      .addCase(fetchSignUp.fulfilled, (state) => {
        state.isAuth = true;
        state.status = StatusType.SUCCESS;
        state.message = "Sign up successfully!";
      })
      .addCase(fetchSignUp.rejected, (state) => {
        state.isAuth = false;
        state.status = StatusType.ERROR;
        state.message = "Sign up failed!";
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isAuth = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.isAuth = false;
      });
  },
});

export const { signOut, setStatus } = authSlice.actions;

export const authReducer = authSlice.reducer;
