import React from "react";

// import css
import styles from '../../../styles/games/Sicbo.module.css'

export default function SicboRules() {
    return (
        <div className={styles.sicboRules}>
            <div className="d-flex justify-content-center">
                <img
                    src="/images/game/SicboGame/dragon.png"
                    width="250rem"
                    height="70rem"
                    >
                </img>
            </div>
            <br></br>
            <span> 
                This game is inspired by a popular Dice Game in Chinese, Sic Bo. 
                However, we will only play with big-or-small option (大小) with slightly different rule. 
            </span>
            <div className="pt-4">{' '}</div>
            <h5><u>Game Rules</u></h5>
            <p>
                1. We will play by guessing the total amount of three dice 
                <br></br>
                2. Chosee your bet: big number: total 11 to 18, or small number: total 3 to 10 
                <br></br>
                3. Roll the dice, and wait for the result
                <br></br>
                4. You win the game if your bet match the total of dice 
                <br></br>
                5. Save your progress before exit by click the Save and Exit button provided
            </p>

        </div>
    )
}