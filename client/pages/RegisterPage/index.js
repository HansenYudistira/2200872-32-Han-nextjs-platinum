import React, { useState } from "react";
import { Label, Input, Button, Alert } from "reactstrap";
import Link from 'next/link'

// IMPORT CSS
import styles from '../../styles/Register.module.css'

// IMPORT API
import { RegisterApi } from '../../api-lib/RegisterApi'

function RegisterPage() {
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
            RegisterApi(inputs).then(async result => {
                if (!result) {
                    // setAlertMessage(data.message);
                    // setHideAlert(false)
                    await alert("INTERNAL SERVER ERROR !!!")
                } else {
                    if (result.status === "success") {
                        await window.location.replace('/LoginPage')
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
            REGISTER ACCOUNT
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
                onChange={handleChange}
                required/>
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
            onChange={handleChange}
            required/>
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
            className={
                `${styles.inputBoxClass}`
            }>
        <Input
            type="password"
            name="confirm_password"
            id="confirm_password"
            className={`
                ${styles.inputClass}`
            }
                value={inputs.confirm_password || ""}
                onChange={handleChange}
                required/>
        <Label
            for="confirm_password"
            className={`
                ${styles.labelClass}`
            }>
            CONFIRM PASSWORD
            </Label>
        <div
            className={`
                ${styles.divClass}`
            }>
        </div>
        </div>

        <div 
            className={`
                ${styles.LinkClass}`
            }>
        <Link
             href="/LoginPage">
                Already have an account ? Log in
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
            onClick={handleSubmit} >
                BACK
        </Button> */}
        <Button
            className={`
                ${styles.SubmitClass}`
            }
            type="submit" onClick={handleSubmit}>
                REGISTER
        </Button>
        </div>

        </div>
        </div>
        </div>
    )
};

export default RegisterPage;