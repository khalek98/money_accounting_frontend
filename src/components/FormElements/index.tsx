import React from "react";
import cn from "classnames";

import styles from "./FormElements.module.scss";

import {
  IPropsForm,
  IPropsInput,
  IPropsLabel,
  IPropsInputContainer,
  IPropsError,
} from "./FormElements.props";
import { PasswordHide, PasswordShow } from "@/utils/Icons";

export const Form: React.FC<IPropsForm> = ({ className, children, ...props }) => {
  return (
    <form {...props} className={cn(styles.Form, className)}>
      {children}
    </form>
  );
};

export const Input: React.FC<IPropsInput> = ({ className, type, register, disabled, ...props }) => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <>
      <input
        {...register}
        {...props}
        disabled={disabled}
        className={cn(styles.Input, className)}
        type={show ? "text" : type}
      />
      {type && type === "password" && (
        <div className={cn(styles.ShowPass, className)} onClick={() => !disabled && setShow(!show)}>
          {show ? <PasswordHide /> : <PasswordShow />}
        </div>
      )}
    </>
  );
};

export const Label: React.FC<IPropsLabel> = ({ className, children, ...props }) => {
  return (
    <label {...props} className={cn(styles.Label, className)}>
      {children}
    </label>
  );
};

export const InputContainer: React.FC<IPropsInputContainer> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div {...props} className={cn(styles.InputContainer, className)}>
      {children}
    </div>
  );
};

export const ErrorMessage: React.FC<IPropsError> = ({ className, children, ...props }) => {
  return (
    <div {...props} className={cn(styles.ErrorMessage, "error", className)}>
      {children}
    </div>
  );
};
