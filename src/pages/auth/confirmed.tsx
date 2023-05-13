import React, { useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

import styles from "./Auth.module.scss";

import Orb from "@/components/Orb";
import MainLayout from "@/layouts/MainLayout";

const ConfirmedEmail = () => {
  return (
    <>
      {/* <Head>
        <title>Email Confirmed | Modey Ok</title>
      </Head> */}
      <div className={styles.Auth}>
        <Orb />
        <MainLayout>
          <div className={styles.AuthWrapper}>
            <h1 className={styles.Title}>Registration successful!</h1>
            <h2>You can now log in to your account.</h2>
            <Link className={styles.LinkButton} to="/auth/signin">
              Sign in
            </Link>
          </div>
        </MainLayout>
      </div>
    </>
  );
};

export default ConfirmedEmail;
