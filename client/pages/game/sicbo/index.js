import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';

// import components
import SicboRules from "./rules";
import { useRouter } from 'next/router'

// import redux
import { useDispatch, useSelector } from "react-redux";
import { updateRound, updateScore } from "../../../redux/action";

// import css
import styles from '../../../styles/games/Sicbo.module.css'

// import api 
import {InsertScoreApi} from '../../../api/gameScoreApi';


export default function Sicbo() {
    // ensure user has auth to play the game
    const [userId, setUserId] = useState(0)
    useEffect(() => {
        if (!localStorage.getItem('tokenId')) {
            window.location.replace('/login');
        } else {
            setUserId(Number(localStorage.getItem('tokenId')))
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

    // assign states for spinner
    const [rollingDice, setRollingDice] = useState(false);
    const [submitData, setSubmitData] = useState(false);

    // get original state of redux
    const reduxState = useSelector(state => state.reducer)
    const dispatch = useDispatch()


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
            setRollingDice(true);

            let count = 0;

            async function rollDice() {
                const dieList = [1, 2, 3, 4, 5, 6]
                let newDiceResult = []

                for (let i = 0; i < diceResult.length; i++) {
                    const randomIndex = Math.floor(Math.random() * dieList.length);
                    const chosenDie = dieList[randomIndex]
                    newDiceResult.push(chosenDie)
                }

                setDiceResult([...newDiceResult])
                count += 1

                return {count, newDiceResult}
            }

            const repeat = setInterval(async function() {
                let rolling = await rollDice();

                if (rolling.count === 30) {
                    clearInterval(repeat)

                    const finalResult = rolling.newDiceResult 

                    let newTotalDiceResult = 0
                    for (let j = 0; j < finalResult.length; j++) {
                        newTotalDiceResult += finalResult[j]
                    }

                    setTotalDiceResult(newTotalDiceResult)
                    setRollingDice(false)
                }
            }, 100 )


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
            setSubmitData(true);
            event.preventDefault()
            InsertScoreApi(userId, gameUrl, reduxState.round, reduxState.score).then(async result => {
                if (!result) {
                    await alert("Internal Server Error!")
                } else {
                    if (result.status === "success") {
                        await setSubmitData(false)
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
            
            {/* show game rules */}
            <SicboRules />

            <div className="pt-5 d-flex flex-column justify-content-start align-items-center">
                <h1 className="text-light">Place your bet!</h1>
                

                {/* show alert for error */}
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
                

                {/* show modal for game result */}
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
                    <ModalFooter 
                        className="d-flex flex-column justify-content-center text-align-center"
                        style={{
                            backgroundColor: showResult === "WIN"? "#D89D5F" : "#FFCDCD",
                        }} >
                        <button 
                            className={styles.sicboExitButton}
                            style={{paddingRight: "25px"}}
                            onClick={onDismissAlert}>
                                Back to game ! </button>
                    </ModalFooter>
                </Modal>
    


                <div 
                    className="d-flex justify-content-center" 
                    style={{
                        gap:"25px",
                        paddingTop:"10px"
                    }}
                    >

                    {/* this is card for big bet */}
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

                    {/* this is card for small bet */}
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
                        {rollingDice ? 
                        <div className="d-flex justify-content-center" style={{ gap: "10px"}}>
                            <h4>Rolling ... </h4>
                            <Spinner children={false}>
                            </Spinner>
                        </div>
                        :
                        <div><h3>{totalDiceResult ? "Finish!": "Roll the dice"}</h3></div>
                        }

                    </button>
                </div>
                
                <div className="d-flex justify-content-center" style={{gap: "20px"}}>
                    {diceResult.map((die) => {
                        return (
                            <img
                                src={`/images/game/SicboGame/${die}.png`}
                                alt=""
                                width="75rem"
                                height="75rem"
                                className={styles.sicboDice}
                            ></img>
                        )
                    })}                    
                </div>


                {/* show total round and score */}
                <div className="d-flex justify-content-center" style={{paddingTop:"40px", gap:"40px"}}>
                    <h6 className="text-light">Round Played: {reduxState.round}</h6>
                    <h6 className="text-light">Total Score: {reduxState.score}</h6>
                </div>

            </div>


            {/* button to save and exit */}
            <div className={styles.sicboExit}>
                <button 
                    className={styles.sicboExitButton}
                    onClick={handleSaveExit}
                >
                    {submitData ? 
                    <div className="d-flex justify-content-center" style={{ gap: "10px"}}>
                        <Spinner children={false}>
                        </Spinner>
                        <h6>Saving. . .</h6>
                    </div>
                    :
                    <div><h6>Save and Exit Game !</h6></div>
                    }

                </button>
            </div>
        </div>
    )
}

