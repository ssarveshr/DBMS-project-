import React, { useState } from "react";
import styles from "./SignupPage.module.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Spinner from './Spinner.jsx';

const SignupPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const HandlerFunction = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        const Data = {
            name,
            email,
            password,
            confirmPassword
        }

        setLoading(true);
        axios.post("http://localhost:5000/api/auth/Student/signup", Data)
            .then(res => {
                console.log(res);
                setLoading(false);
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                alert(err.response?.data?.message || "Registration failed");
            });
    }

    return (
        <div className={styles.loginPage}>
            <div className={styles.black}>
                <div className={styles.loginPageChild}>
                    <div className={styles.welcomeToStudentContainer}>
                        <p className={styles.login}>
                            <b className={styles.welcomeTo1}>Create Your</b>
                        </p>
                        <p className={styles.studentPortal}>Student Account</p>
                    </div>
                </div>
                <div>
                    <img className={styles.unionIcon} alt="Union Icon" src="/union-1.svg" />
                    <img className={styles.unionIcon1} alt="Union Icon 1" src="/union-2.svg" />
                    <img className={styles.unionIcon2} alt="Union Icon 2" src="/union-3.svg" />
                    <img className={styles.student} src="/cuate.svg" alt="Student" />
                </div>
                {Loading && <Spinner />}
                <div className={styles.loginBox}>
                    <div className={styles.loginEnterYourContainer}>
                        <p className={styles.login}>
                            <b>Sign Up</b>
                        </p>
                        <div className={styles.loginLink}>
                            Already have an account? 
                            <span onClick={() => navigate('/login')} className="spanlogin"> Login here</span>
                        </div>

                        <div className={styles.formGroup}>
                        <label className={styles.label}>Full Name</label>
                        <input
                            type="text"
                            className={styles.inputField}
                            placeholder="Enter your full name"
                            onChange={(e) => setName(e.target.value)}
                        />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Email</label>
                                <input
                                    type="email"
                                    className={styles.inputField}
                                    placeholder="Enter your email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Password</label>
                                <input
                                    type="password"
                                    className={styles.inputField}
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>


                        <button className={styles.loginButton} onClick={HandlerFunction}>
                            Sign Up
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;