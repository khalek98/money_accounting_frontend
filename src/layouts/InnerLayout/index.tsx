import React, { ReactNode } from "react";

import styles from "./InnerLayout.module.scss";

type Props = {
  children?: ReactNode;
  title: string;
};

const InnerLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <div className={styles.InnerLayout}>
      <h1 className={styles.Title}>{title}</h1>
      <div className={styles.InnerContent}>{children}</div>
    </div>
  );
};

export default InnerLayout;
