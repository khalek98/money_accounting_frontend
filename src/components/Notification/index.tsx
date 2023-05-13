import { FC, useEffect } from "react";
import cn from "classnames";

import styles from "./Notification.module.scss";
import { useAppSelector } from "@/redux/store";

const Notification: FC = () => {
  // const { notification, setNotification } = useGlobalContext();

  // const { status, message, autoCloseTimeout = 5000 } = notification;
  const { status, message } = useAppSelector((state) => state.auth);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setNotification({
  //       ...notification,
  //       autoCloseTimeout: 5000,
  //       status: "hold",
  //       message: "",
  //     });
  //   }, autoCloseTimeout);

  //   return () => clearTimeout(timer);
  // }, []);

  const handleClose = () => {
    // setNotification({ ...notification, status: "hold", message: "" });
  };

  return (
    <>
      {message && (
        <div
          className={cn(
            styles.Notification,
            { [styles.success]: status === "success" },
            { [styles.error]: status === "error" },
          )}
        >
          <p className={styles.Message}>{message}</p>
          <button
            className={cn(
              styles.Button,
              { [styles.success]: status === "success" },
              { [styles.error]: status === "error" },
            )}
            onClick={handleClose}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      )}
    </>
  );
};

export default Notification;
