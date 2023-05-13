export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

export interface ITransaction {
  description?: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  walletId: string;
  date?: string;
  _id?: string;
}

export interface ICategory {
  _id?: string;
  name: string;
  type: TransactionType;
}

export interface IUser {
  _id?: string;
  email: string;
  password?: string;
  username: string;
  isConfirmed: boolean;
}

export interface IWallet {
  _id?: string;
  name: string;
  balance: number;
}

export interface IApiGetTransactions {
  userTransactions: ITransaction[];
}

export interface IApiGetWallets {
  allUserWallets: IWallet[];
}

export interface IApiGetCategories {
  data: ICategory[];
}

export interface IApiAddTransaction {
  message: string;
  result: ITransaction;
}

export interface SignInResponseType {
  token: string;
  user: IUser;
}

export interface SignUpResponseType {
  message: string;
}

export type fetchUserType = {
  isConfirmed: boolean;
  username: string;
  email: string;
};

export interface fetchUserResponseType {
  user: fetchUserType;
}

export enum StatusType {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
  HOLD = "hold",
}

export type SignInFormType = {
  email: string;
  password: string;
};

export type SignUpFormType = {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
