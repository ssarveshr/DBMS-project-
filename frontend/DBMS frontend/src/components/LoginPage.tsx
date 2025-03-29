import { FunctionComponent } from 'react';
import styles from './LoginPage.module.css';


const LoginPage:FunctionComponent = () => {
  	return (
    		<div className={styles.loginPage}>
      			<div className={styles.black} />
      			<div className={styles.loginPageChild} />
      			<img className={styles.unionIcon} alt="" src="Union.svg" />
      			<img className={styles.unionIcon1} alt="" src="Union.png" />
      			<img className={styles.unionIcon2} alt="" src="Union.png" />
      			<div className={styles.loginBox} />
      			<div className={styles.password}>Password</div>
      			<div className={styles.forgotPassword}>Forgot Password?</div>
        				<img className={styles.loginPageItem} alt="" src="Group 3.svg" />
        				<div className={styles.loginEnterYourContainer}>
          					<p className={styles.login}>
            						<b>Login</b>
          					</p>
          					<p className={styles.enterYourAccount}>Enter your account details</p>
        				</div>
        				<div className={styles.welcomeToStudentContainer}>
          					<p className={styles.login}>
            						<b className={styles.welcomeTo1}>Welcome to</b>
          					</p>
          					<p className={styles.studentPortal}>student portal</p>
        				</div>
        				<img className={styles.loginPageInner} alt="" src="Line 1.svg" />
        				<img className={styles.lineIcon} alt="" src="Line 2.svg" />
        				<div className={styles.username}>Username</div>
        				<div className={styles.rectangleDiv} />
        				<b className={styles.login1}>Login</b>
        				</div>);
      			};
      			
      			export default LoginPage;
      			