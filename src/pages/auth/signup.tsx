import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import cn from "classnames";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import styles from "./Auth.module.scss";

import { SignUpFormType } from "@/@types";
import MainLayout from "@/layouts/MainLayout";
import Orb from "@/components/Orb";
import Button from "@/components/Button";
import { ErrorMessage, Form, Input, InputContainer, Label } from "@/components/FormElements";
import { checkPasswordStrength } from "@/utils/checkPasswordStrength";
import { Spinner } from "@/utils/Icons";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchSignUp } from "@/redux/Slices/authSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const {
  //   isAuth,
  //   signUp,
  //   notification: { status },
  // } = useGlobalContext();

  const { isAuth, status } = useAppSelector((state) => state.auth);

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<SignUpFormType>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const password = watch("password");

  // useEffect(() => {
  //   if (isAuth) {
  //     navigate("/");
  //   }
  // });

  const confirmPasswordValidation = (value: string) => {
    if (value !== password) {
      return "Passwords do not match";
    }
  };

  const validateEmail = (value: string) => {
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!pattern.test(value)) {
      return "Invalid email address";
    }
  };

  const onSubmit: SubmitHandler<SignUpFormType> = (data) => {
    const { confirmPassword, ...body } = data;

    dispatch(fetchSignUp(body));
  };

  return (
    <>
      <div className={styles.Auth}>
        <Orb />
        <MainLayout>
          <div className={styles.AuthWrapper}>
            <h1 className={styles.Title}>Sign up</h1>
            <p className={styles.Subtitle}>
              Already have an account? <RouterLink to="/auth/signin">Sign in</RouterLink>
            </p>
            <Form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
              <InputContainer>
                <Label htmlFor="name" className={cn(styles.Label, { error: errors.username })}>
                  Name
                </Label>
                <Input
                  register={register("username", {
                    required: { value: true, message: "This field is required" },
                    minLength: { value: 2, message: "Name must be at least 2 characters long" },
                  })}
                  type="text"
                  name="username"
                  disabled={status === "loading"}
                  className={cn(
                    styles.Input,
                    { error: errors.username },
                    { disabled: status === "loading" },
                  )}
                />
                {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label htmlFor="email" className={cn(styles.Label, { error: errors.email })}>
                  Email
                </Label>
                <Input
                  register={register("email", {
                    required: { value: true, message: "This field is required" },
                    validate: validateEmail,
                  })}
                  type="email"
                  name="email"
                  disabled={status === "loading"}
                  className={cn(
                    styles.Input,
                    { error: errors.email },
                    { disabled: status === "loading" },
                  )}
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
              </InputContainer>

              <InputContainer className={cn({ error: errors.password })}>
                <Label htmlFor="password" className={cn(styles.Label, { error: errors.password })}>
                  Password
                </Label>
                <Input
                  register={register("password", {
                    required: { value: true, message: "This field is required" },
                    validate: (value) => {
                      return checkPasswordStrength(value);
                    },
                  })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  disabled={status === "loading"}
                  className={cn(
                    styles.Input,
                    { error: errors.password },
                    { disabled: status === "loading" },
                  )}
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
              </InputContainer>

              <InputContainer className={cn({ error: errors.confirmPassword })}>
                <Label
                  htmlFor="confirmPassword"
                  className={cn(styles.Label, { error: errors.confirmPassword })}
                >
                  Confirm Password
                </Label>

                <Input
                  register={register("confirmPassword", {
                    required: { value: true, message: "This field is required" },
                    validate: (value) => {
                      if (value) {
                        return confirmPasswordValidation(value);
                      }
                    },
                  })}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  disabled={status === "loading"}
                  className={cn(
                    styles.Input,
                    { error: errors.confirmPassword },
                    { disabled: status === "loading" },
                  )}
                />
                {errors.confirmPassword && (
                  <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
                )}
              </InputContainer>

              <Button
                type="submit"
                disabled={status === "loading"}
                className={cn({ disabled: status === "loading" })}
              >
                {status === "loading" && <Spinner className="spinner" />}
                Sign up
              </Button>
            </Form>
          </div>
        </MainLayout>
      </div>
    </>
  );
};

export default SignUp;
