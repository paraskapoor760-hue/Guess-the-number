let randomNumber;
let attempts;

// Start or reset the game
function startGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1; // 1-100
    attempts = 0;

    document.getElementById("resultMessage").textContent = "";
    document.getElementById("attemptsMessage").textContent = "Attempts: 0";
    document.getElementById("playAgainBtn").style.display = "none";

    document.getElementById("guessInput").value = "";
    console.log("Random Number (for testing):", randomNumber);
}

// When user submits guess
function checkGuess() {
    const guess = Number(document.getElementById("guessInput").value);

    // ignore empty input
    if (!guess) {
        document.getElementById("resultMessage").textContent = "Please enter a number!";
        return;
    }

    attempts++;
    document.getElementById("attemptsMessage").textContent = "Attempts: " + attempts;

    if (guess < randomNumber) {
        document.getElementById("resultMessage").textContent = "Too low! Try again.";
    } 
    else if (guess > randomNumber) {
        document.getElementById("resultMessage").textContent = "Too high! Try again.";
    }
    else {
        document.getElementById("resultMessage").textContent = "🎉 Congratulations! You guessed it!";
        document.getElementById("playAgainBtn").style.display = "inline-block";
    }
}

// Add event listeners
window.onload = startGame;
document.getElementById("submitBtn").addEventListener("click", checkGuess);
document.getElementById("playAgainBtn").addEventListener("click", startGame);
// --- Animated Background Parallax Effect ---
document.addEventListener("mousemove", (event) => {
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;

    // Moves opposite to cursor
    const posX = (0.5 - x) * 60; 
    const posY = (0.5 - y) * 60;

    document.body.style.backgroundPosition = `${posX}px ${posY}px`;
});
