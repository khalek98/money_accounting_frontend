import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
// import { DatePicker as AntDatePicker } from "antd";
import cn from "classnames";

import styles from "./Transaction.module.scss";
import "react-datepicker/dist/react-datepicker.css";

import InnerLayout from "@/layouts/InnerLayout";
import CustomSelect from "../CustomSelect";
import { ICategory, ITransaction, StatusType, TransactionType } from "@/@types";
import { Comment, Plus, Calendar, Wallet, Trash, Money, Spinner } from "@/utils/Icons";
import { dateFormat } from "@/utils/dateFormat";
import Button from "../Button";
import { ErrorMessage, Form, Input, InputContainer, Label } from "../FormElements";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  addTransaction,
  deleteTransaction,
  fetchTransactions,
} from "@/redux/Slices/transactionsSlice";
import { fetchWallets } from "@/redux/Slices/walletsSlice";
import { addNotification } from "@/redux/Slices/notificationSlice";
import { nanoid } from "@reduxjs/toolkit";

type IncomeFormTypes = {
  amount: string;
  description: string;
  categoryId: string;
  walletId: string;
  date: string;
};

export type SelectOption = {
  name: string | null;
  _id?: string | null;
  balance?: number | null;
};

type Props = {
  title: "Incomes" | "Expenses";
  categories: ICategory[];
  transactions: ITransaction[];
};

const Transaction: FC<Props> = ({ categories, transactions, title }) => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<IncomeFormTypes>({ reValidateMode: "onChange" });

  const { wallets, status } = useAppSelector((state) => state.wallets);

  const [formState, setFormState] = useState<IncomeFormTypes>({
    walletId: "",
    categoryId: "",
    amount: "",
    description: "",
    date: new Date().toJSON(),
  });

  const { amount, description, date } = formState;

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);

  const [selectedWallet, setSelectedWallet] = useState<SelectOption>({
    name: wallets[0]?.name || "You have no wallet",
    _id: wallets[0]?._id || null,
    balance: wallets[0]?.balance || null,
  });

  const [selectedCategory, setSelectedCategory] = useState<SelectOption>({
    name: categories[0]?.name || "You have no category",
    _id: categories[0]?._id || null,
  });

  const handleInput =
    (name: "amount" | "description" | "date") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      clearErrors(name);
      const inputValue: string = e.target.value;
      if (name === "amount") {
        const pattern = /^(\d+)?(\.\d{0,2})?$/;

        if (pattern.test(inputValue)) {
          setFormState({ ...formState, [name]: inputValue });
        }
      } else {
        setFormState({ ...formState, [name]: inputValue });
      }
    };

  useEffect(() => {
    if (wallets.length) {
      setSelectedWallet({
        name: wallets[0]?.name || "You have no wallet",
        _id: wallets[0]?._id || null,
        balance: "balance" in wallets[0] ? wallets[0]?.balance : null,
      });
    }
  }, [wallets]);

  useEffect(() => {
    const currentWallet = wallets.find((w) => w._id === selectedWallet._id);
    if (currentWallet) {
      setFormState((prev) => ({
        ...prev,
        walletId: currentWallet._id ? currentWallet._id : "",
      }));
    }
  }, [selectedWallet, wallets]);

  useEffect(() => {
    const currentCategory = categories.find((c) => c._id === selectedCategory._id);

    if (currentCategory) {
      setFormState((prev) => ({
        ...prev,
        categoryId: currentCategory._id ? currentCategory._id : "",
      }));
    }
  }, [selectedCategory, categories]);

  const onSubmit = (data: IncomeFormTypes) => {
    const notificationId = nanoid();

    const sendObj: ITransaction = {
      ...formState,
      type: title === "Incomes" ? TransactionType.INCOME : TransactionType.EXPENSE,
      amount: +formState.amount,
    };

    dispatch(addTransaction(sendObj))
      .then(() => {
        dispatch(fetchTransactions());
        dispatch(fetchWallets());
        dispatch(
          addNotification({
            message: "Transaction added",
            status: StatusType.SUCCESS,
            id: notificationId,
          }),
        );
      })
      .catch(() => {
        dispatch(
          addNotification({
            message: "Transaction not added",
            status: StatusType.ERROR,
            id: notificationId,
          }),
        );
      });

    if (status === StatusType.SUCCESS) {
      setFormState({ ...formState, amount: "", description: "" });
      reset();
    }
  };

  const onDeleteTransaction = (id: string) => {
    dispatch(deleteTransaction(id)).then(() => {
      dispatch(fetchTransactions());
      dispatch(fetchWallets());
      dispatch(
        addNotification({
          message: "Transaction successfully deleted",
          status: StatusType.SUCCESS,
          id: nanoid(),
        }),
      );

      reset();
    });
  };

  const renderTransactionsList = () => {
    if (transactions.length) {
      return transactions.map((tr) => {
        return (
          <li key={tr._id} className={styles.IncomeItem}>
            <h3
              className={cn(
                styles.ItemCategory,
                { [styles.expense]: title === "Expenses" },
                { [styles.incomes]: title === "Incomes" },
              )}
            >
              {categories.find((category) => category._id === tr.categoryId)?.name}
            </h3>
            <div className={styles.ItemBottom}>
              <h4 className={styles.ItemInfo}>
                <Money />
                {tr.amount}
              </h4>
              <h4 className={styles.ItemInfo}>
                <Calendar />
                {dateFormat(tr.date)}
              </h4>
              <h4 className={styles.ItemInfo}>
                <Wallet />
                {wallets.find((w) => w._id === tr.walletId)?.name}
              </h4>
              {tr.description && (
                <h4 className={styles.ItemInfo}>
                  <Comment />
                  {tr.description.length > 65
                    ? tr.description.slice(0, 65) + "..."
                    : tr.description}
                </h4>
              )}
            </div>
            <div className={styles.Delete} onClick={() => tr._id && onDeleteTransaction(tr._id)}>
              <Trash />
            </div>
          </li>
        );
      });
    } else {
      return (
        <li>
          <h3>You hasn&apos;t transactions</h3>
        </li>
      );
    }
  };

  return (
    <div className={styles.Transition}>
      <InnerLayout title={title}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Label htmlFor="wallet" className={styles.Label}>
              Wallet
            </Label>
            <CustomSelect
              options={wallets}
              selectedOption={selectedWallet}
              setSelectedOption={setSelectedWallet}
              disabled={status === StatusType.LOADING}
              className={cn({ disabled: status === StatusType.LOADING })}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="category" className={styles.Label}>
              Category
            </Label>
            <CustomSelect
              options={categories}
              selectedOption={selectedCategory}
              setSelectedOption={setSelectedCategory}
              disabled={status === StatusType.LOADING}
              className={cn({ disabled: status === StatusType.LOADING })}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="wallet" className={styles.Label}>
              Date
            </Label>
            <DatePicker
              dateFormat={"dd/MM/yyyy"}
              selected={new Date(date)}
              onChange={(date) => {
                if (date !== null) {
                  setFormState({ ...formState, date: date.toJSON() });
                }
              }}
              todayButton={"today"}
              className={cn(styles.DatePicker, { disabled: status === StatusType.LOADING })}
              disabled={status === StatusType.LOADING}
            />
          </InputContainer>

          {/* <InputContainer>
            <Label>Date Ant</Label>
            <AntDatePicker className={cn(styles.DatePicker, { disabled: status === StatusType.LOADING })} />
          </InputContainer> */}

          <InputContainer>
            <Label htmlFor="amount" className={styles.Label}>
              Amount
            </Label>
            <Input
              register={register("amount", {
                required: { value: true, message: "Required" },
                value: amount,
              })}
              type="text"
              value={amount}
              onChange={handleInput("amount")}
              name="amount"
              className={cn(styles.Input, { disabled: status === StatusType.LOADING })}
              disabled={status === StatusType.LOADING}
            />

            {errors.amount && <ErrorMessage>{errors.amount.message}</ErrorMessage>}
          </InputContainer>

          <InputContainer>
            <Label htmlFor="description" className={styles.Label}>
              Description
            </Label>
            <textarea
              {...register("description", { required: false, value: description })}
              value={description}
              onChange={handleInput("description")}
              name="description"
              className={cn(styles.Textarea, { disabled: status === StatusType.LOADING })}
              disabled={status === StatusType.LOADING}
            />
          </InputContainer>

          <Button
            type="submit"
            disabled={status === StatusType.LOADING}
            className={cn({ disabled: status === StatusType.LOADING })}
          >
            {status === StatusType.LOADING ? <Spinner className="spinner" /> : <Plus />}
            Add {title === "Incomes" ? "income" : "expense"}
          </Button>
        </Form>
        <ul className={styles.IncomeList}>{renderTransactionsList()}</ul>
      </InnerLayout>
    </div>
  );
};

export default Transaction;
