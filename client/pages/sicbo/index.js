import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

// import components
import SicboRules from "./rules";
import Image from "next/image";
import { useRouter } from 'next/router'

// import redux
import { useDispatch, useSelector } from "react-redux";
import { updateRound, updateScore } from "../../redux/action";

// import css
import styles from '../../styles/sicbo/Sicbo.module.css'

// import api 
import {InsertScoreApi} from '../../api/gameScoreApi';


export default function Sicbo() {
    // ensure user has auth to play the game
    let userId = 0
    useEffect(() => {
        if (!localStorage.getItem('tokenId')) {
            window.location.replace('/login');
        } else {
            userId += Number(localStorage.getItem('tokenId'))
        }
    }, [])

    // get path name
    const router = useRouter()
    const gameUrl = router.pathname
    
    // assign states for game journey
    const [userBet, setUserBet] = useState(null);
    const [diceResult, setDiceResult] = useState([6, 6, 6]);
    const [totalDiceResult, setTotalDiceResult] = useState(null);
    const [showResult, setShowResult] = useState(null);

    // assign states for alert and modal
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    // get original state of redux
    const reduxState = useSelector(state => state.reducer)
    const dispatch = useDispatch()
    console.log("reduxState", reduxState)


    // function to get user choice
    function handleCardClicked(event) {
        // get user's bet
        const betClicked = event.target.value

        // change UI upon user's bet
        document.getElementById(betClicked).style.borderColor = "#2b0222"
        document.getElementById(betClicked).style.borderWidth = "5px"
        if (betClicked === "da") {
            document.getElementById("xiao").disabled = true
        } else {
            document.getElementById("da").disabled = true
        }
        setUserBet(betClicked)
    }

    // function to roll the dice
    function handleRoll() {
        // ensure user has place the bet
        if (!userBet) {
            setAlertMessage("You need to place your bet ...")
            setAlertVisible(true)
        } else {
            // do random calculation on dice, save and sum the result
            const dieList = [1, 2, 3, 4, 5, 6]
            let newDiceResult = []
            let newTotalDiceResult = 0

            for (let i = 0; i < diceResult.length; i++) {
                const randomIndex = Math.floor(Math.random() * dieList.length);
                const chosenDie = dieList[randomIndex]
                newDiceResult.push(chosenDie)
                newTotalDiceResult += chosenDie
            }
            setDiceResult([...newDiceResult])
            setTotalDiceResult(newTotalDiceResult)
        }
    }

    // function to calculate the result
    useEffect(() => {
        // bandingkan hasil dgn user & tampilkan hasil menang kalah user
        console.log("userbet", userBet)
        console.log("computer result", totalDiceResult)

        if (userBet && totalDiceResult) {
            if (userBet === "da" && totalDiceResult >= 11) {
                console.log("test")
                setTimeout(() => {
                    setShowResult("WIN")
                    setModalVisible(true)
                }, 1000)
            }
            else if (userBet === "xiao" && totalDiceResult <= 10) {
                setTimeout(() => {
                    setShowResult("WIN")
                    setModalVisible(true)
                }, 1000)
            } 
            else {
                setTimeout(() => {
                    setShowResult("LOSE")
                    setModalVisible(true)
                }, 1000)
                }
            
        }

    }, [userBet, totalDiceResult])

    
    // function to update and reset data upon modal closing 
    function onDismissAlert() {
        if (showResult) {
            // tambah round 
            const newRound = Number(reduxState.round) + 1
            dispatch(updateRound(newRound))

            // tambah score
            if (showResult === "WIN") {
                const newScore = Number(reduxState.score) + 1
                dispatch(updateScore(newScore))
            }
        } 

        setAlertVisible(false)
        setAlertMessage(null)
        setModalVisible(false)

        setUserBet(null)
        setDiceResult([6, 6, 6])
        setTotalDiceResult(null)
        setShowResult(null)
        document.getElementById("da").style = "default"
        document.getElementById("da").disabled = false
        document.getElementById("xiao").style = "default"
        document.getElementById("xiao").disabled = false

    };

    
    // function upon save and exit 
    function handleSaveExit(event) {
        try {
            event.preventDefault()
            InsertScoreApi(userId, gameUrl, reduxState.round, reduxState.score).then(async result => {
                if (!result) {
                    await alert("Internal Server Error!")
                } else {
                    console.log(result.status)
                    if (result.status === "success") {
                        await window.location.replace('/')
                    } else {
                        await alert("Internal Server Error!")
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <div className={styles.sicboBackground}>
            
            <SicboRules />

            <div className="pt-5 d-flex flex-column justify-content-start align-items-center">
                <h1 className="text-light">Place your bet!</h1>
                

                {/* show alert for error */}
                {alertVisible?
                    <Modal 
                        isOpen={alertVisible} 
                        toggle={onDismissAlert} 
                        >
                        <ModalHeader 
                            style={{
                                backgroundColor:"#FFCDCD",
                                borderRadius: "5px"
                            }} 
                            toggle={onDismissAlert}>{alertMessage}</ModalHeader>
                    </Modal>
                    :
                    <div></div>
                }
                

                {/* show modal for game result */}
                {modalVisible?
                    <Modal 
                        isOpen={modalVisible} 
                        toggle={onDismissAlert} 
                        >
                        <ModalBody 
                            style={{
                                backgroundColor: showResult === "WIN"? "#D89D5F" : "#FFCDCD",
                                borderRadius: "5px",
                                fontSize: "30px",
                                textAlign: "center"
                            }} >
                                <h5>Your Bet: {userBet === "da" ? "大" : "小"}</h5>
                                <h5>Total Dice: {totalDiceResult}</h5>
                                Result: YOU {showResult} !!!
                        </ModalBody>
                    </Modal>
                    :
                    <div></div>
                }


                <div 
                    className="d-flex justify-content-center" 
                    style={{
                        gap:"25px",
                        paddingTop:"10px"
                    }}
                    >

                    {/* this is big card */}
                    <div className={styles.sicboCard}>
                        <h1>BIG</h1>
                        <button 
                            className={styles.sicboCardButtonDa}
                            id="da"
                            value="da"
                            onClick={handleCardClicked}>     
                        </button>
                        <h3>11 - 18</h3>
                    </div>

                    {/* this is small card */}
                    <div className={styles.sicboCard}>
                        <h1>SMALL</h1>
                        <button 
                            className={styles.sicboCardButtonXiao}
                            id="xiao"
                            value="xiao"
                            onClick={handleCardClicked}>     
                        </button>
                        <h3>3 - 10</h3>
                    </div>
                </div>
                
                {/* button to roll the dice */}
                <div className="pt-5">
                    <button 
                        className={styles.sicboRollButton}
                        onClick={handleRoll}
                    >
                        <h3>Roll the dice...</h3>
                    </button>
                </div>
                
                <div className="d-flex justify-content-center" style={{gap: "20px"}}>
                    {diceResult.map((die) => {
                        return (
                            <Image
                                src={`/SicboGame/${die}.png`}
                                alt=""
                                width="75rem"
                                height="75rem"
                                className={styles.sicboDice}
                            ></Image>
                        )

                    })}
                    
                </div>

                <div className="d-flex justify-content-center" style={{paddingTop:"40px", gap:"40px"}}>
                    <h6 className="text-light">Round Played: {reduxState.round}</h6>
                    <h6 className="text-light">Total Score: {reduxState.score}</h6>
                </div>

            </div>

            <div className={styles.sicboExit}>
                <button 
                    className={styles.sicboExitButton}
                    onClick={handleSaveExit}
                    >Save and Exit Game . . .</button>
            </div>
        </div>
    )
}
