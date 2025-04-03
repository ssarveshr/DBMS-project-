import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";


const LoginPage = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [Loading, setLoading] = useState(false)
	// const Nav = useNavigate()
	const HandlerFunction = () => {
		const Data = {
			name,
			email,
			password
		}
		console.log(Data)
		setLoading(true)
		axios
		  .post(`http://localhost:5000/api/auth/Student/login` , Data)
		  .then(res => {
				console.log(res)
				setLoading(false)
		  })
		  .catch(err => {
			console.error(err)
			setLoading(false) 
		}
	);
	}
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
            {Loading ? '' : ''}
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
            <label className={styles.label}>Name</label>
            <input
              type="Name"
              className={styles.inputField}
              placeholder="Enter your Name"
			  onChange={(information) => { setName(information.target.value)}}
            />

            <label className={styles.label}>Email</label>
            <input
              type="Email"
              className={styles.inputField}
              placeholder="Enter your Email"
			  onChange={(information) => { setEmail(information.target.value)}}
            />
            {/* <div className={styles.password}>Password</div> */}
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.inputField}
              placeholder="Enter your password"
			  onChange={(information) => {setPassword(information.target.value)}}
            />

            {/* <div className={styles.rectangleDiv}/> */}
            <br />
            <br />
            <button className={styles.loginButton} onClick={HandlerFunction}>Login  inininini</button>
            {/* <div className={styles.forgotPassword}><br></br>Forgot Password?</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
