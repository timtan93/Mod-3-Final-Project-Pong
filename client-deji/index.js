const canvas = document.querySelector('#gameCanvas')
let canvasContext = canvas.getContext('2d')
let ballX = 50
let ballY = 50
let ballSpeedX = 20
let ballSpeedY = 4
let framesPerSecond = 30
let paddleOneHeight = 100
let paddleOneThickness = 10
let paddleTwoY = 250
let paddleTwoHeight = 100
let paddleTwoThickness = 10
let playerOneScore = 0
let playerTwoScore = 0
const winningScore = 30
let showingWinScreen = false
let SERVER = 'http://10.218.2.156:3000/state'
const URL = 'http://localhost:3000/games'
let sent = false
const state = {
  paddleOneY: 250,
  userId: null,
  duration: 0,
  games: null,
  users: null
}

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

function getGames () {
  // return fetch('http://localhost:3000/games')
  //   .then(resp => resp.json())
  //   .then(games => (state.games = games))
}

function getUsers () {
  // return fetch('http://localhost:3000/users')
  //   .then(resp => resp.json())
  //   .then(users => (state.users = users))
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
      // sendUserScore()
      //   .then(getGames)
      //   .then(getUsers)
      sent = true
    }

    if (playerTwoScore >= winningScore) {
      canvasContext.fillText(
        `Game Over! You lasted ${Math.round(state.duration)} seconds!`,
        0,
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
  canvasContext.fillStyle = 'white'
  // ctx.font = "30px Verdana";
  canvasContext.font = '50px Unknown Font, sans-serif'
  canvasContext.strokeStyle = 'red' // set stroke color to red
  canvasContext.fillText(
    `You have ${30 - playerTwoScore} lives left`,
    canvas.width - 650,
    100
  )
  canvasContext.fillText(
    `Score: ${Math.floor(state.duration)} `,
    canvas.width - 500,
    50
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
    if (ballY > state.paddleOneY && ballY < state.paddleOneY + paddleOneHeight) {
      ballSpeedX = -ballSpeedX
      // let diff = ballY - (state.paddleOneY + paddleOneHeight / 2)
      // ballSpeedY = diff * 0.35
    } else {
      playerTwoScore++
      ballReset()
    }
  }

  if (ballX > canvas.width) {
    if (ballY > paddleTwoY && ballY < paddleTwoY + paddleTwoHeight) {
      ballSpeedX = -ballSpeedX
    } else {
      ballReset()
    }
  }

  if (ballY <= 0) {
    ballSpeedY = -ballSpeedY
  }
  if (ballY >= canvas.height) {
    ballSpeedY = -ballSpeedY
  }

  // if (
  //   ballY > paddleTwoY &&
  //   ballY < paddleTwoY + paddleTwoHeight
  //   // &&
  //   // ballX >= canvas.width - paddleTwoThickness
  // ) {
  //   ballSpeedX = -ballSpeedX
  //   let diff = ballY - (paddleTwoY + paddleTwoHeight / 2)
  //   ballSpeedY = diff * 0.35
  // } else if (
  //   ballY > state.paddleOneY &&
  //   ballY < state.paddleOneY + paddleOneHeight
  //   // &&
  //   // ballX <= 0 + paddleOneThickness
  // ) {
  //   ballSpeedX = -ballSpeedX
  //   let diff = ballY - (state.paddleOneY + paddleOneHeight / 2)
  //   ballSpeedY = diff * 0.35
  // }

  // if (ballX <= 0) {
  //   playerTwoScore++
  //   ballReset()
  // }
  // if (ballX >= canvas.width) {
  //   playerOneScore++
  //   ballReset()
  // }
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

// function roundOne () {
//   if (state.duration > 20) {
//     clearInterval(roundOneInterval)
//   }
//   return (paddleOneHeight = paddleOneHeight * 0.9)
// }

// function roundTwo () {
//   // if (state.duration < 20 || state.duration > 30) {
//   //   // clearInterval(roundTwoInterval)
//   //   // paddleTwoHeight = 0
//   //   // paddleTwoThickness = 10
//   //   return
//   // }

//   if (state.duration > 10) {
//     clearInterval(roundTwoInterval)
//     console.log('here')
//     paddleTwoHeight = 100
//     paddleTwoThickness = 10
//     return
//   }

//   paddleOneHeight = 100
//   paddleTwoHeight = 200000000
//   paddleTwoThickness += 2
// }

// function roundThree () {
//   colorCircle(ballX, ballY, 10, 'white')
// }

// function roundFour () {}

function handleFormSubmit () {
  document.querySelector('form').addEventListener('submit', () => {
    event.preventDefault()
    sent = false
    initalize()
    // fetch('http://localhost:3000/users', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name: event.target.name.value })
    // })
    //   .then(resp => resp.json())
    //   .then(user => (state.userId = user.id))
  })
}

function sendUserScore () {
  //   return fetch('http://localhost:3000/games', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       user_id: state.userId,
  //       score: Math.floor(state.duration)
  //     })
  //   })
  //     .then(resp => resp.json())
  //     .then(console.log)
}

// let roundTwoInterval = setInterval(roundTwo, 50)
function initalize () {
  // setInterval(updateState, 1000/10)

  // let roundTwoInterval = setInterval(roundOne, 2000)

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

// const getLeadersArray = () =>{
//     return fetch(`http://localhost:3000/leaders`)
//           .then(resp => resp.json())
//           .then(leaders => leaderboard = leaders)
//           .then(console.log)
// }
// const leaderboard =
// [{"name":"Tim", "score":80},
// {"name":"Deji", "score":65},
// {"name":"John", "score":33},
// {"name":"hhh", "score":24},
// {"name":"Harry", "score":0}]
// const leadertable = document.createElement("table")
// leadertable.className = "leaderboard"
// leadertable.cellspace= 0
// body = document.querySelector("body")
// body.appendChild(leadertable)

// const addALeader = (player) => {
//     const tr = document.createElement('tr')
//     tr.innerHTML =`<td>${player.name}</td><td>${player.score}</td>`
//     leadertable.appendChild(tr)
// }

// const addLeaders = leaders => {
//     leadertable.innerHTML =""
//     const header = document.createElement("tr")
//     header.innerHTML = '<th>Player</th><th>High <br> Score</th>'
//     leadertable.appendChild(header)
//     for (const leader of leaders)
//     addALeader(leader)
// }

// addLeaders(leaderboard)
