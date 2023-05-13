import React from "react";
// import { useNavigate } from "react-router-dom";

// import axios from "@/utils/axios";

// import {
//   ITransaction,
//   IApiGetIncomesList,
//   ICategory,
//   IWallet,
//   IApiGetWallets,
//   IApiGetCategories,
//   IUser,
//   StatusType,
// } from "@/@types";
// import { SignUpFormType } from "@/pages/auth/signup";
// import { AxiosError } from "axios";
// import { NotificationProps } from "@/components/Notification/Notification.props";
// import { SignInFormType } from "@/pages/auth/signin";

// type ProviderProps = {
//   children: React.ReactNode;
// };

// export type GlobalContextType = {
//   addTransaction: (transaction: ITransaction) => Promise<void>;
//   getTransactions: () => void;
//   getWalletList: () => void;
//   getIncomeCategories: () => void;
//   getExpenseCategories: () => void;
//   deleteTransaction: (id: string) => void;
//   getUser: () => Promise<void>;
//   signOut: () => void;
//   signUp: (user: SignUpFormType) => Promise<void>;
//   signIn: (user: SignInFormType) => Promise<void>;
//   addCategory: (category: ICategory) => Promise<void>;
//   deleteCategory: (id: string) => Promise<void>;
//   addWallet: (wallet: IWallet) => Promise<void>;
//   deleteWallet: (id: string) => Promise<void>;
//   isAuth: boolean;
//   incomeCategories: ICategory[];
//   expenseCategories: ICategory[];
//   wallets: IWallet[];
//   incomeTransactions: ITransaction[];
//   expenseTransactions: ITransaction[];
//   notification: NotificationProps;
//   setNotification: React.Dispatch<React.SetStateAction<NotificationProps>>;
//   user: IUser | null;
// };

// const GlobalContext = React.createContext<GlobalContextType | null>(null);

// export const useGlobalContext = () => {
//   return useContext(GlobalContext) as GlobalContextType;
// };

// export const GlobalProvider: FC<ProviderProps> = ({ children }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<IUser | null>(null);
//   const [isAuth, setIsAuth] = useState<boolean>(false);
//   const [incomeCategories, setIncomeCategories] = useState<ICategory[] | []>([]);
//   const [expenseCategories, setExpenseCategories] = useState<ICategory[] | []>([]);
//   const [wallets, setWallets] = useState<IWallet[] | []>([]);
//   const [incomeTransactions, setIncomeTransactions] = useState<ITransaction[] | []>([]);
//   const [expenseTransactions, setExpenseTransactions] = useState<ITransaction[] | []>([]);
//   // const [status, setStatus] = useState<StatusType>("hold");
//   const [notification, setNotification] = useState<NotificationProps>({
//     status: StatusType.HOLD,
//     message: "",
//     autoCloseTimeout: 5000,
//   });

//   const getUser = async () => {
//     await axios
//       .get("/api/auth/")
//       .then((response) => {
//         setIsAuth(true);
//         setUser(response.data.user);
//       })
//       .catch((err) => {
//         setIsAuth(false);
//       });
//   };

//   const signUp = async (user: SignUpFormType) => {
//     setNotification({
//       ...notification,
//       status: StatusType.LOADING,
//     });
//     await axios
//       .post("/api/auth/signup", user)
//       .then((res) => {
//         setNotification({
//           ...notification,
//           status: StatusType.LOADING,
//           message: "Sign up successfully!",
//         });

//         if (res?.status === 200) {
//           navigate("/auth/signin");
//         }
//       })
//       .catch(
//         (
//           err: AxiosError<{
//             message: string;
//           }>,
//         ) => {
//           console.log(err);
//           setNotification({
//             ...notification,
//             status: StatusType.ERROR,
//             message: err.response?.data.message || "Sign up failed!",
//           });
//         },
//       );
//   };

//   const signIn = async (user: SignInFormType) => {
//     setNotification({
//       ...notification,
//       status: StatusType.LOADING,
//     });

//     await axios
//       .post("/api/auth/signin", user)
//       .then((res) => {
//         setNotification({
//           ...notification,
//           status: StatusType.LOADING,
//           message: "Sign in successfully!",
//         });

//         if (res?.status === 200) {
//           window.localStorage.setItem("token", `Bearer ${res.data.token}`);

//           navigate("/");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         setNotification({
//           ...notification,
//           status: StatusType.ERROR,
//           message: err.response?.data.message || "Sign in failed!",
//         });
//       });
//   };

//   const signOut = () => {
//     window.localStorage.removeItem("token");
//     setIsAuth(false);
//     setNotification({
//       ...notification,
//       status: StatusType.LOADING,
//       message: "Sign out successfully!",
//     });
//   };

//   const getWalletList = async () => {
//     await axios
//       .get<IApiGetWallets>("/api/wallets/")
//       .then((response) => {
//         setWallets(response.data.allUserWallets);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const addCategory = async (category: ICategory) => {
//     setNotification({
//       ...notification,
//       status: StatusType.LOADING,
//     });

//     const res = await axios
//       .post("/api/categories/", category)
//       .then((res) => {
//         category.type === "income" ? getIncomeCategories() : getExpenseCategories();

//         setNotification({
//           ...notification,
//           status: StatusType.LOADING,
//           message: "Category added successfully!",
//         });
//       })
//       .catch((err) => {
//         setNotification({
//           ...notification,
//           status: StatusType.ERROR,
//           message: err.response?.data.message || "Category not added!",
//         });
//       });
//   };

//   const deleteCategory = async (id: string) => {
//     setNotification({
//       ...notification,
//       status: StatusType.LOADING,
//     });

//     await axios
//       .delete("/api/categories/" + id)
//       .then((res) => {
//         getIncomeCategories();
//         getExpenseCategories();

//         setNotification({
//           ...notification,
//           status: StatusType.LOADING,
//           message: "Category deleted successfully!",
//         });
//       })
//       .catch((err) => {
//         setNotification({
//           ...notification,
//           status: StatusType.ERROR,
//           message: err.response?.data.message || "Category not deleted!",
//         });
//       });
//   };

//   const getIncomeCategories = async () => {
//     await axios
//       .get<IApiGetCategories>("/api/categories/incomeList")
//       .then((response) => {
//         setIncomeCategories(response.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const getExpenseCategories = async () => {
//     await axios
//       .get<IApiGetCategories>("/api/categories/expenseList")
//       .then((response) => {
//         setExpenseCategories(response.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const getTransactions = async () => {
//     await axios
//       .get<IApiGetIncomesList>("/api/transactions/")
//       .then((response) => {
//         const incomeTransactions = response.data.userTransactions.filter(
//           (transaction) => transaction.type === "income",
//         );
//         const expenseTransactions = response.data.userTransactions.filter(
//           (transaction) => transaction.type === "expense",
//         );

//         setIncomeTransactions(incomeTransactions);
//         setExpenseTransactions(expenseTransactions);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const addTransaction = async (transaction: ITransaction) => {
//     setNotification({
//       ...notification,
//       status: StatusType.LOADING,
//     });

//     await axios
//       .post("/api/transactions/", transaction)
//       .then((res) => {
//         getWalletList();
//         getTransactions();

//         setNotification({
//           ...notification,
//           status: StatusType.LOADING,
//           message: "Transaction added successfully!",
//         });
//       })
//       .catch((err) => {
//         setNotification({
//           ...notification,
//           status: StatusType.ERROR,
//           message: err.response?.data.message || "Transaction not added!",
//         });
//       });
//   };

//   const deleteTransaction = async (id: string) => {
//     setNotification({
//       ...notification,
//       status: StatusType.LOADING,
//     });

//     await axios
//       .delete(`/api/transactions/${id}`)
//       .then((res) => {
//         getTransactions();
//         getWalletList();

//         setNotification({
//           ...notification,
//           status: StatusType.LOADING,
//           message: "Transaction deleted successfully!",
//         });
//       })
//       .catch((err) => {
//         setNotification({
//           ...notification,
//           status: StatusType.ERROR,
//           message: err.response?.data.message || "Transaction not deleted!",
//         });
//       });
//   };

//   const addWallet = async (wallet: IWallet) => {
//     setNotification({
//       ...notification,
//       status: StatusType.LOADING,
//     });

//     await axios
//       .post("/api/wallets/", wallet)
//       .then((res) => {
//         getWalletList();

//         setNotification({
//           ...notification,
//           status: StatusType.LOADING,
//           message: "Wallet added successfully!",
//         });
//       })
//       .catch((err) => {
//         setNotification({
//           ...notification,
//           status: StatusType.ERROR,
//           message: err.response?.data.message || "Wallet not added!",
//         });
//       });
//   };

//   const deleteWallet = async (id: string) => {
//     setNotification({
//       ...notification,
//       status: StatusType.LOADING,
//     });

//     await axios
//       .delete(`/api/wallets/${id}`)
//       .then((res) => {
//         getWalletList();

//         setNotification({
//           ...notification,
//           status: StatusType.LOADING,
//           message: "Wallet deleted successfully!",
//         });
//       })
//       .catch((err) => {
//         setNotification({
//           ...notification,
//           status: StatusType.ERROR,
//           message: err.response?.data.message || "Wallet not deleted!",
//         });
//       });
//   };

//   return (
//     <GlobalContext.Provider
//       value={{
//         addTransaction,
//         deleteTransaction,
//         getTransactions,
//         getIncomeCategories,
//         getExpenseCategories,
//         getWalletList,
//         incomeTransactions,
//         expenseTransactions,
//         wallets,
//         incomeCategories,
//         expenseCategories,
//         isAuth,
//         getUser,
//         signOut,
//         signUp,
//         signIn,
//         notification,
//         setNotification,
//         user,
//         addCategory,
//         deleteCategory,
//         addWallet,
//         deleteWallet,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };
