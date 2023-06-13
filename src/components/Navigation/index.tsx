import React from "react";
import cn from "classnames";

import styles from "./Navigation.module.scss";

import { menuItems } from "@/utils/menuitems";
import { Signout } from "@/utils/Icons";
import { ReactComponent as UserSvgThumb } from "@/assets/icons/user.svg";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { signOut } from "@/redux/Slices/authSlice";
import Cookies from "js-cookie";
import { addNotification } from "@/redux/Slices/notificationSlice";
import { StatusType } from "@/@types";
import { nanoid } from "@reduxjs/toolkit";

type Props = {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
};

const Navigation: React.FC<Props> = ({ active, setActive }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleSignOut = () => {
    Cookies.set("token", "");
    dispatch(signOut());
    dispatch(
      addNotification({
        message: "Sign out successfully",
        status: StatusType.SUCCESS,
        id: nanoid(),
      }),
    );
  };

  return (
    <nav className={styles.Navigation}>
      <div className={styles.User}>
        <UserSvgThumb
          // src={UserSvgThumb}
          // width={100}
          // height={100}
          // alt="user avatar"
          className={styles.UserImg}
        />
        <div className={styles.UserInfo}>
          <h2 className={styles.UserName}>{user && user.username}</h2>
          <p className={styles.UserLabel}>Your Money</p>
        </div>
      </div>
      <ul className={styles.Menu}>
        {menuItems.map((item) => (
          <li
            className={cn(styles.MenuItem, { [styles.active]: active === item.id })}
            key={item.id}
            onClick={() => setActive(item.id)}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setActive(item.id)}
          >
            <item.icon />
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
      <div className={styles.BottomNav}>
        <li className={styles.SignOut} tabIndex={0} onClick={handleSignOut}>
          {<Signout />} <span>Sign Out</span>
        </li>
      </div>
    </nav>
  );
};

export default Navigation;
