// Game logic (original simple)
let randomNumber;
let attempts;

function startGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1; // 1-100
  attempts = 0;

  document.getElementById("resultMessage").textContent = "";
  document.getElementById("attemptsMessage").textContent = "Attempts: 0";
  document.getElementById("playAgainBtn").style.display = "none";
  document.getElementById("guessInput").value = "";
  console.log("Random Number (for testing):", randomNumber);
}

function checkGuess() {
  const guessField = document.getElementById("guessInput");
  const guess = Number(guessField.value);

  if (!guess || guess < 1 || guess > 100) {
    document.getElementById("resultMessage").textContent = "Please enter a number between 1 and 100!";
    return;
  }

  attempts++;
  document.getElementById("attemptsMessage").textContent = "Attempts: " + attempts;

  if (guess < randomNumber) {
    document.getElementById("resultMessage").textContent = "Too low! Try again.";
  } else if (guess > randomNumber) {
    document.getElementById("resultMessage").textContent = "Too high! Try again.";
  } else {
    document.getElementById("resultMessage").textContent = "🎉 Congratulations! You guessed it!";
    document.getElementById("playAgainBtn").style.display = "inline-block";
  }
}

// Wire up the game events after DOM loads
window.addEventListener("load", () => {
  startGame();
  document.getElementById("submitBtn").addEventListener("click", checkGuess);
  document.getElementById("playAgainBtn").addEventListener("click", startGame);

  // Allow Enter key to submit guess
  document.getElementById("guessInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkGuess();
  });
});


// ----------------------
// Animated Background (opposite-direction parallax)
// ----------------------
//
// Approach:
// - Track mouse moves and compute normalized cursor position (0..1).
// - Compute target background-position percentage that moves opposite to cursor.
// - Smoothly interpolate (lerp) current position toward target using requestAnimationFrame for smoothness.
// - This avoids jitter and works even if mousemove events are very frequent.

(() => {
  const body = document.body;
  // How strong the movement is (in percentage offset)
  const strength = 8; // try values 0..20 — bigger = more movement
  let targetX = 50;
  let targetY = 50;
  let currentX = 50;
  let currentY = 50;
  let rafId = null;

  // mouse handler: convert to opposite-direction target in percentages
  function onMouseMove(e) {
    const nx = e.clientX / window.innerWidth;  // 0..1
    const ny = e.clientY / window.innerHeight; // 0..1

    // Opposite direction: center (0.5) + (0.5 - nx) * strength
    targetX = 50 + (0.5 - nx) * strength * 2; // multiply for more visible movement
    targetY = 50 + (0.5 - ny) * strength * 2;
    // keep bounds sane
    targetX = Math.max(0, Math.min(100, targetX));
    targetY = Math.max(0, Math.min(100, targetY));

    // start animation loop if not already running
    if (rafId === null) rafId = requestAnimationFrame(step);
  }

  // animation step: lerp current toward target and update background-position
  function step() {
    // simple lerp factor: closer to 1 is snappier; lower is smoother
    const lerpFactor = 0.12;
    currentX += (targetX - currentX) * lerpFactor;
    currentY += (targetY - currentY) * lerpFactor;

    // apply as percent (background-position expects "x% y%")
    body.style.backgroundPosition = `${currentX}% ${currentY}%`;

    // if almost at target, stop the loop
    if (Math.abs(currentX - targetX) < 0.01 && Math.abs(currentY - targetY) < 0.01) {
      rafId = null;
    } else {
      rafId = requestAnimationFrame(step);
    }
  }

  // Also gently return to center when mouse leaves window
  function onMouseLeave() {
    targetX = 50;
    targetY = 50;
    if (rafId === null) rafId = requestAnimationFrame(step);
  }

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseleave", onMouseLeave);
  window.addEventListener("blur", onMouseLeave);
})();
