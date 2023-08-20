// ... Previous code ...

const paddleSpeed = 5;
const paddleAIReactionTime = 300; // Time in milliseconds for the AI to react
const wallHitSound = new Audio("wall_hit.wav");
const paddleHitSound = new Audio("paddle_hit.wav");
const scoreSound = new Audio("score.wav");

// Right Paddle AI
function rightPaddleAI() {
    const centerY = rightPaddleY + paddleHeight / 2;
    if (centerY < ballY - paddleAIReactionTime / 2) {
        rightPaddleY += paddleSpeed;
    } else if (centerY > ballY + paddleAIReactionTime / 2) {
        rightPaddleY -= paddleSpeed;
    }
}




// Update game logic
function update() {
    // ... Previous code ...

    // Right Paddle AI
    rightPaddleAI();

    // Ball collision with walls
    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
        wallHitSound.play();
    }

    // Ball collision with paddles
    if (
        ballX < paddleWidth &&
        ballY > leftPaddleY &&
        ballY < leftPaddleY + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
        paddleHitSound.play();
    }

    if (
        ballX > canvas.width - paddleWidth &&
        ballY > rightPaddleY &&
        ballY < rightPaddleY + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
        paddleHitSound.play();
    }

    // Ball out of bounds
    if (ballX < 0) {
        rightScore++;
        scoreSound.play();
        if (rightScore === winningScore) {
            gameOver("Right");
        } else {
            reset();
        }
    }
    if (ballX > canvas.width) {
        leftScore++;
        scoreSound.play();
        if (leftScore === winningScore) {
            gameOver("Left");
        } else {
            reset();
        }
    }
}

// Game over function
function gameOver(winner) {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(`${winner} player wins!`, canvas.width / 2 - 150, canvas.height / 2);
    ctx.font = "20px Arial";
    ctx.fillText("Click to restart", canvas.width / 2 - 80, canvas.height / 2 + 40);
    canvas.addEventListener("click", () => {
        reset();
        leftScore = 0;
        rightScore = 0;
        gameLoop();
    });
}

  // ... Previous code ...

