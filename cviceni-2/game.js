// game.js
const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
const scoreElement = document.getElementById('score')
const gameOverDiv = document.getElementById('game-over')

// Game variables
let bird = {
  x: 50,
  y: 300,
  velocity: 0,
  gravity: 0.5,
  jump: -8,
  size: 20,
}

let pipes = []
let score = 0
let gameLoop
let isGameOver = false
const pipeGap = 150
const pipeWidth = 50
const pipeSpacing = 200

// Game controls
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') jump()
})

document.addEventListener('click', jump)

function jump() {
  if (isGameOver) return
  bird.velocity = bird.jump
}

function createPipe() {
  const gapPosition = Math.random() * (canvas.height - pipeGap - 100) + 50
  pipes.push({
    x: canvas.width,
    topHeight: gapPosition,
    bottomY: gapPosition + pipeGap,
    passed: false,
  })
}

function updateGame() {
  // Bird physics
  bird.velocity += bird.gravity
  bird.y += bird.velocity

  // Create pipes
  if (
    pipes.length === 0 ||
    pipes[pipes.length - 1].x < canvas.width - pipeSpacing
  ) {
    createPipe()
  }

  // Update pipes
  pipes.forEach((pipe) => {
    pipe.x -= 2

    // Score counting
    if (!pipe.passed && pipe.x + pipeWidth < bird.x) {
      score++
      scoreElement.textContent = `Score: ${score}`
      pipe.passed = true
    }

    // Collision detection
    if (
      bird.x + bird.size > pipe.x &&
      bird.x - bird.size < pipe.x + pipeWidth &&
      (bird.y - bird.size < pipe.topHeight || bird.y + bird.size > pipe.bottomY)
    ) {
      gameOver()
    }
  })

  // Remove off-screen pipes
  pipes = pipes.filter((pipe) => pipe.x > -pipeWidth)

  // Floor collision
  if (bird.y + bird.size > canvas.height) {
    gameOver()
  }

  draw()
}

function draw() {
  // Clear canvas
  ctx.fillStyle = 'skyblue'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw bird
  ctx.fillStyle = 'yellow'
  ctx.beginPath()
  ctx.arc(bird.x, bird.y, bird.size, 0, Math.PI * 2)
  ctx.fill()

  // Draw pipes
  ctx.fillStyle = 'green'
  pipes.forEach((pipe) => {
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight)
    ctx.fillRect(pipe.x, pipe.bottomY, pipeWidth, canvas.height - pipe.bottomY)
  })
}

function gameOver() {
  isGameOver = true
  gameOverDiv.style.display = 'block'
  document.getElementById('final-score').textContent = score
  cancelAnimationFrame(gameLoop)
}

function startGame() {
  // Reset game state
  bird.y = 300
  bird.velocity = 0
  pipes = []
  score = 0
  isGameOver = false
  gameOverDiv.style.display = 'none'
  scoreElement.textContent = 'Score: 0'

  // Start game loop
  gameLoop = requestAnimationFrame(function update() {
    updateGame()
    if (!isGameOver) {
      requestAnimationFrame(update)
    }
  })
}

// Start the game
startGame()
