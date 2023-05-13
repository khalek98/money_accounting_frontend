import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import cn from "classnames";

import styles from "./Wallets.module.scss";

import InnerLayout from "@/layouts/InnerLayout";
import { ErrorMessage, Form, Input, InputContainer, Label } from "../FormElements";
import Button from "../Button";
import { Plus, Spinner, Trash } from "@/utils/Icons";
import { useAppSelector } from "@/redux/store";
import { StatusType } from "@/@types";

type WalletFormTypes = {
  walletName: string;
  balance: string;
};

const Wallets = () => {
  // const {
  //   deleteWallet,
  //   addWallet,
  // } = useGlobalContext();

  const { wallets, status } = useAppSelector((state) => state.wallets);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<WalletFormTypes>({
    reValidateMode: "onChange",
    defaultValues: { walletName: "", balance: "0" },
  });

  const { walletName, balance } = watch();

  const handleInput =
    (name: "walletName" | "balance") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputValue: string = e.target.value;

      if (name === "balance") {
        const pattern = /^(\d+)?(\.\d{0,2})?$/;

        if (pattern.test(inputValue)) {
          setValue(name, inputValue);
        } else {
          setValue(name, balance);
        }
      } else {
        setValue(name, inputValue);
      }
    };

  const onSubmit = (data: WalletFormTypes) => {
    console.log({ name: data.walletName, balance: +data.balance });
    // addWallet({ name: data.walletName, balance: +data.balance });

    reset();
  };

  const onDeleteWallet = (id: string) => {
    // deleteWallet(id);
    console.log(id);
  };

  return (
    <div className={styles.Transactions}>
      <InnerLayout title="Wallets">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.Subtitle}>Create Wallet</h2>
          <InputContainer>
            <Label>Name</Label>
            <Input
              register={register("walletName", {
                required: { value: true, message: "Required" },
                value: walletName,
                onChange: handleInput("walletName"),
              })}
              name="walletName"
              className={cn({ disabled: status === StatusType.LOADING })}
              disabled={status === StatusType.LOADING}
            />
            {errors.walletName && <ErrorMessage>{errors.walletName.message}</ErrorMessage>}
          </InputContainer>

          <InputContainer>
            <Label htmlFor="balance" className={styles.Label}>
              Balance
            </Label>
            <Input
              register={register("balance", {
                required: { value: true, message: "Required" },
                pattern: {
                  value: /^(\d+)?(\.\d{0,2})?$/,
                  message: "Invalid amount",
                },
                onChange: handleInput("balance"),
                value: balance,
              })}
              type="text"
              name="balance"
              className={cn(styles.Input, { disabled: status === StatusType.LOADING })}
              disabled={status === StatusType.LOADING}
            />
            {errors.balance && <ErrorMessage>{errors.balance.message}</ErrorMessage>}
          </InputContainer>

          <Button
            type="submit"
            disabled={status === StatusType.LOADING}
            className={cn({ disabled: status === StatusType.LOADING })}
          >
            {status === StatusType.LOADING ? <Spinner className="spinner" /> : <Plus />}
            Add wallet
          </Button>
        </Form>

        <div className={styles.CategoriesContainer}>
          <div className={styles.CategoriesBlock}>
            <h3 className={styles.Subtitle}>Wallets list</h3>
            <ul className={styles.CategoriesList}>
              {wallets.map((wallet) => (
                <li className={cn(styles.CategoryItem, styles.income)} key={wallet._id}>
                  <div className={styles.Name}>
                    {wallet.name} <span>{wallet.balance}</span>
                  </div>

                  <div
                    className={styles.Delete}
                    onClick={() => wallet._id && onDeleteWallet(wallet._id)}
                  >
                    <Trash />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </InnerLayout>
    </div>
  );
};

export default Wallets;
