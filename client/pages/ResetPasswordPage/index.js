import React, { useState } from "react";
import { Label, Input, Button, Alert } from "reactstrap";
// import Link from 'next/link'

// IMPORT CSS
import styles from '../../styles/Reset.module.css'

// IMPORT API
// import { ResetApi } from '../../api-lib/ResetApi'

function ResetPasswordPagePage() {
    // const [inputs, setInputs] = useState({});
    // const [alertMessage, setAlertMessage] = useState('')

    // const handleChange = (event) => {
    //   const name = event.target.name;
    //   const value = event.target.value;
    //   setInputs(values => ({...values, [name]: value}))
    // }
  
    // const handleSubmit = (event) => {
    //     try {
    //         event.preventDefault()
    //         ResetApi(inputs).then(async result => {
    //             if (!result) {
                    // setAlertMessage(data.message);
                    // setHideAlert(false)
    //                 await alert("Internal Server Error!")
    //             } else {
    //                 if (result.status === "success") {
    //                     await localStorage.setItem('tokenId', result.data.id)
    //                     await localStorage.setItem('tokenUsername', result.data.username)
    //                     await localStorage.setItem('tokenAvatar', result.data.avatar)
    //                     await window.location.replace('/')
    //                 } else {
    //                     await alert(result.message)
    //                 }
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

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
            RESET PASSWORD
        </h2>

        <p
            className={
                `${styles.pClass}`
            }>
            To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.
        </p>

        <div
            className={
                `${styles.inputBoxClass}`
            }>
        <Input
            type="email"
            name="email"
            id="email"
            className={`
                ${styles.inputClass}`
            }
                value={inputs.email || ""}
                onChange={handleChange}
            required/>
        <Label
            for="email"
            className={
                `${styles.labelClass}`
            }>
            EMAIL
        </Label>
        <div
            className={
                `${styles.divClass}`
            }>
        </div>
        </div>

        <div
            className={`
                ${styles.ButtonContainerClass}`
            }>
        <Button
            className={`
                ${styles.ButtonClass}`
            }
            type="button"
            href="/LoginPage">
                BACK
        </Button>
        <Button
            className={`
                ${styles.SubmitClass}`
            }
            type="submit">
            {/* onClick={handleSubmit} */}
                RESET
        </Button>
        </div>

        </div>
        </div>
        </div>
    )
};

export default ResetPasswordPagePage;