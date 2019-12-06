class Paddle{
  constructor(game, options){
    this.gameWidth = game.gameWidth
    this.gameHeight = game.gameHeight
    this.width = options.size.width
    this.height = options.size.height
    this.maxSpeed = 10
    this.speed = {x: 0, y: 0}
    this.position = options.position
    this.middleTopPos = {x: this.position.x + (this.width / 2), y: this.position.y}
    this.middleBottomPos = {x: this.middleTopPos.x, y: this.position.y + (this.height)}
    this.markedForDelete = false
    console.log(this.position)
  }

  draw(ctx){
    ctx.fillStyle = "#000"
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
  
  update(){
    this.position.x += this.speed.x
    this.position.y += this.speed.y
    this.middleTopPos = {x: this.position.x + (this.width / 2), y: this.position.y}
    this.middleBottomPos = {x: this.middleTopPos.x, y: this.position.y + (this.height)}
    
    if(this.position.x < 0){ 
      this.position.x = 0
    }
    if(this.position.x + this.width > this.gameWidth){
      this.position.x = this.gameWidth - this.width}

    if(this.position.y < 0){ 
      this.position.y = 0
    }
    if(this.position.y + this.height > this.gameHeight){
      this.position.y = this.gameHeight - this.height
    }

  }

    moveUp(){
      this.speed.y = -this.maxSpeed
    }

    moveDown(){
      this.speed.y = this.maxSpeed
    }
    
    moveLeft(){
      this.speed.x = -this.maxSpeed
    }
    
    moveRight(){
      this.speed.x = this.maxSpeed
    }

    stop(){
      this.speed.x = 0
      this.speed.y = 0
    }
}