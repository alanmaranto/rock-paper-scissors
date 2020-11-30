const buttons = document.querySelectorAll(".pick");
const scoreEl = document.getElementById("score");
const main = document.getElementById("main");
const selection = document.getElementById("selection");
const reset = document.getElementById("reset");
const user_select = document.getElementById("user-select")
const cpu_select = document.getElementById("cpu-choice")
const winner = document.getElementById("winner");

// modal
const openModal = document.getElementById("open")
const closeModal = document.getElementById("close")
const modal = document.getElementById("modal")


const choices = ["paper", "rock", "scissors"];

let score = 0;
let userChoice;

// listeners

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    userChoice = button.getAttribute("data-choice");

    decideWinner();
  });
});

reset.addEventListener("click", () => {
  // show the main || hide the selection
  main.style.display = "flex";
  selection.style.display = "none";
});

openModal.addEventListener('click', () => {
  modal.style.display = 'flex';
})

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
})

function decideWinner() {
  const cpuChoice = pickRandomChoice();

  // update the view
  updateSelection(user_select, userChoice)
  updateSelection(cpu_select, cpuChoice)

  if (userChoice === cpuChoice) {
    // draw
    winner.innerText = 'draw'
  } else if (
    (userChoice === "paper" && cpuChoice === "rock") ||
    (userChoice === "rock" && cpuChoice === "scissors") ||
    (userChoice === "scissors" && cpuChoice === "paper")
  ) {
    // user Won
    updateScore(1);
    winner.innerText = 'win'
  } else {
    // user lost
    updateScore(-1);
    winner.innerText = 'lost'
  }
  // show the selection || hide the main
  main.style.display = "none";
  selection.style.display = "flex";
}

function updateScore(value) {
  score += value;

  scoreEl.innerText = score;
}

function pickRandomChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function updateSelection(selectionEl, choice) {
  // Class reset
  selectionEl.classList.remove("btn-paper");
  selectionEl.classList.remove("btn-rock");
  selectionEl.classList.remove("btn-scissors");

  // update the img
  const image = selectionEl.querySelector("img");
  selectionEl.classList.add(`btn-${choice}`);
  image.src = `./images/icon-${choice}.svg`;
  image.alt = choice;
}
