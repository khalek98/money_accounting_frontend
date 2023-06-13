import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import cn from "classnames";

import styles from "./Categories.module.scss";

import { TransactionType, StatusType } from "@/@types";
import InnerLayout from "@/layouts/InnerLayout";
import { ErrorMessage, Form, Input, InputContainer, Label } from "../FormElements";
import CustomSelect from "../CustomSelect";
import Button from "../Button";
import { Plus, Spinner, Trash } from "@/utils/Icons";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  addCategory,
  deleteCategory,
  fetchExpenseCategories,
  fetchIncomeCategories,
} from "@/redux/Slices/categoriesSlice";
import { addNotification } from "@/redux/Slices/notificationSlice";
import { nanoid } from "@reduxjs/toolkit";

type Props = {
  title: string;
};

type SelectOption = {
  name: string;
  _id: string;
};

type CategoryFormTypes = {
  categoryName: string;
  type: TransactionType;
};

const Categories: FC<Props> = ({ title }) => {
  const dispatch = useAppDispatch();

  const { incomeCategories, expenseCategories, status } = useAppSelector(
    (state) => state.categories,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormTypes>({ reValidateMode: "onChange" });

  const categoryTypes: SelectOption[] = [
    {
      name: TransactionType.INCOME,
      _id: "income",
    },
    {
      name: TransactionType.EXPENSE,
      _id: "expense",
    },
  ];

  const [selectedCategoryType, setSelectedCategoryType] = useState<SelectOption>({
    name: categoryTypes[0].name,
    _id: categoryTypes[0]._id,
  });

  useEffect(() => {
    if (!incomeCategories && !expenseCategories) {
      dispatch(fetchIncomeCategories());
      dispatch(fetchExpenseCategories());
    }
  }, []);

  const onSubmit = (data: CategoryFormTypes) => {
    const notificationId = nanoid();

    const type =
      selectedCategoryType.name === TransactionType.INCOME
        ? TransactionType.INCOME
        : TransactionType.EXPENSE;

    dispatch(addCategory({ name: data.categoryName, type }))
      .then(() => {
        if (type === TransactionType.INCOME) {
          dispatch(fetchIncomeCategories());
        } else {
          dispatch(fetchExpenseCategories());
        }
      })
      .then(() => {
        reset();

        dispatch(
          addNotification({
            message: "Category added successfully",
            status: StatusType.SUCCESS,
            id: notificationId,
          }),
        );
      })
      .catch(() => {
        dispatch(
          addNotification({
            message: "Category not added",
            status: StatusType.ERROR,
            id: notificationId,
          }),
        );
      });
  };

  const onDeleteCategory = (id: string) => {
    const notificationId = nanoid();

    dispatch(deleteCategory(id))
      .then(() => {
        if (selectedCategoryType.name === TransactionType.INCOME) {
          dispatch(fetchIncomeCategories());
        } else {
          dispatch(fetchExpenseCategories());
        }
      })
      .then(() => {
        dispatch(
          addNotification({
            message: `Category successfully deleted`,
            status: StatusType.SUCCESS,
            id: notificationId,
          }),
        );
      })
      .catch(() => {
        dispatch(
          addNotification({
            message: "Category not deleted",
            status: StatusType.ERROR,
            id: notificationId,
          }),
        );
      });
  };

  return (
    <div className={styles.Transactions}>
      <InnerLayout title={title}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.Subtitle}>Create Category</h2>
          <InputContainer>
            <Label>Name</Label>
            <Input
              register={register("categoryName", {
                required: { value: true, message: "Required" },
              })}
              name="categoryName"
              className={cn({ disabled: status === StatusType.LOADING })}
              disabled={status === StatusType.LOADING}
            />

            {errors.categoryName && <ErrorMessage>{errors.categoryName.message}</ErrorMessage>}
          </InputContainer>

          <InputContainer>
            <Label>Type of category</Label>
            <CustomSelect
              options={categoryTypes}
              selectedOption={selectedCategoryType}
              setSelectedOption={setSelectedCategoryType}
              disabled={status === StatusType.LOADING}
              className={cn({ disabled: status === StatusType.LOADING })}
            ></CustomSelect>
          </InputContainer>

          <Button
            type="submit"
            disabled={status === StatusType.LOADING}
            className={cn({ disabled: status === StatusType.LOADING })}
          >
            {status === StatusType.LOADING ? <Spinner className="spinner" /> : <Plus />}
            Add category
          </Button>
        </Form>

        <div className={styles.CategoriesContainer}>
          <div className={styles.CategoriesBlock}>
            <h3 className={styles.Subtitle}>Income categories</h3>
            <ul className={styles.CategoriesList}>
              {incomeCategories.map((category) => (
                <li className={cn(styles.CategoryItem, styles.income)} key={category._id}>
                  {category.name}

                  <div
                    className={styles.Delete}
                    onClick={() => category._id && onDeleteCategory(category._id)}
                  >
                    <Trash />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.CategoriesBlock}>
            <h3 className={styles.Subtitle}>Expense categories</h3>
            <ul className={styles.CategoriesList}>
              {expenseCategories.map((category) => (
                <li className={cn(styles.CategoryItem, styles.expense)} key={category._id}>
                  {category.name}

                  <div
                    className={styles.Delete}
                    onClick={() => category._id && onDeleteCategory(category._id)}
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

export default Categories;
