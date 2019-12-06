let game = new Game(GAME_WIDTH, GAME_HEIGHT)

document.addEventListener("DOMContentLoaded", function(){

  canvas.addEventListener("click", function(e){
    console.log("x: ", e.clientX - 8)
    console.log("y: ", e.clientY - 8)
    console.log(e.target)
    // console.dir(e.target)

    // let newBall = new Ball(game)
    // newBall.position = {x: e.clientX - 8, y: e.clientY - 8}
    // // newBall.speed = {x: 10, y: 5}
    // game.balls.push(newBall)
  })

  

let lives = document.createElement("div")
// scoreBoard.insertAdjacentElement("afterend", lives)
lives.innerHTML = `Lives: ${game.lives}`

  game.init()
  game.build()
  // console.log(game)
  game.gameLoop()
  // requestAnimationFrame(gameLoop)
})