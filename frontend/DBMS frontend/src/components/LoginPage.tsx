import { FunctionComponent } from 'react';
import styles from './LoginPage.module.css';


const LoginPage:FunctionComponent = () => {
  	return (
    		<div className={styles.loginPage}>
      			<div className={styles.black} >
      			<div className={styles.loginPageChild} >
				  <div className={styles.welcomeToStudentContainer}>
          					<p className={styles.login}>
            						<b className={styles.welcomeTo1}>Welcome to</b>
          					</p>
          					<p className={styles.studentPortal}>student portal</p>
        				</div>
				</div>
      			<img className={styles.unionIcon} alt="" src="Union.svg" />
      			<img className={styles.unionIcon1} alt="" src="Union.png" />
      			<img className={styles.unionIcon2} alt="" src="Union.png" />
      			<div className={styles.loginBox} >
				{/* <div className={styles.password}>Password</div>
				<label className={styles.label}>Password</label>
				<input
  					type="password"
  					className={styles.inputField}
  					placeholder="Enter your password"
				/> */}
						
      			<div className={styles.forgotPassword}>Forgot Password?</div>
        				{/* <img className={styles.loginPageItem} alt="" src="Group 3.svg" /> */}
        				<div className={styles.loginEnterYourContainer}>
          					<p className={styles.login}>
            						<b>Login</b>
          					</p>
          					<p className={styles.enterYourAccount}>Enter your account details</p>
        				{/* <img className={styles.loginPageInner} alt="" src="Line 1.svg" />
        				<img className={styles.lineIcon} alt="" src="Line 2.svg" /> */}
						<div className={styles.username}>Username</div>
						<label className={styles.label}>Username</label>
						<input
  							type="username"
  							className={styles.inputField}
  							placeholder="Enter your username"
						/>
						<div className={styles.password}>Password</div>
						<label className={styles.label}>Password</label>
						<input
  							type="password"
  							className={styles.inputField}
  							placeholder="Enter your password"
						/>
        				
        				{/* <div className={styles.rectangleDiv}/> */}
							<button className={styles.loginButton}>Login</button>
        					<b className={styles.login1}>Login</b>
        				</div>
						</div>
						</div>
						</div>);
      			};
      			
      			export default LoginPage;
      			