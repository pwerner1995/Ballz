const GAME_WIDTH = 800
const GAME_HEIGHT = 600

class Game{
  constructor(gameWidth, gameHeight){
      this.gameWidth = gameWidth
      this.gameHeight = gameHeight
      this.ball = new Ball(this)
      this.bricks = []
      this.paddle = new Paddle(this)
      this.inputHandler = new InputHandler(this.paddle)
  }
  
  start(){
    this.bricks = buildLevel(this, level1)

    this.gameObjects = 
      [this.paddle,
        this.ball,
        ...this.bricks]
  }

  update(){
    this.gameObjects.forEach(function(obj){
      obj.update()
    })

    this.gameObjects= this.gameObjects.filter(function(obj){
      return !obj.markedForDelete
    })
  }

  draw(ctx){
    this.gameObjects.forEach(function(obj){
      obj.draw(ctx)
    })
  }
}

let game = new Game(GAME_WIDTH, GAME_HEIGHT)

let score = 0
let canvas = document.querySelector("#gameScreen")
let ctx = canvas.getContext("2d")

let scoreBoard = document.createElement("div")
canvas.insertAdjacentElement("afterend", scoreBoard)
scoreBoard.innerHTML = `Score: ${score}`

const level1 = [
  [0,0,1,0,0,1,0,0,0,0],
  [0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,1,1,1,1,1,1],
  [0,0,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1]
]

game.start()