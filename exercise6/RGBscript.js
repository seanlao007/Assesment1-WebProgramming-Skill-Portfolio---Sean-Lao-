const colorToGuessEl = document.getElementById('colorToGuess');
const livesEl = document.querySelector('#lives span');
const scoreEl = document.querySelector('#score span');
const colorGridEl = document.querySelector('.color-grid');
const messageEl = document.getElementById('message');
const gameOverEl = document.getElementById('gameOver');
const finalScoreEl = document.getElementById('finalScore');
const newGameBtn = document.getElementById('newGame');
const playAgainBtn = document.getElementById('playAgain');
/* This initial block selects all the necessary HTML elements using their IDs and classes. 
   Storing these in constants (const) allows the script to quickly update the text and styles during gameplay. */

let correctColor = '';
let lives = 3;
let score = 0;
let numberOfOptions = 3;
/* These variables track the current state of the game, including the player's health, points, and the target color. 
   Using 'let' allows these values to change as the player makes guesses or starts a new game. */

document.addEventListener('DOMContentLoaded', initGame);
/* This event listener ensures the script waits for the HTML to finish loading before running the initGame function. 
   This prevents errors that happen if the script tries to find elements that don't exist yet. */

function initGame() {
    lives = 3;
    score = 0;
    numberOfOptions = 3;
    livesEl.textContent = lives;
    scoreEl.textContent = score;
    gameOverEl.classList.add('hidden');
    startNewRound();
}
/* The initGame function resets all stats to their starting values and hides the Game Over screen. 
   It serves as the main "Reset" logic for whenever the player starts a fresh session. */

function startNewRound() {
    correctColor = generateRandomColor();
    colorToGuessEl.textContent = correctColor.toUpperCase();
    generateColorOptions();
    messageEl.textContent = "Choose a color";
    messageEl.className = "";
}
/* This function prepares a single round by picking a new target color and resetting the message text. 
   It ensures that the player is always presented with a fresh challenge after every guess. */

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
/* This function generates a random color using the RGB format (Red, Green, Blue). 
   It picks a random number between 0 and 255 for each channel to create one of millions of possible colors. */

function generateColorOptions() {
    colorGridEl.innerHTML = '';
    const options = [correctColor];
    
    while (options.length < numberOfOptions) {
        let col = generateRandomColor();
        if (!options.includes(col)) options.push(col);
    }
    
    options.sort(() => Math.random() - 0.5);

    options.forEach(color => {
        const div = document.createElement('div');
        div.className = 'color-option';
        div.style.backgroundColor = color;
        
        div.onclick = function() {
            // We compare the style directly to the correctColor variable
            if (div.style.backgroundColor === correctColor) {
                score++;
                scoreEl.textContent = score;
                messageEl.textContent = "Correct!";
                messageEl.className = "success";
                if (score % 5 === 0) numberOfOptions = Math.min(numberOfOptions + 1, 6);
                setTimeout(startNewRound, 1000);
            } else {
                lives--;
                livesEl.textContent = lives;
                messageEl.textContent = "Wrong!";
                messageEl.className = "error";
                if (lives <= 0) {
                    finalScoreEl.textContent = score;
                    gameOverEl.classList.remove('hidden');
                }
            }
        };
        colorGridEl.appendChild(div);
    });
}
/* This large block creates the interactive color squares and handles the "Win/Loss" logic for each click. 
   It scales the difficulty by adding more color options every 5 points and displays the Game Over screen when lives hit zero. */

newGameBtn.onclick = initGame;
playAgainBtn.onclick = initGame;
/* These lines attach the initGame function to the actual buttons on the screen. 
   This makes the "New Game" and "Play Again" buttons functional so the user can restart whenever they want. */
