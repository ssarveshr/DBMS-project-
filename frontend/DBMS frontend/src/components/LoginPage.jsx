import React from "react";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.black}>
        <div className={styles.loginPageChild}>
          <div className={styles.welcomeToStudentContainer}>
            <p className={styles.login}>
              <b className={styles.welcomeTo1}>Welcome to</b>
            </p>
            <p className={styles.studentPortal}>student portal</p>
          </div>
        </div>
        <div>
          <p>
            <img
              className={styles.unionIcon}
              alt="Union Icon"
              src="/union-1.svg"
            />
          </p>
          <p>
            {" "}
            <img
              className={styles.unionIcon1}
              alt="Union Icon 1"
              src="/union-2.svg"
            />
          </p>
          <p>
            <img
              className={styles.unionIcon2}
              alt="Union Icon 2"
              src="/union-3.svg"
            />
          </p>
        </div>
        <div className={styles.loginBox}>
          {/* <div className={styles.password}>Password</div>
				<label className={styles.label}>Password</label>
				<input
  					type="password"
  					className={styles.inputField}
  					placeholder="Enter your password"
				/> */}

          {/* <img className={styles.loginPageItem} alt="" src="Group 3.svg" /> */}
          <div className={styles.loginEnterYourContainer}>
            <p className={styles.login}>
              <b>Login</b>
              <b></b>
            </p>
            <p className={styles.enterYourAccount}>
              Enter your account details
            </p>
            <br />
            <br />
            {/* <img className={styles.loginPageInner} alt="" src="Line 1.svg" />
        				<img className={styles.lineIcon} alt="" src="Line 2.svg" /> */}
            {/* <div className={styles.username}>Username</div> */}
            <label className={styles.label}>Username</label>
            <input
              type="username"
              className={styles.inputField}
              placeholder="Enter your username"
            />
            {/* <div className={styles.password}>Password</div> */}
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.inputField}
              placeholder="Enter your password"
            />

            {/* <div className={styles.rectangleDiv}/> */}
            <br />
            <br />
            <button className={styles.loginButton}>Login</button>
            <div className={styles.forgotPassword}>Forgot Password?</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
