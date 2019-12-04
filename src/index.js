document.addEventListener("DOMContentLoaded", function(){

  canvas.addEventListener("click", function(e){
    console.log("x: ", e.clientX - 8)
    console.log("y: ", e.clientY - 8)
    // console.dir(e.target)

    // let newBall = new Ball(game)
    // newBall.position = {x: e.clientX - 8, y: e.clientY - 8}
    // // newBall.speed = {x: 10, y: 5}
    // game.balls.push(newBall)
  })



  function gameLoop(){
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT)
    game.draw(ctx)
    game.update()
    requestAnimationFrame(gameLoop)
  }

  gameLoop()
  // requestAnimationFrame(gameLoop)
  })