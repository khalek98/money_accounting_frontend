import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import cn from "classnames";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import styles from "./Auth.module.scss";

import { SignInFormType, StatusType } from "@/@types";

import MainLayout from "@/layouts/MainLayout";
import Orb from "@/components/Orb";
import Button from "@/components/Button";
import { ErrorMessage, Form, Input, InputContainer, Label } from "@/components/FormElements";
import { Spinner } from "@/utils/Icons";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchSignIn, fetchUser } from "@/redux/Slices/authSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { status, isAuth, message } = useAppSelector((state) => state.auth);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInFormType>();

  useEffect(() => {
    if (Cookies.get("token")) {
      dispatch(fetchUser());
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  useEffect(() => {
    if (status === "success") {
      setErrorMessage(null);
    } else if (status === "error") {
      setErrorMessage(message);
    }
  }, [status]);

  const onSubmit: SubmitHandler<SignInFormType> = async (data) => {
    dispatch(fetchSignIn(data));
  };

  return (
    <>
      <div className={styles.Auth}>
        <Orb />
        <MainLayout>
          <div className={styles.AuthWrapper}>
            <h1 className={styles.Title}>Sign in</h1>
            <p className={styles.Subtitle}>
              Don&apos;t have an account yet? <RouterLink to="/auth/signup">Sign up</RouterLink>
            </p>
            <Form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
              <InputContainer>
                <Label htmlFor="email" className={cn(styles.Label, { error: errors.email })}>
                  Email
                </Label>
                <Input
                  register={register("email", {
                    required: { value: true, message: "This field is required" },
                  })}
                  type="email"
                  name="email"
                  className={cn(
                    styles.Input,
                    { error: errors.email },
                    { disabled: status === StatusType.LOADING },
                  )}
                  disabled={status === StatusType.LOADING}
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
                  })}
                  name="password"
                  type="password"
                  disabled={status === StatusType.LOADING}
                  className={cn(
                    styles.Input,
                    { error: errors.password },
                    { disabled: status === StatusType.LOADING },
                  )}
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
              </InputContainer>

              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

              <Button
                type="submit"
                disabled={status === StatusType.LOADING}
                className={cn({ disabled: status === StatusType.LOADING })}
              >
                {status === StatusType.LOADING && <Spinner className="spinner" />}
                Sign in
              </Button>
            </Form>
          </div>
        </MainLayout>
      </div>
    </>
  );
};

export default SignIn;
