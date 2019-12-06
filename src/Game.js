class Game{
  constructor(gameWidth, gameHeight){
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
  }

  init(){
    this.ball = new Ball(this)
    this.bricks = []
    this.leftPaddle = new Paddle(this, leftPaddleOpts)
    this.rightPaddle = new Paddle(this, rightPaddleOpts)
    this.topPaddle = new Paddle(this, topPaddleOpts)
    this.bottomPaddle = new Paddle(this, bottomPaddleOpts)
    this.paddles = [this.leftPaddle, this.rightPaddle, this.topPaddle, this.bottomPaddle]
    this.inputHandler = new InputHandler(this)
    this.score = {value: 0, element: document.querySelector("div#score")}
    this.lives = {value: 3, element: document.querySelector("div#lives")}
    this.state = true
  }

  gameLoop = () => {
    let game = this
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT)
    this.draw(ctx)
    this.update()
    if (this.state){
      requestAnimationFrame(() => {
        // debugger
        game.gameLoop()
      })}
      else {
        console.log("game over")
      }
  }
  
  build(level){
    let game = this
    level.forEach(function(row, rowIndex){
      row.forEach(function(brick, brickIndex){
        if (brick === 1) {
          let position = {
            x: 30 + 80 * brickIndex,
            y: 75 + 40 * rowIndex
          }
          game.bricks.push(new Brick(game, position))
        }
      })
    })

    this.gameObjects = 
      [...this.paddles,
        this.ball,
        ...this.bricks]
  }

  update(){
    this.gameObjects.forEach(function(obj){
      obj.update()
    })
    // debugger
    this.score.element.innerText = `Score: ${this.score.value}`
    this.lives.element.innerText = `Lives: ${this.lives.value}`

    this.gameObjects= this.gameObjects.filter(function(obj){
      return !obj.markedForDelete
    })
  }

  draw(ctx){
    this.gameObjects.forEach(function(obj){
      obj.draw(ctx)
    })
  }
  
  gameOver(){
    // this.lives.value--
    // lives.innerHTML = `Lives: ${game.lives}`
    if (this.lives.value != 0){
      this.ball.speed = {x: 0, y: 0}
    }
    else {
      this.state = false
      let image = document.querySelector("img#gameOver")
      ctx.drawImage(image,325,200) 
    }
  }

  restart(){
    game.init()
    game.build(LEVEL1)
    game.gameLoop()
  }
}




