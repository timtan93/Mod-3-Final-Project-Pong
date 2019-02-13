const canvas = document.querySelector('#gameCanvas')
let canvasContext = canvas.getContext('2d')
// let canvasContext.font = "30px Verdana";
let ballX = 50
let ballY = 50
let ballSpeedX = 20
let ballSpeedY = 4
let framesPerSecond = 30
// let paddleOneY = 250
let paddleOneHeight = 100
let paddleOneThickness = 10
let paddleTwoY = 250
let paddleTwoHeight = 100
let paddleTwoThickness = 10
let playerOneScore = 0
let playerTwoScore = 0
const winningScore = 10
let showingWinScreen = false
let SERVER = 'http://10.218.2.156:3000/state'
const URL = 'http://localhost:3000/games'
// let state.duration = 0;
let sent = false

const state = {
  paddleOneY: 250,
  userId: null,
  duration: 0,
  games: null,
  users: null
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

function renderScors() {
  
}

function getGames () {
  return fetch('http://localhost:3000/games')
    .then(resp => resp.json())
    .then(games => (state.games = games))
}

function getUsers () {
  return fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(users => (state.users = users))
}

function winningScreen () {
  colorRect(0, 0, canvas.width, canvas.height, 'black')
  if (showingWinScreen) {
    canvasContext.fillStyle = 'white'
    //   fetch(URL, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({user_id: 3, score: 0 })
    //  })

    // if (playerOneScore >= winningScore) {
    //   canvasContext.fillText('Left player won!!!', 350, 200)
    // } else
    if (!sent) {
      sendUserScore()
        .then(getGames)
        .then(getUsers)
      sent = true
    }

    if (playerTwoScore >= winningScore) {
      canvasContext.fillText(
        `Game Over! You lasted ${Math.round(state.duration)} seconds!`,
        350,
        200
      )
    }

    canvasContext.fillText('click to continue', 350, 500)
  }
}

function drawNet () {
  for (let i = 0; i < canvas.height; i += 40) {
    colorRect(canvas.width / 2 - 1, i, 2, 20, 'white')
  }
}
function drawEverything (evt) {
  // draw the canvas

  // paddleTwoHeight =  if (state.duration > 10) {

  // } ? canvas.height : paddleTwoHeight

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
  // canvasContext.fillText(playerOneScore, 100, 100)
  // show the scores
  canvasContext.fillStyle = 'blue'
  // ctx.font = "30px Verdana";
  canvasContext.fillText(
    `You have ${10 - playerTwoScore} lives left`,
    canvas.width - 550,
    100
  )
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
    if (
      ballY > state.paddleOneY &&
      ballY < state.paddleOneY + paddleOneHeight
    ) {
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
  if (playerTwoScore >= winningScore) {
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
    state.duration = 0
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

function handleFormSubmit () {
  document.querySelector('form').addEventListener('submit', () => {
    event.preventDefault()
    sent = false
    initalize()
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: event.target.name.value })
    })
      .then(resp => resp.json())
      .then(user => (state.userId = user.id))
  })
}

function sendUserScore () {
  return fetch('http://localhost:3000/games', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: state.userId,
      score: Math.floor(state.duration)
    })
  })
    .then(resp => resp.json())
    .then(console.log)
}

function initalize () {
  // setInterval(updateState, 1000/10)

  setInterval(() => {
    if (!showingWinScreen) {
      state.duration += 1 / framesPerSecond
    }

    winningScreen()

    if (!showingWinScreen) {
      drawEverything()
      moveEverything()
    }
  }, 1000 / framesPerSecond)
  document.addEventListener('keydown', function (evt) {
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

handleFormSubmit()
