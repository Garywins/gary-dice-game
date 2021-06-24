//three second delay before popup
const delay = 3000;

//500 millisecond animation for popup
const popupTime = 500;

//track if he user has already started the game
//dont show the popup if they have
let userHasNotStartedGameYet = true;

/*
show the pop-up after waiting for a few seconds
    setTimeout( function(){}, delayInMilliseconds );
*/
setTimeout( function() {
    if(userHasNotStartedGameYet) {
        showPopup();
    }
}, delay);

function showPopup() {
    $("#pop-up").animate({ opacity: 1 }, popupTime);
    $("#pop-up").css("pointer-events", "auto");
}

/*
allow user to close and hide the pop-up after they have seen it
*/
$("#btn-close").click(function() {
    $("#pop-up").animate({ opacity: 0 }, popupTime);
    $("#pop-up").css("pointer-events", "none"); 
});

const startGame     = document.getElementById("btn-roll");
const resetGame     = document.getElementById("btn-reset");

//disable reset button if game is not started
resetGame.disabled = true;

//roll dice is clicked
startGame.addEventListener("click", function() {
    userHasNotStartedGameYet = false;
    resetGame.disabled = false;
    rollDice();
});

//reset button is clicked
resetGame.addEventListener("click", function() {
    resetGame.disabled = true;
    document.location.reload();
    
});

/**
 * show/hide the rules
 */
function toggleRules() {
    let rulesList = document.getElementById("rules");
    if(rulesList.style.display === "none")
    {
        rulesList.style.display = "block";
        document.querySelector('#toggle').innerHTML = 'Hide';
    } 
    else 
    {
        rulesList.style.display = "none";
        document.querySelector('#toggle').innerHTML = 'Show';
    }
}