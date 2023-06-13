import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusType } from "@/@types";

export interface INotification {
  id: string;
  message: string;
  status: StatusType;
  autoCloseTimeout?: number;
}

interface NotificationSliceStates {
  notifications: INotification[];
}

const initialState: NotificationSliceStates = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<INotification>) {
      state.notifications = [
        ...state.notifications,
        {
          ...action.payload,
          autoCloseTimeout: action.payload?.autoCloseTimeout || 5000,
        },
      ];
    },
    removeNotification(state, action: PayloadAction<INotification["id"]>) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload,
      );
    },
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;
