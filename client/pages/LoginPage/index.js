import React, { useState } from "react";
import { Label, Input, Button, Alert } from "reactstrap";
import Link from 'next/link'

// IMPORT CSS
import styles from '../../styles/Login.module.css'

// IMPORT API
import { LoginApi } from '../../api-lib/LoginApi'

function LoginPage() {
    const [inputs, setInputs] = useState({});
    // const [alertMessage, setAlertMessage] = useState('')

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = (event) => {
        try {
            event.preventDefault()
            LoginApi(inputs).then(async result => {
                if (!result) {
                    // setAlertMessage(data.message);
                    // setHideAlert(false)
                    await alert("INTERNAL SERVER ERROR !!!")
                } else {
                    if (result.status === "success") {
                        await localStorage.setItem('tokenId', result.data.id)
                        await localStorage.setItem('tokenUsername', result.data.username)
                        await localStorage.setItem('tokenAvatar', result.data.avatar)
                        await window.location.replace('/')// KALAU USER BERHASIL LOGIN LEMPAR KEHALAMAN TERSERAH
                    } else {
                        await alert(result.message)
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            className={
                `${styles.bodyClass}`
            }>
        <div
            className={
                `${styles.boxClass}`
            }>
        <div
            className={
                `${styles.borderClass}`
            }>
        </div>
        <div
            className={
                `${styles.formClass}`
            }>
        <h2
            className={
                `${styles.hClass}`
            }>
            LOGIN ACCOUNT
        </h2>
        {/* <Alert 
            color="danger" 
            hidden={hideAlert}>
            {alertMessage}
        </Alert> */}

        <div
            className={
                `${styles.inputBoxClass}`
            }>
        <Input 
            type="text" 
            name="username" 
            id="username" 
            className={
                `${styles.inputClass}`
            }    
            value={inputs.username || ""}
            onChange={handleChange} required/>
        <Label
            for="username"
            className={
                `${styles.labelClass}`
            }>
            USERNAME
            </Label>
        <div
            className={
                `${styles.divClass}`
        }>
        </div>
        </div>

        <div
            className={
                `${styles.inputBoxClass}`
            }>
        <Input
            type="password"
            name="password"
            id="password"
            className={`
                ${styles.inputClass}`
            }
            value={inputs.password || ""}
            onChange={handleChange} required/>
        <Label
            for="password"
            className={
                `${styles.labelClass}`
            }>
            PASSWORD
        </Label>
        <div
            className={
                `${styles.divClass}`
            }>
        </div>
        </div>

        <div 
            className={`
                ${styles.LinkClass}`
            }>
        <Link
             href="/ResetPasswordPage">
                Forgot Password?
        </Link>
        <Link
             href="/RegisterPage">
                Don't have account? register
        </Link>
        </div>

        <div
            className={`
                ${styles.ButtonContainerClass}`
            }>
        {/* <Button
            className={`
                ${styles.ButtonClass}`
            }
            type="button"
            onclick="goToHomePage()"
            onClick={handleSubmit} 
            href="/RegisterPage">
                BACK
        </Button> */}
        <Button
            type="submit"
            className={`
                ${styles.SubmitClass}`
            }
            onClick={handleSubmit}>
                LOGIN
        </Button>
        </div>

        </div>
        </div>
        </div>
    )
};

export default LoginPage;