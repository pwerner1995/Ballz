class InputHandler{
  constructor(paddle){
    document.addEventListener("keydown", function(e){
      switch(e.keyCode){
        case 37: // left
          paddle.moveLeft()
          break
        
        case 39: // right
          paddle.moveRight()
          break
        }
      })

    document.addEventListener("keyup", function(e){
      switch(e.keyCode){
        case 37: // left
          if(paddle.speed < 0){
            paddle.stop()
          }
        break
        
        case 39: // right
          if(paddle.speed>0){
            paddle.stop()
          }
        break
        }
      })
    }
  }