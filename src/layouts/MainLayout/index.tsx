import React, { ReactNode } from "react";

import styles from "./MainLayout.module.scss";

import Notification from "@/components/Notification";

type Props = {
  children: ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  // const {
  //   notification: { status, autoCloseTimeout },
  // } = useGlobalContext();

  return (
    <>
      <div className={styles.MainLayout}>{children}</div>
      {/* {(status === "success" || status === "error") && autoCloseTimeout !== 0 && <Notification />} */}
    </>
  );
};

export default MainLayout;
