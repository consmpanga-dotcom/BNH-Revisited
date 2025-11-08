// script.js
// BNH Revisited logic
// NOTE: Buttons use HTML Events (onclick attributes) as requested.

// Store game choices in an array
const CHOICES = ['Bear', 'Ninja', 'Hunter'];

// Define which choice beats which (circular)
const BEATS = {
  'Bear': 'Ninja', // Bear defeats Ninja
  'Ninja': 'Hunter', // Ninja defeats Hunter
  'Hunter': 'Bear' // Hunter defeats Bear
};

// Win counters (persist for the session)
let playerWins = 0;
let computerWins = 0;

/* Helper DOM refs */
const initialSection = document.getElementById('initial');
const resultSection = document.getElementById('result');
const resultTextEl = document.getElementById('result-text');
const choicesTextEl = document.getElementById('choices-text');
const winCounterEl = document.getElementById('win-counter');
const playerWinsEl = document.getElementById('player-wins');
const computerWinsEl = document.getElementById('computer-wins');

/**
 * Called by button clicks. Performs a single game:
 * - determines computer choice by random index
 * - decides winner
 * - updates counters
 * - displays result view
 *
 * @param {string} playerChoice - one of CHOICES values (e.g., 'Bear')
 */
function playGame(playerChoice) {
  // Defensive: if playerChoice not in array, default to first
  if (!CHOICES.includes(playerChoice)) playerChoice = CHOICES[0];

  // Random computer choice by index
  const randIndex = Math.floor(Math.random() * CHOICES.length);
  const computerChoice = CHOICES[randIndex];

  // Determine outcome
  let outcome = '';
  if (playerChoice === computerChoice) {
    outcome = "It's a tie!";
    // tie does not affect win counters
  } else if (BEATS[playerChoice] === computerChoice) {
    outcome = "You win!";
    playerWins += 1;
  } else {
    outcome = "Computer wins!";
    computerWins += 1;
  }

  // Update the DOM to show result view
  showResult(playerChoice, computerChoice, outcome);
}

/**
 * Show the result screen after a single game.
 * This must display:
 * - result text (large, bold)
 * - the choices made
 * - the win counter sums (player & computer)
 */
function showResult(playerChoice, computerChoice, outcomeText) {
  // Hide initial section and show result section
  initialSection.classList.add('hidden');
  resultSection.classList.remove('hidden');

  // Populate result box
  resultTextEl.textContent = outcomeText;
  choicesTextEl.textContent = `Player chose ${playerChoice} — Computer chose ${computerChoice}.`;

  // Update and display win counters
  playerWinsEl.textContent = playerWins;
  computerWinsEl.textContent = computerWins;
  winCounterEl.classList.remove('hidden');
}

/**
 * Return to the initial page display (Play Again).
 * This should NOT reset the session win counters.
 */
function showInitial() {
  resultSection.classList.add('hidden');
  initialSection.classList.remove('hidden');

  // hide win counter until next single game
  winCounterEl.classList.add('hidden');
  // clear result text for a clean initial display
  resultTextEl.textContent = '';
  choicesTextEl.textContent = '';
}

/* Expose functions to global scope so onclick HTML attributes can call them */
window.playGame = playGame;
window.showInitial = showInitial;