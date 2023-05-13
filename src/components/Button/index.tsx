import React from "react";
import cn from "classnames";

import styles from "./Button.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={cn(styles.Button, className)}>
      {children}
    </button>
  );
};

export default Button;
