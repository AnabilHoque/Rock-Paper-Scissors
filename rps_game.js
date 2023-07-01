const SHAPES = ["rock", "paper", "scissors"];
const NUM_SHAPES = SHAPES.length;
let playerScore = 0;
let computerScore = 0;

function capitaliseWord(word) {
    let firstLetter = word.charAt(0);
    let firstletterCapitalised = firstLetter.toUpperCase();
    let remainingLettersLowerCase = word.slice(1).toLowerCase();
    return firstletterCapitalised + remainingLettersLowerCase;
}

function getComputerChoice() {
    // Math.floor(Math.random() * (max - min) + min); returns integer between max (exclusive) and min (inclusive)
    let randomIdx = Math.floor(Math.random() * NUM_SHAPES);
    return SHAPES[randomIdx];
}

function playAgainstRock(playerSelectionCaseInsensitive) {
    let result = -1;
    switch (playerSelectionCaseInsensitive) {
        case "scissors":
            result = 0;
            break;
        case "rock":
            result = 1;
            break;
        case "paper":
            result = 2;
            break;
    }
    return result;
}

function playAgainstPaper(playerSelectionCaseInsensitive) {
    let result = -1;
    switch (playerSelectionCaseInsensitive) {
        case "rock":
            result = 0;
            break;
        case "paper":
            result = 1;
            break;
        case "scissors":
            result = 2;
            break;
    }
    return result;
}

function playAgainstScissors(playerSelectionCaseInsensitive) {
    let result = -1;
    switch (playerSelectionCaseInsensitive) {
        case "paper":
            result = 0;
            break;
        case "scissors":
            result = 1;
            break;
        case "rock":
            result = 2;
            break;
    }
    return result;
}

function getText(playerSelectionCaseInsensitive, computerSelection, result) {
    if (result === 0) {
        return `You Lose! ${capitaliseWord(computerSelection)} beats ${capitaliseWord(playerSelectionCaseInsensitive)}`;   
    } else if (result === 1) {
        return `It's a Draw!`;
    } else {
        // result === 2
        return `You Win! ${capitaliseWord(playerSelectionCaseInsensitive)} beats ${capitaliseWord(computerSelection)}`;
    }
}


function playRound(playerSelection, computerSelection) {
    let playerSelectionCaseInsensitive = playerSelection.toLowerCase();
    let result;
    if (computerSelection === "rock") {
        result = playAgainstRock(playerSelectionCaseInsensitive);
    } else if (computerSelection === "paper") {
        result = playAgainstPaper(playerSelectionCaseInsensitive);
    } else {
        // computerSelection === "scissors"
        result = playAgainstScissors(playerSelectionCaseInsensitive);
    }
    return getText(playerSelectionCaseInsensitive, computerSelection, result);
}

function updateScoreFromText(text) {
    let scoreResult = text.split(" ")[1]; // access Lose!, Win! or something else <=> Draw
    if (scoreResult === "Lose!") {
        computerScore++;
    } else if (scoreResult === "Win!") {
        playerScore++;
    }
}

function addResults(textToDisplay) {
    // dynamically add new paragraphs showing the textual results
    const container = document.querySelector(".results");
    const resultPara = document.createElement("p");
    resultPara.textContent = textToDisplay;
    container.appendChild(resultPara);
}

function addScores(textToDisplay) {
    // dynamically add the scores showing the numerical results
    updateScoreFromText(textToDisplay);
    const playerScoreSpan = document.querySelector("#player-score");
    const compueterScoreSpan = document.querySelector("#computer-score");

    playerScoreSpan.textContent = playerScore;
    compueterScoreSpan.textContent = computerScore;
}

function announceWinner() {
    const container = document.querySelector(".container");
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
    const finalResultHeader = document.createElement("h2");
    if (playerScore === 5) {
        finalResultHeader.textContent = "You reached the score of 5 points first. You are the Winner!!!";
    } else {
        finalResultHeader.textContent = "Unfortunately for you the Computer reached the score of 5 points first. You lost!!!"
    }

    container.appendChild(finalResultHeader);
}

function callPlayRound(e) {
    if (playerScore === 5 || computerScore === 5) {
        announceWinner();
        return;
    }

    // get event e information
    const htmlTag = e.target;
    const htmlTagID = htmlTag.getAttribute("id");

    // get random computer choice
    const computerSelection = getComputerChoice();

    // play a single round and get textual result
    const textToDisplay = playRound(htmlTagID, computerSelection);

    // dynamically add new paragraphs showing the textual results
    addResults(textToDisplay);

    // dynamically add the scores showing the numerical results
    addScores(textToDisplay);
}

const buttons = Array.from(document.querySelectorAll(".button-selection"));
buttons.forEach(button => {
    button.addEventListener("click", callPlayRound)
});

/*
function game() {
    let playerScore = 0;
    let computerScore = 0;
    for (let i = 0; i < 5; i++) {
        let playerSelection = prompt("Rock, Paper or Scissors?");
        while (!SHAPES.includes(playerSelection.toLowerCase())) {
            alert("Invalid choice!");
            playerSelection = prompt("Rock, Paper or Scissors?");
        }
        let computerSelection = getComputerChoice();
        let resultText = playRound(playerSelection, computerSelection);
        console.log(resultText);

        let scoreResult = resultText.split(" ")[1]; // access Lose!, Win! or something else <=> Draw
        if (scoreResult === "Lose!") {
            computerScore++;
        } else if (scoreResult === "Win!") {
            playerScore++;
        }
    }

    if (playerScore > computerScore) {
        console.log("From the result of the 5 games, you Win!");
    } else if (playerScore < computerScore) {
        console.log("From the result of the 5 games, you Lose!");
    } else {
        // playerScore === computerScore
        console.log("From the result of the 5 games, it is a Draw!");
    }
}
*/