"use strict";

//comment for re-do this project(improvements need to do):
//1. use dynamically template literal id instead for loops
//2. declare the parameters outside the functions instead of re-declaring
//   and over again inside the function.Dont reply on the html textContent
//   all the parameters should be stored in the backend
//3. write comments/steps with 1.2.3..before coding
//4. the scores should be global parameter declared in the backend.
//   try using array to store it.e.g. scores[0,0] and retrive it using
//   score[0] score[1]
//   score[1] = scores[1] + currentScore  //assign new value to the array el
//5. use .toggle() method to switch active player
//6. have a boolean value for checking if its playing game or not to determine
//   whether should make the eventlistener buttons not functional
//   boolean value + if statement
//   I used the methods of disable the buttons:   btnHold.disabled = false/true ;
//7. good to know :even a class is not on the classList,its ok to tell js to
//   remove it.

//comment of what was good :
//1.stored repeating code in functions
//2.the code actually working and meet the requirements although can done in a better way I assume

// get each player section
const players = document.querySelectorAll(".player");
// get each btn
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const dice = document.querySelector(".dice");
// switch player function - function expression
const switchPlayer = function () {
  // use for loop to switch player
  for (let i = 0; i < players.length; i++) {
    if (players[i].classList.contains("player--active")) {
      players[i].classList.remove("player--active");
    } else {
      players[i].classList.add("player--active");
    }
  }
};
// activePLayer = activePlayer === 0? 1:0;

// display current score funtion -function declaration
function displayCurrentScore(currentPlayer, currentScore) {
  currentPlayer.querySelector(".current-score").textContent = currentScore;
}

// display total score function - function declartion
function displayTotalScore(currentPlayer, totalScore) {
  currentPlayer.querySelector(".score").textContent = totalScore;
}

// event listener when click btnRoll
btnRoll.addEventListener("click", function () {
  //   const dice1 = Math.round(Math.random() * 6);  0-6
  const activePlayer = document.querySelector(".player--active");
  const rollADice = Math.trunc(Math.random() * 6) + 1; // 1-6
  const diceImg = document.querySelector(".dice");
  let currentScore = Number(
    activePlayer.querySelector(".current-score").textContent
  );
  // when starting a new game,show the dice
  if (diceImg.classList.contains("hidden")) {
    diceImg.classList.remove("hidden");
  }
  diceImg.src = `dice-${rollADice}.png`;
  if (rollADice === 1) {
    currentScore = 0;
    displayCurrentScore(activePlayer, currentScore);
    switchPlayer();
  } else {
    currentScore = currentScore + rollADice;
    displayCurrentScore(activePlayer, currentScore);
  }
});

// event listener when click btnHold
btnHold.addEventListener("click", function () {
  const activePlayer = document.querySelector(".player--active");
  let totalScore = Number(activePlayer.querySelector(".score").textContent);
  let currentScore = Number(
    activePlayer.querySelector(".current-score").textContent
  );
  totalScore = totalScore + currentScore;
  displayTotalScore(activePlayer, totalScore);
  // set winner!
  if (totalScore >= 10) {
    activePlayer.classList.add("player--winner");
    //forget to do it
    activePlayer.classList.remove("player--active");
    //disable two event listeners
    dice.classList.add("hidden");
    btnHold.disabled = true;
    btnRoll.disabled = true;
  } else {
    currentScore = 0;
    displayCurrentScore(activePlayer, currentScore);
    switchPlayer();
  }
});

//// event listener when click reset button
btnNew.addEventListener("click", function () {
  // use for loop to remove all pre-settings for each player
  for (let i = 0; i < players.length; i++) {
    // remove all settings
    if (players[i].classList.contains("player--active")) {
      players[i].classList.remove("player--active");
    }
    if (players[i].classList.contains("player--winner")) {
      players[i].classList.remove("player--winner");
    }
    let totalScore = players[i].querySelector(".score").textContent;
    let currentScore = players[i].querySelector(".current-score").textContent;
    totalScore = 0;
    currentScore = 0;
    displayTotalScore(players[i], totalScore);
    displayCurrentScore(players[i], currentScore);
  }
  // set player--0 to active player
  players[0].classList.add("player--active");
  // hide the dice when click new game button
  dice.classList.add("hidden");

  // get event listeners back
  btnHold.disabled = false;
  btnRoll.disabled = false;
});

//Wrong way to do it.disable click event listener
//   btnRoll.removeEventListener('click', eventHandler);
//   btnHold.removeEventListener('click', eventHandler);

// for (let i = 0; i < players.length; i++) {
//   players[i].addEventListener('change', function () {
//     // console.log('111');
//     // const currentTotalScore = Number(
//     //   players[i].querySelector('.score').textContent
//     // );
//     // if (currentTotalScore >= 10) {
//     //   console.log('111');

//     // }
//   });
// }

// Low efficiency way.
// let player0TotalScore = document.querySelector('#score--0').textContent
// let player1TotalScore = document.querySelector('#score--1').textContent
// let player0Current = document.querySelector('#current--0').textContent
// let player1Current =document.querySelector('#current--1').textContent

//   player0TotalScore = 0;
//   player1TotalScore = 0;
//   player0Current = 0;
//   player1Current = 0;
//   displayTotalScore(player0TotalScore);
//   displayTotalScore(player1TotalScore);
//   displayCurrentScore(player0Current);
//   displayCurrentScore(player1Current);

//     if(!plays[0].classList.contains('player--active')){
//         plays[0].classList.add('player--active')
//        }
//         else if(plays[1].classList.contains('player--active')){
//         plays[1].classList.remove('player--active')
//        }
// });
