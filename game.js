function getComputerChoice() {
  let randomChoice;
  switch (Math.floor(3*Math.random())) {
    case 0:
      randomChoice = "Rock";
      break;
    case 1:
      randomChoice = "Paper";
      break;
    case 2:
      randomChoice = "Scissors";
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