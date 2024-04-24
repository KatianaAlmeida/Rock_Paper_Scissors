let score = JSON.parse(localStorage.getItem('score')) || {
  looses: 0,
  ties: 0,
  wins: 0
};

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay();
});

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  if (!isAutoPlaying) { //  setInterval returns a interval ID
    intervalID = setInterval(() => { // arrow function
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalID); //  clearInterval receives an intervalID and stops the interval
    isAutoPlaying = false;
  }

}

displayScoreParagraphElement(); //  adding text inside the paragraph

function pickComputerMove() {
  const randomNumber1 = Math.random(); // 0 <= number < 1

  let computerMove = "";
  if (randomNumber1 >= 0 && randomNumber1 < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber1 >= 1 / 3 && randomNumber1 < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber1 >= 2 / 3 && randomNumber1 < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You Lose.";
    } else if (computerMove === "scissors") {
      result = "You Win.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You Lose.";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You Lose.";
    } else if (computerMove === "paper") {
      result = "You Win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  }

  if (result === "You Win.") {
    score.wins += 1;
  } else if (result === "You Lose.") {
    score.looses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  displayScoreParagraphElement();

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You picked
<img class="move-icon" src="images/${playerMove}-emoji.png" alt="">
Computer picked
<img class="move-icon" src="images/${computerMove}-emoji.png" alt="">`;

}

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  scores();
  displayScoreParagraphElement();
});

function displayScoreParagraphElement() {
  document.querySelector('.js-score').innerHTML =
    `Wins ${score.wins}, Looses ${score.looses}, Ties ${score.ties}`; // deletes the previous information and adds and return the new one
}

function scores() {
  score.looses = 0;
  score.ties = 0;
  score.wins = 0;
  localStorage.removeItem('score');
}

