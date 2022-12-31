// default values
const GAME_TITLE = "select your move";
const GAME_SUBTITLE = "best of five wins...";
const DEFAULT_SCORE = 0;

// DOM elements
const buttons = document.querySelectorAll("button");
const playerScore = document.querySelector("h3#player-score");
const computerScore = document.querySelector("h3#computer-score");
const gameTitle = document.querySelector("h2#game-title");
const gameSubtitle = document.querySelector("p#game-subtitle");

// game starting values
let computerWins = DEFAULT_SCORE;
let playerWins = DEFAULT_SCORE;

function toEmoji(selection) {
  let selectionEmoji;
  switch (selection.toLowerCase()) {
    case "rock":
      selectionEmoji = "✊";
      break;
    case "paper":
      selectionEmoji = "✋";
      break;
    case "scissors":
      selectionEmoji = "✌️";
  }
  return selectionEmoji
}

function getComputerChoice() {
  let randomChoice;
  switch (Math.floor(3*Math.random())) {
    case 0:
      randomChoice = "rock";
      break;
    case 1:
      randomChoice = "paper";
      break;
    case 2:
      randomChoice = "scissors";
  }
  return randomChoice;
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();

  if (playerSelection === computerSelection) {
    return 0;
  }
  else if ((playerSelection === "rock" && computerSelection === "paper") ||
      (playerSelection === "paper" && computerSelection === "scissors") ||
      (playerSelection === "scissors") && (computerSelection === "rock"))
  {
    return -1;
  }
  else if ((playerSelection === "rock" && computerSelection === "scissors") ||
      (playerSelection === "paper" && computerSelection === "rock") ||
      (playerSelection === "scissors") && (computerSelection === "paper"))
  {
    return 1;
  }

  return undefined;
}

function handlePlayerInput(playerSelection) {
  let titleText;
  let subtitleText;
  const computerSelection = getComputerChoice();
  const roundResult = playRound(playerSelection, computerSelection);
  switch(roundResult) {
    case -1:
      computerWins++;
      titleText = "you lost!"
      subtitleText = `${toEmoji(playerSelection)} < ${toEmoji(computerSelection)}`;
      break;
    case 0:
      titleText = "draw!"
      subtitleText = `${toEmoji(playerSelection)} == ${toEmoji(computerSelection)}`;
      break;
    case 1:
      playerWins++;
      titleText = "you won!";
      subtitleText = `${toEmoji(playerSelection)} > ${toEmoji(computerSelection)}`;
      break;
    default:
      console.log(`somehow got a wacko output: ${roundResult}`)   
  }

  playerScore.textContent = parseInt(playerWins);
  computerScore.textContent = parseInt(computerWins);
  gameTitle.textContent = titleText;
  gameSubtitle.textContent = subtitleText;

  if (playerWins >= 5) {
    setTimeout(function() {
      alert("you won! press ok to play again.");
      resetGame();
    }, 0);
  }
  else if (computerWins >= 5) {
    setTimeout(function() {
      alert("you lost! press ok to play again.");
      resetGame();
    }, 0);
  }
}

function resetGame() {
  playerWins = DEFAULT_SCORE;
  computerWins = DEFAULT_SCORE;
  playerScore.textContent = parseInt(playerWins);
  computerScore.textContent = parseInt(computerWins);
  gameTitle.textContent = GAME_TITLE;
  gameSubtitle.textContent = GAME_SUBTITLE;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => handlePlayerInput(button.id));
});
