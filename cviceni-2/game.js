const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 300;

const box = 10;
let snake = [{ x: 15 * box, y: 15 * box }];
let direction = "RIGHT";
let food = { x: Math.floor(Math.random() * 30) * box, y: Math.floor(Math.random() * 30) * box };

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.keyCode == 37 && direction != "RIGHT") direction = "LEFT";
    else if (event.keyCode == 38 && direction != "DOWN") direction = "UP";
    else if (event.keyCode == 39 && direction != "LEFT") direction = "RIGHT";
    else if (event.keyCode == 40 && direction != "UP") direction = "DOWN";
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.fillRect(food.x, food.y, box, box);

    ctx.fillStyle = "lime";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    let newHead = { x: snake[0].x, y: snake[0].y };

    if (direction == "LEFT") newHead.x -= box;
    if (direction == "RIGHT") newHead.x += box;
    if (direction == "UP") newHead.y -= box;
    if (direction == "DOWN") newHead.y += box;

    if (newHead.x == food.x && newHead.y == food.y) {
        food = { x: Math.floor(Math.random() * 30) * box, y: Math.floor(Math.random() * 30) * box };
    } else {
        snake.pop();
    }

    snake.unshift(newHead);
}

function gameLoop() {
    draw();
    setTimeout(gameLoop, 150);
}

gameLoop();
