const canvas = document.querySelector('#gameCanvas')
let canvasContext = canvas.getContext('2d')
let ballX = 50
let ballY = 50
let ballSpeedX = 20
let ballSpeedY = 4
let framesPerSecond = 10
// let paddleOneY = 250
let paddleOneHeight = 100
let paddleOneThickness = 10
let paddleTwoY = 250
let paddleTwoHeight = 100
let paddleTwoThickness = 10
let playerOneScore = 0
let playerTwoScore = 0
const winningScore = 7
let showingWinScreen = false
let SERVER = 'http://10.218.2.156:3000/state'

const state = {
    paddleOneY: 250
}
// the width of the ball can be changed over time to make the game more difficult

function calculateMousePosition (evt) {
  let rect = canvas.getBoundingClientRect()
  let root = document.documentElement
  let mouseX = evt.clientX - rect.left - root.scrollLeft
  let mouseY = evt.clientY - rect.top - root.scrollTop
  return {
    x: mouseX,
    y: mouseY
  }
}

function drawNet() {
    for (let i = 0; i < canvas.height; i += 40) {
        colorRect(canvas.width/2 - 1 , i, 2, 20, 'white')
    }
}
function drawEverything (evt) {
  // draw the canvas
  colorRect(0, 0, canvas.width, canvas.height, 'black')
  if (showingWinScreen) {
    canvasContext.fillStyle = 'white'

    if (playerOneScore >= winningScore) {
      canvasContext.fillText('Left player won!!!', 350, 200)
    } else if (playerTwoScore >= winningScore) {
      canvasContext.fillText('Right player won!!!', 350, 200)
    }
    console.log(playerOneScore)
    console.log(playerTwoScore)
    canvasContext.fillText('click to continue', 350, 500)

    return
  }
  drawNet()
  //   draw the left player paddle
  colorRect(0, state.paddleOneY, paddleOneThickness, paddleOneHeight, 'white')
  //   draw the right player paddle
  colorRect(
    canvas.width - paddleTwoThickness,
    // ballY - paddleTwoHeight / 2,
    paddleTwoY,
    paddleTwoThickness,
    paddleTwoHeight,
    'white'
  )

  //   draw the ball
  colorCircle(ballX, ballY, 10, 'white')
  canvasContext.fillText(playerOneScore, 100, 100)
  canvasContext.fillText(playerTwoScore, canvas.width - 100, 100)
}

function colorRect (leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor
  canvasContext.fillRect(leftX, topY, width, height)
}

function colorCircle (centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor
  canvasContext.beginPath()
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true)
  canvasContext.fill()
}

function computerMovement () {
  let paddleTwoYCenter = paddleTwoY + paddleTwoHeight / 2
  if (paddleTwoYCenter < ballY - 35) {
    paddleTwoY += 6
  } else if (paddleTwoYCenter > ballY + 35) {
    paddleTwoY -= 6
  }
}

function moveEverything () {
  if (showingWinScreen) {
    return
  }
  computerMovement()
  ballX += ballSpeedX
  ballY += ballSpeedY
  //   paddleTwoThickness += 1
  //   paddleTwoHeight += 1

  if (ballX <= 0) {
    if (ballY > state.paddleOneY && ballY < state.paddleOneY + paddleOneHeight) {
      ballSpeedX = -ballSpeedX
      let diff = ballY - (state.paddleOneY + paddleOneHeight / 2)
      ballSpeedY = diff * 0.35
    } else {
      playerTwoScore++
      ballReset()
    }
  }
  if (ballX >= canvas.width) {
    if (ballY > paddleTwoY && ballY < paddleTwoY + paddleTwoHeight) {
      ballSpeedX = -ballSpeedX
      let diff = ballY - (paddleTwoY + paddleTwoHeight / 2)
      ballSpeedY = diff * 0.35
    } else {
      playerOneScore++
      ballReset()
    }
  }

  if (ballY <= 0) {
    ballSpeedY = -ballSpeedY
  }
  if (ballY >= canvas.height) {
    ballSpeedY = -ballSpeedY
  }
}

function ballReset () {
  if (playerOneScore >= winningScore || playerTwoScore >= winningScore) {

    showingWinScreen = true

  }
  ballSpeedX = -ballSpeedX
  ballX = canvas.width / 2
  ballY = canvas.height / 2
}

function handleMouseClick () {
  if (showingWinScreen) {
    playerOneScore = 0
    playerTwoScore = 0
    showingWinScreen = false
  }
}

// function updateState() {
//
//     // get request to update state
//     fetch(SERVER).then(resp => resp.json()).then(newState => state.paddleOneY = newState.paddleOneY).then(console.log)
//
//     fetch(SERVER, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(state)
//     })
//
// }



function initalize () {
  // setInterval(updateState, 1000/10)
  setInterval(() => {
    drawEverything()
    moveEverything()
  }, 1000 / framesPerSecond)
  document.addEventListener('keydown', function (evt) {
    console.log(event.key)
    if (event.key === 'ArrowUp') {
      state.paddleOneY -= 10
    }
    if (event.key === 'ArrowDown') {
      state.paddleOneY += 10
    }
  })

  canvas.addEventListener('mousemove', function (evt) {
    let mousePos = calculateMousePosition(evt)
    state.paddleOneY = mousePos.y - paddleOneHeight / 2

  })

  canvas.addEventListener('click', handleMouseClick)
}

initalize()
