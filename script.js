document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("pongCanvas");
    const ctx = canvas.getContext("2d");

    const paddleWidth = 10;
    const paddleHeight = 100;
    const ballRadius = 10;

    let playerY = (canvas.height - paddleHeight) / 2;
    let aiY = (canvas.height - paddleHeight) / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballDX = 6; // Triple the initial horizontal speed
    let ballDY = 6; // Triple the initial vertical speed

    let playerScore = 0;
    let aiScore = 0;

    let upArrowPressed = false;
    let downArrowPressed = false;

    function drawPaddle(x, y) {
        ctx.fillStyle = "#333";
        ctx.fillRect(x, y, paddleWidth, paddleHeight);
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#ff6f61";
        ctx.fill();
        ctx.closePath();
    }

    function drawScores() {
        ctx.fillStyle = "#333";
        ctx.font = "24px 'Press Start 2P', cursive";
        ctx.fillText(playerScore, canvas.width / 4, 50);
        ctx.fillText(aiScore, 3 * canvas.width / 4, 50);
    }

    function movePaddles() {
        if (upArrowPressed && playerY > 0) {
            playerY -= 21; // Triple the paddle movement speed
        }
        if (downArrowPressed && playerY < canvas.height - paddleHeight) {
            playerY += 21; // Triple the paddle movement speed
        }
        if (aiY + paddleHeight / 2 < ballY) {
            aiY += 12; // Triple the AI paddle movement speed
        } else {
            aiY -= 12; // Triple the AI paddle movement speed
        }
    }

    function moveBall() {
        ballX += ballDX;
        ballY += ballDY;

        if (ballY + ballDY > canvas.height - ballRadius || ballY + ballDY < ballRadius) {
            ballDY = -ballDY;
        }

        if (
            (ballX + ballDX < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) ||
            (ballX + ballDX > canvas.width - paddleWidth && ballY > aiY && ballY < aiY + paddleHeight)
        ) {
            ballDX = -ballDX;
        }

        if (ballX + ballDX > canvas.width - ballRadius) {
            playerScore += 1;
            resetBall();
        }

        if (ballX + ballDX < ballRadius) {
            aiScore += 1;
            resetBall();
        }
    }

    function resetBall() {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballDX = -ballDX;
        ballDY = 6; // Reset to the increased speed
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPaddle(0, playerY);
        drawPaddle(canvas.width - paddleWidth, aiY);
        drawBall();
        drawScores();
        movePaddles();
        moveBall();
        requestAnimationFrame(draw);
    }

    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowUp") {
            upArrowPressed = true;
            event.preventDefault();
        }
        if (event.key === "ArrowDown") {
            downArrowPressed = true;
            event.preventDefault();
        }
    });

    document.addEventListener("keyup", function(event) {
        if (event.key === "ArrowUp") {
            upArrowPressed = false;
        }
        if (event.key === "ArrowDown") {
            downArrowPressed = false;
        }
    });

    draw();
});
