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
    this.scoreBoard = document.querySelector("div#scoreBoard")
    this.state = true
    this.levelIndex = 0
    this.win = false
    scoreForm.style.display = "none"
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
        // console.log("game over")
      }
  }
  
  build = () => {
    let game = this
    if (LEVELS[this.levelIndex]){
      LEVELS[this.levelIndex].forEach(function(row, rowIndex){
        row.forEach(function(brick, brickIndex){
          if (brick === 1) {
            let position = {
              x: 85 + 70 * brickIndex,
              y: 150 + 25 * rowIndex
            }
            game.bricks.push(new Brick(game, position))
          }
        })
      })
      
      this.gameObjects = 
      [...this.paddles,
          this.ball,
          ...this.bricks]
      console.log(this.paddles)
    }
    else {
      this.win = true
      this.gameOver()
    }
    
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

    if (this.gameObjects.length <= 5){
      this.levelWin()
    }
  }

  draw(ctx){
    this.gameObjects.forEach(function(obj){
      obj.draw(ctx)
    })
  }

  levelWin(){
    this.levelIndex++
    this.ball.speed.x = 0
    this.ball.speed.y = 0
    // debugger
    this.build()
  }
  
  gameOver(){
    this.lives.value--
    if (this.lives.value !== 0){
      this.ball.speed = {x: 0, y: 0}
    }
    else {
      this.state = false
      let gameOver = document.querySelector("img#gameOver")
      let youWin = document.querySelector("img#youWin")
      if (this.win){
        ctx.drawImage(youWin,250,150)
      }
      else {
        ctx.drawImage(gameOver,225,100)
      }
      scoreForm.style["z-index"] = 4
      scoreForm.style.display = "block"
      scoreSpan.innerText = `${this.score.value}`
    }
  }

  restart(){
    game.init()
    game.build()
    game.gameLoop()
  }

  postScore(scoreObj){
    fetch("http://localhost:3000/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify(scoreObj)
    })
    .then(resp => resp.clone().json())
    .then(function(data){
        highScore1.querySelector("span#highScore1Name").innerText = data[0].name
        highScore1.querySelector("span#highScore1Score").innerText = data[0].score
        highScore2.querySelector("span#highScore2Name").innerText = data[1].name
        highScore2.querySelector("span#highScore2Score").innerText = data[1].score
        highScore3.querySelector("span#highScore3Name").innerText = data[2].name
        highScore3.querySelector("span#highScore3Score").innerText = data[2].score
        highScore4.querySelector("span#highScore4Name").innerText = data[3].name
        highScore4.querySelector("span#highScore4Score").innerText = data[3].score
        highScore5.querySelector("span#highScore5Name").innerText = data[4].name
        highScore5.querySelector("span#highScore5Score").innerText = data[4].score
    })
    .then(function(){
      ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT)
      scoreForm.style.display = "none"
      highScoreDiv.style.display = "block"
    })
  }
}




