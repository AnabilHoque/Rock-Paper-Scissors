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

    if (playerScore === 5 || computerScore === 5) {
        announceWinner();
    }
}

function announceWinner() {
    const finalWinnerSpan = document.querySelector("#final-winner span");
    if (playerScore === 5) {
        finalWinnerSpan.textContent = "Game Over! You win.";
    } else {
        finalWinnerSpan.textContent = "Game Over! You lose.";
    }
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

function restartGame() {
    // reset final winner
    const finalWinnerSpan = document.querySelector("#final-winner span");
    finalWinnerSpan.textContent = "No winner yet.";

    // reset scores
    const playerScoreSpan = document.querySelector("#player-score");
    const compueterScoreSpan = document.querySelector("#computer-score");
    playerScoreSpan.textContent = 0;
    compueterScoreSpan.textContent = 0;
    playerScore = 0;
    computerScore = 0;

    // reset results
    const results = document.querySelector(".results");
    const resultsParaChildren = document.querySelectorAll(".results p");
    for (let i = 0; i < resultsParaChildren.length; i++) {
        results.removeChild(resultsParaChildren[i]);
    }
}

const gameButtons = Array.from(document.querySelectorAll(".button-selection"));
gameButtons.forEach(button => {
    button.addEventListener("click", callPlayRound)
});

const restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", restartGame);