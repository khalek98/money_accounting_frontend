import React from "react";

import styles from "./Dashbord.module.scss";
import InnerLayout from "@/layouts/InnerLayout";

const Dashbord = () => {
  return (
    <div className={styles.Dashbord}>
      <InnerLayout title="Dashbord">Chart</InnerLayout>
    </div>
  );
};

export default Dashbord;
