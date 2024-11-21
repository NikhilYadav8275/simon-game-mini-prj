let gameArray = [];
let userArray = [];

let btns = ["red", "violet", "blue", "green"];

let started = false;
let level = 0;
let highestScore = 0; // Variable to store the highest score

let h3 = document.querySelector("h3");
let highestScoreDisplay = document.querySelector(".highest-score"); // Assuming an element with this class to display the score

// Attach event listener to start the game on keypress
document.addEventListener("keypress", function() {
    if (!started) {
        console.log("game started!");
        started = true;
        levelup();
    }
});

// Function to flash a button
function flash(button) {
    button.classList.add("flash");
    setTimeout(function() {
        button.classList.remove("flash");
    }, 250);
}

function user(button) {
    button.classList.add("user");
    setTimeout(function() {
        button.classList.remove("user");
    }, 250);
}

// Level up function to choose a random button and increase level
function levelup() {
    userArray = [];
    level++;
    h3.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameArray.push(randColor);
    console.log(gameArray);

    flash(randBtn);
}

function checkBtns(idx) {
    if (userArray[idx] === gameArray[idx]) {
        if (userArray.length === gameArray.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        // Update the highest score if the current level is greater
        if (level > highestScore) {
            highestScore = level - 1; // Subtract 1 as level increments before game over
            highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;
        }

        h3.innerHTML = `Game over! Your score is <b>${level - 1}</b> <br> Press another key to continue!`; 
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 500);
        reset();
    }
}

function btnPress() {
    console.log(this);
    let btn = this;
    user(btn);
    let userColor = btn.getAttribute("id");
    userArray.push(userColor);
    checkBtns(userArray.length - 1);
}

let allBtns = document.querySelectorAll(".btnDiv");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameArray = [];
    userArray = [];
    level = 0;
}
