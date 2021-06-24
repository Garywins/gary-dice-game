//Player output
const playerDie1    = document.getElementById("player-die-1");
const playerDie2    = document.getElementById("player-die-2");
const playerScore   = document.getElementById("player-round");
const playerTotal   = document.getElementById("player-total");

//Opponent output
const opponentDie1  = document.getElementById("opponent-die-1");
const opponentDie2  = document.getElementById("opponent-die-2");
const opponentScore = document.getElementById("opponent-round");
const opponentTotal = document.getElementById("opponent-total");


//Game variables
const DIE_FACES     = 6;
const ROUNDS        = 3;
const gameRound     = document.getElementsByClassName("round-number");
const ROLL_DELAY    = 2700;

let roundNumber     = 0;
let playerSum       = 0;
let opponentSum     = 0;

const player1   = new Player("You");
const opponent  = new Player("Opponent");

/**
 * Calculate the score given two numbers
 */
function calcScore(die1, die2) {
    let score = 0;
    if(die1 === 1 || die2 === 1) //score is 0 if either number is 1
    {
        return score;
    }
    else if (die1 === die2) //score is added than multiplied by 2 if numbers match
    {
        score = (die1 + die2) * 2;
    }
    else
    {
        score = die1 + die2;
    }
    return score;
}

//Round start
function rollDice() { 
    //Rolling animation
    startGame.innerHTML = "Rolling...";
    startGame.disabled = true;
    playerDie1.src          = `../images/red-dice-roll.gif`;
    playerDie2.src          = `../images/red-dice-roll.gif`;
    opponentDie1.src        = `../images/black-dice-roll.gif`;
    opponentDie2.src        = `../images/black-dice-roll.gif`;
    playRoll();
    //Advance round
    roundNumber++;
    for(let i = 0; i < gameRound.length; i++) {
        gameRound[i].innerHTML = roundNumber;
    }       
        
    setTimeout( function() {
        stopRoll();
        //Play if game is not over
        if(roundNumber <= ROUNDS) {
            startGame.disabled = false;
            startGame.innerHTML = "Roll Dice"; 
            //Player
            let playerRolled1       = player1.rollDie();
            let playerRolled2       = player1.rollDie();
            playerDie1.src          = `../images/red-dice-${playerRolled1}.jpg`;
            playerDie2.src          = `../images/red-dice-${playerRolled2}.jpg`;
            playerSum               += calcScore(playerRolled1, playerRolled2);
            playerScore.innerHTML   = calcScore(playerRolled1, playerRolled2);
            playerTotal.innerHTML   = playerSum;

            //Opponent
            let opponentRolled1     = opponent.rollDie();
            let opponentRolled2     = opponent.rollDie();
            opponentDie1.src        = `../images/black-dice-${opponentRolled1}.jpg`;
            opponentDie2.src        = `../images/black-dice-${opponentRolled2}.jpg`;

            opponentSum             += calcScore(opponentRolled1, opponentRolled2);
            opponentScore.innerHTML = calcScore(opponentRolled1, opponentRolled2);
            opponentTotal.innerHTML = opponentSum;
        }
        //Check number of rounds
        if(roundNumber >= ROUNDS) {
            gameOver();
        }
    }, ROLL_DELAY);   
    
}

//Check totals and declare winner
function gameOver() {
    let whoWins = document.getElementById('end-game');
    if(playerSum > opponentSum) {
        whoWins.innerHTML = `<span class = "player">${player1.name}</span> win!<br/>Good job!`;
    }
    else if (playerSum < opponentSum) {
        whoWins.innerHTML = `Sorry, <span class = "opponent">${opponent.name}</span> wins. <br/>Try again?`;
    }
    else {
        whoWins.innerHTML = `Wow, its a draw!`;
    }
    startGame.style.visibility = "hidden";
    endGamePopUp();
}

function playRoll() {
    document.getElementById("audio").play()
}

function stopRoll() {
    document.getElementById("audio").pause();
    document.getElementById("audio").currentTime = 0;
}
function endGamePopUp() {
    $("#end-game-pop-up").animate({ opacity: 1 }, popupTime);
    $("#end-game-pop-up").css("pointer-events", "auto");
}

/*
allow user to close and hide the pop-up after they have seen it
*/
$("#end-game-btn-close").click(function() {
    $("#end-game-pop-up").animate({ opacity: 0 }, popupTime);
    $("#end-game-pop-up").css("pointer-events", "none"); 
});

