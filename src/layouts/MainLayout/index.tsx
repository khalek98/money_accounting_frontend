import React, { ReactNode } from "react";

import styles from "./MainLayout.module.scss";

import Notification from "@/components/Notification";
import { useAppSelector } from "@/redux/store";

type Props = {
  children: ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  const { notifications } = useAppSelector((state) => state.notifications);

  return (
    <>
      <div className={styles.MainLayout}>{children}</div>
      {notifications.length > 0 && (
        <ul className={styles.NotificationList}>
          {notifications.map((notification) => (
            <Notification key={notification.id} notification={notification} />
          ))}
        </ul>
      )}
    </>
  );
};

export default MainLayout;
