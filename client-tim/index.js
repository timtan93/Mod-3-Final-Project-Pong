pongScreen = document.createElement('canvas')
const state = { paddleOneY: 250 }
const screenHeight = 375
const screenWidth = 500
const upArrow = 38
const downArrow = 40
const keystate = {}
const SERVER = 'http://10.218.2.156:3000/state'

const paddle = {
  x: null,
  y: state.paddleOneY,
  width: 20,
  height: 100,

  update: function () {
    if (keystate[upArrow]) state.paddleOneY -= 10
    if (keystate[downArrow]) state.paddleOneY += 10
  },
  draw: function () {
    ctx.fillRect(this.x, state.paddleOneY, this.width, this.height)
  }
}

document.addEventListener('keydown', function (e) {
  keystate[e.keyCode] = true
})

document.addEventListener('keyup', function (e) {
  delete keystate[e.keyCode]
})

const canvas = () => {
  pongScreen.width = screenWidth
  pongScreen.height = screenHeight
  ctx = pongScreen.getContext('2d')
  document.body.appendChild(pongScreen)
}

const paddleDimensions = () => {
  paddle.x = paddle.width
  state.paddleOneY = (screenHeight - paddle.height) / 2
}

const loop = () => {
  update()
  draw()

  window.requestAnimationFrame(loop, pongScreen)
}
window.requestAnimationFrame(loop, pongScreen)

const update = () => {
  paddle.update()
}

const draw = () => {
  ctx.fillRect(0, 0, screenWidth, screenHeight)
  ctx.save()
  ctx.fillStyle = '#FF0000'
  paddle.draw()
  ctx.restore()
}

canvas()
paddleDimensions()
loop()
setInterval(updateState, 100)

// function updateState () {
//   fetch(SERVER)
//     .then(resp => resp.json())
//     .then(newState => state.paddleOneY = newState.paddleOneY).then(console.log)
//
//   fetch(SERVER, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(state)
//   })
// }
