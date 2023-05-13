import { StatusType } from "@/@types";

export type NotificationProps = {
  message: string;
  status: StatusType;
  autoCloseTimeout?: number;
};
