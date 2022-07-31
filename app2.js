'use strict';

// Select elements.
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const winnerText = document.querySelector('.winner--text');
// Player elements
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
// Dice element
const diceEl = document.querySelector('.dice');
// Dice roll function elements
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  // Starting conditions.
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  winnerText.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
init()

// Reassign player when diceNumber is equal to 1. If activePlayer is equal to 0 then keep activePlayer at 0, else switch activePlayer to 1
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Function for rolling dice.
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. Generate a random number, store in diceNumber variable.
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice images, use diceNumber to dynamically generate images.
    diceEl.classList.remove('hidden');
    diceEl.src = `./img/dice-${diceNumber}.png`;

    // 3. Checking if dice rolled to 1: if true, switch to next player, and reset current player's score.
    if (diceNumber !== 1) {
      // Add dice number to current score.
      currentScore += diceNumber;
      // Dynamically find current player and add the current score to current player's text content in HTML.
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      // Player winning text
      if (activePlayer === 0) {
        winnerText.classList.remove('hidden');
        winnerText.textContent = 'Player 1 wins!';
      } else {
        winnerText.classList.remove('hidden');
        winnerText.textContent = 'Player 2 wins!';
      }
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', () => {
  init()
});