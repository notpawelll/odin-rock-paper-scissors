let computerWins = 0;
let playerWins = 0;

const playerScore = document.querySelector("p.player-score");
const computerScore = document.querySelector("p.computer-score");

const gameTitle = document.querySelector("h2#game-title");
const gameSubtitle = document.querySelector("p#game-subtitle");

const buttons = document.querySelectorAll("button");

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

  if (playerSelection === "rock") {
    if (computerSelection === "rock") {
      return 0;
    }
    else if (computerSelection === "paper") {
      return -1;
    }
    else {
      return 1;
    }
  }
  else if (playerSelection === "paper") {
    if (computerSelection === "rock") {
      return 1;
    }
    else if (computerSelection === "paper") {
      return 0;
    }
    else {
      return -1;
    }
  }
  else { // playerSelection == "scissors"
    if (computerSelection === "rock") {
      return -1;
    }
    else if (computerSelection === "paper") {
      return 1;
    }
    else {
      return 0;
    }
  }
}

function game() {
  let playerWins = 0;
  let computerWins = 0;
  playerScore.textContent = playerWins;
  computerScore.textContent = computerWins;

  for (let i = 0; i < 5; i++) {
    let playerSelection = "";
    while (playerSelection !== "rock" && playerSelection !== "paper" && playerSelection !== "scissors") {
      playerSelection = prompt(`Round ${i + 1}. Please make your choice (rock, paper, or scissors):`);
      playerSelection = playerSelection.toLowerCase();
    }

    let computerSelection = getComputerChoice();
    switch (playRound(playerSelection, computerSelection)) {
      case -1:
        console.log(`You lost this round! The computer chose ${computerSelection}.`);
        computerWins++;
        break;
      case 1:
        console.log(`You won this round! The computer chose ${computerSelection}.`);
        playerWins++;
        break;
      case 0:
        console.log(`The computer chose ${computerSelection}. This round results in a draw.`);
    }
  }

  console.log(`playerWins: ${playerWins}; computerWins: ${computerWins}`);
  if (playerWins > computerWins) {
    console.log("You won!");
  }
  else if (playerWins < computerWins) {
    console.log("You lose!");
  }
  else {
    console.log("Draw!");
  }
}

function handlePlayerInput(playerSelection) {
  let titleText;
  let subtitleText;
  const computerSelection = getComputerChoice();
  switch(playRound(playerSelection, computerSelection)) {
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
  }

  playerScore.textContent = parseInt(playerWins);
  computerScore.textContent = parseInt(computerWins);
  gameTitle.textContent = titleText;
  gameSubtitle.textContent = subtitleText;

  if (playerWins >= 5) {
    alert("You won!");
    resetGame();
  }
  else if (computerWins >= 5) {
    alert("You lost!");
    resetGame();
  }
}

function resetGame() {
  playerWins = 0;
  computerWins = 0;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => handlePlayerInput(button.id));
});
