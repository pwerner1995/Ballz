class Ball{
  constructor(game){
    this.image = document.querySelector("img#ball")
    this.position = {x: 10, y: 10}
    this.speed = {x: 10, y: 5}
    this.gameWidth = game.gameWidth
    this.gameHeight = game.gameHeight
    this.game = game
    this.size = 16
  }

  draw(ctx){
    ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size)
  }

  update(){
    this.position.x += this.speed.x
    this.position.y += this.speed.y

    if(this.position.x + this.size > this.gameWidth || this.position.x < 0){
        this.speed.x = -this.speed.x
    }

    if(this.position.y + this.size > this.gameHeight || this.position.y < 0){
        this.speed.y = -this.speed.y
    }

    collisionDetection(this, this.game.paddle)
  }
}