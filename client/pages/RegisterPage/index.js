import React, { useState } from "react"
import { Label, Input, Button, Alert } from "reactstrap"
import Link from 'next/link'

// SPINNER
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

// IMPORT CSS
import styles from '../../styles/Register.module.css'

// IMPORT API
import { RegisterApi } from '../../api-lib/RegisterApi'

const antIcon = (
    <LoadingOutlined
    style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        color: 'blue',
    }}
spin/>)

function RegisterPage() {
    const [inputs, setInputs] = useState({})
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [showSpinner, setShowSpinner] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            if (!inputs.email || !inputs.username || !inputs.password || !inputs.confirm_password) {
                setShowAlert(true)
                setAlertMessage('PLEASE ENTER YOUR DATA !')
                return
            }

            setLoading(true)
            setShowSpinner(true)
            const result = await RegisterApi(inputs)
            setShowSpinner(false)

            if (!result) {
                setAlertMessage('INTERNAL SERVER ERROR !!!')
                setShowAlert(true)
            } else {
                if (result.status === "success") {
                    await window.location.replace('/LoginPage')
                } else {
                    setAlertMessage(result.message)
                    setShowAlert(true)
                }
            }
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

        <Alert
            className={
                `${styles.alertClass}`
            }
            isOpen={showAlert}>
            {alertMessage}
        </Alert>

        <h2
            className={
                `${styles.hClass}`
            }>
            REGISTER ACCOUNT
        </h2>

        <div
            className={
                `${styles.inputBoxClass}`
            }>
        <Input
            type="email"
            name="email"
            id="email"
            className={
                `${styles.inputClass}`
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
            className={
                `${styles.inputClass}`
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
            className={
                `${styles.inputClass}`
            }
                value={inputs.confirm_password || ""}
                onChange={handleChange}
            required/>
        <Label
            for="confirm_password"
            className={
                `${styles.labelClass}`
            }>
            CONFIRM PASSWORD
            </Label>
        <div
            className={
                `${styles.divClass}`
            }>
        </div>
        </div>

        <div
            className={
                `${styles.LinkClass}`
            }>
        <Link
             href="/LoginPage">
                Already have an account ? Log in
        </Link>
        </div>

        <div
            className={
                `${styles.ButtonContainerClass}`
            }>
        <Button
            className={
                `${styles.SubmitClass}`
            }
                type="submit"
                onClick={handleSubmit}>
                {showSpinner ? (
        <span style={{ display: 'flex', alignItems: 'center' }}>
                <Spin indicator={antIcon} />
                <span style={{ marginLeft: 62 }}></span>
            </span>
        ) : (
            'REGISTER'
        )}
        </Button>
        </div>

        </div>
        </div>
        </div>
    )
}

export default RegisterPage