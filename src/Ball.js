class Ball{
  constructor(game){
    this.image = document.querySelector("img#ball")
    this.position = {}
    this.speed = {x: 0, y: 0}
    this.speedV = Math.sqrt(this.speed.x*this.speed.x + this.speed.y*this.speed.y)
    this.gameWidth = game.gameWidth
    this.gameHeight = game.gameHeight
    this.game = game
    this.size = 16
  }

  draw(ctx){
    ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size)
  }

  update(){
    this.speedV = Math.sqrt(this.speed.x*this.speed.x + this.speed.y*this.speed.y)
    if (this.speedV === 0){
      this.position = {x: this.game.bottomPaddle.middleTopPos.x - (this.size / 2), y: this.game.bottomPaddle.middleTopPos.y}
    }
    else {
    this.position.x += this.speed.x
    this.position.y += this.speed.y
    }

    if(this.position.x + this.size > this.gameWidth || this.position.x < 0){
      this.game.gameOver()
    }

    if(this.position.y < 0){
      this.game.gameOver()
    }

    if(this.position.y + this.size > this.gameHeight){ // ball has hit bottom edge
      this.game.gameOver()
    }

    this.game.paddles.forEach(paddle => {
      collisionDetection(this, paddle)
    });
  }
}