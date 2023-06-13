import { FC, useEffect } from "react";
import cn from "classnames";

import styles from "./Notification.module.scss";

import { useAppDispatch } from "@/redux/store";
import { INotification, removeNotification } from "@/redux/Slices/notificationSlice";

interface NotificationProps {
  notification: INotification;
}

const Notification: FC<NotificationProps> = ({ notification }) => {
  const dispatch = useAppDispatch();
  const { status, message, autoCloseTimeout } = notification;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeNotification(notification.id));
    }, autoCloseTimeout);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    dispatch(removeNotification(notification.id));
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
