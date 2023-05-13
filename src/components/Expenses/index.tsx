import React from "react";

import styles from "./Expenses.module.scss";
import InnerLayout from "@/layouts/InnerLayout";

const Expenses = () => {
  return (
    <div className={styles.Expenses}>
      <InnerLayout title="Expenses"></InnerLayout>
    </div>
  );
};

export default Expenses;
