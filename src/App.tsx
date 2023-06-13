import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "@/styles/index.scss";

import Navigation from "@/components/Navigation";
import MainLayout from "@/layouts/MainLayout";
import Orb from "@/components/Orb";
import Dashbord from "@/components/Dashbord";
import Transaction from "@/components/Transaction";
import Wallets from "@/components/Wallets";
import Categories from "@/components/Categories";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { fetchUser } from "./redux/Slices/authSlice";
import { fetchWallets } from "./redux/Slices/walletsSlice";
import { fetchTransactions } from "./redux/Slices/transactionsSlice";
import { fetchExpenseCategories, fetchIncomeCategories } from "./redux/Slices/categoriesSlice";

const App: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuth } = useAppSelector((state) => state.auth);
  const { incomeCategories, expenseCategories } = useAppSelector((state) => state.categories);
  const { incomeTransactions, expenseTransactions } = useAppSelector((state) => state.transactions);

  const [active, setActive] = useState<number>(1);

  useEffect(() => {
    if (Cookies.get("token")) {
      dispatch(fetchUser());
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchWallets());
      dispatch(fetchTransactions());
      dispatch(fetchWallets());
      dispatch(fetchIncomeCategories());
      dispatch(fetchExpenseCategories());
    } else {
      navigate("/auth/signin");
    }
    // eslint-disable-next-line
  }, [isAuth]);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashbord />;
      case 2:
        return <Wallets />;
      case 3:
        return <Categories key={"categories"} title="Categories" />;
      case 4:
        return (
          <Transaction
            key={"income"}
            title="Incomes"
            categories={incomeCategories}
            transactions={incomeTransactions}
          />
        );
      case 5:
        return (
          <Transaction
            key={"expense"}
            title="Expenses"
            categories={expenseCategories}
            transactions={expenseTransactions}
          />
        );
      default:
        return <Dashbord />;
    }
  };

  if (!isAuth) {
    return <></>;
  }

  return (
    <div className="App">
      <Orb />
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>{displayData()}</main>
      </MainLayout>
    </div>
  );
};

export default App;
