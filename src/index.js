// import Paddle from 'src/paddle.js' 

document.addEventListener("DOMContentLoaded", function(){
    
    let canvas = document.querySelector("#gameScreen")
    
    let ctx = canvas.getContext("2d")

    canvas.addEventListener("click", function(e){
        console.log("x: ", e.clientX - 8)
        console.log("y: ", e.clientY - 8)
        console.dir(e.target)
    })

    let score = 0

    let scoreBoard = document.createElement("div")
    canvas.insertAdjacentElement("afterend",scoreBoard)
    scoreBoard.innerHTML = `
        Score: ${score}
    `
    
    const GAME_WIDTH = 800
    const GAME_HEIGHT = 600
    
    const level1 =[
        [0,0,1,0,0,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0],
        [0,0,0,0,1,1,1,1,1,1],
        [0,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1]
    ]

    function buildLevel(game,level){
        let bricks = []
        // debugger
        level.forEach(function(row, rowIndex){
            row.forEach(function(brick, brickIndex){
                if (brick === 1) {
                    position = {
                        x: 30 + 80 * brickIndex,
                        y: 75 + 40 * rowIndex
                    }
                    bricks.push(new Brick(game, position))
                }
            })
        })
        return bricks
    }
    
    function collisionDetection(ball, gameObject){
        let collisionType = null

        let topOfBall = ball.position.y
        let bottomOfBall = ball.position.y + ball.size
        let leftOfBall = ball.position.x
        let rightOfBall = ball.position.x 

        let topOfObject = gameObject.position.y
        let leftSideOfObject = gameObject.position.x
        let rightSideOfObject = gameObject.position.x + gameObject.width
        let bottomOfObject = gameObject.position.y + gameObject.height

        
        if(
            bottomOfBall >= topOfObject
            && topOfBall <= bottomOfObject
            // within the y bounds of the object
            && rightOfBall <= rightSideOfObject
            && leftOfBall >= leftSideOfObject)
            // within the x bounds of the object
                {
                    let distanceFromBottom = Math.abs(topOfBall - bottomOfObject)
                    let distanceFromTop = Math.abs(bottomOfBall - topOfObject)
                    let distanceFromLeft = Math.abs(rightOfBall - leftSideOfObject)
                    let distanceFromRight = Math.abs(leftOfBall - rightSideOfObject)
                    let distanceArr = [distanceFromBottom, distanceFromTop, distanceFromLeft, distanceFromRight]
                    let minDistance = Math.min(...distanceArr)
                    if (gameObject.constructor === Brick) {
                        
                        gameObject.markedForDelete = true
                        score = score+1
                        scoreBoard.innerHTML = `Score: ${score}`
                    }
                    if (minDistance === distanceFromBottom) {
                        ball.speed.y = -ball.speed.y
                        ball.position.y = bottomOfObject
                        return true;
                    }
                    else if (minDistance === distanceFromTop) {
                        ball.speed.y = -ball.speed.y
                        ball.position.y = topOfObject - ball.size
                        return true;
                    }
                    else if (minDistance === distanceFromLeft) {
                        // console.log("Closest side: left, distance: ", minDistance)
                        // debugger
                        ball.speed.x = -ball.speed.x
                        ball.position.x = leftSideOfObject - ball.size
                        return true;
                    }
                    else if (minDistance === distanceFromRight) {
                        // console.log("Closest side: right, distance: ", minDistance)
                        ball.speed.x = -ball.speed.x
                        ball.position.x = rightSideOfObject
                        return true;
                    }
                    else {
                        return false;
                    }
                }else {
                // console.log("false", rightOfBall)
                return false
            }
        
    }

    class InputHandler{
        constructor(paddle){
            document.addEventListener("keydown", function(e){
                switch(e.keyCode){
                    case 37:
                        paddle.moveLeft()
                        break
                        
                        case 39:
                            paddle.moveRight()
                            break
                        }
                    })
                    document.addEventListener("keyup", function(e){
                        switch(e.keyCode){
                            case 37:
                                if(paddle.speed < 0){
                                    paddle.stop()
                                }
                                break
                                
                                case 39:
                                    if(paddle.speed>0){
                                        paddle.stop()
                                    }
                                    break
                                }
                            })
                        }
                    }
    class Paddle{
        
        constructor(game){
            this.gameWidth = game.gameWidth
            this.gameHeight = game.gameHeight
            this.width = 150
            this.height = 30
            this.maxSpeed = 10
            this.speed = 0
            this.position = {
                x: (this.gameWidth/2 - this.width/2),
                y: (this.gameHeight - this.height - 4)
            }
            this.markedForDelete = false
        }

        draw(ctx){
            ctx.fillStyle = "#0ff"
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
        
        update(){
            this.position.x += this.speed
            
            if(this.position.x < 0 ){ 
                this.position.x = 0
            }
            if(this.position.x + this.width > this.gameWidth){
                this.position.x = this.gameWidth - this.width}
            }
            
            moveLeft(){
                this.speed = -this.maxSpeed
            }
            
            moveRight(){
                this.speed = this.maxSpeed
            }
            stop(){
                this.speed = 0
            }
        }
        
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
            
            // let bottomOfBall = this.position.y + this.size
            // let topOfPaddle = this.game.paddle.position.y
            // let leftSideOfPaddle = this.game.paddle.position.x
            // let rightSideOfPaddle = this.game.paddle.position.x + this.game.paddle.width


            collisionDetection(this, this.game.paddle)
                // this.speed.y = -this.speed.y
                // this.position.y = this.game.paddle.position.y - this.size
    
        

        }
    }

        class Brick{
            constructor(game, position){
                this.image = document.querySelector("img#brick")
                this.game = game
                this.position = position
                this.width = 40
                this.height = 40

                this.markedForDelete = false

                
            }

            update(){
                // let topOfBall = this.game.ball.position.y
                // let bottomOfBall = this.game.ball.position.y + ball.size
                // let leftOfBall = this.game.ball.position.x
                // let rightOfBall = this.game.ball.position.x + ball.size

                // let topOfObject = this.position.y
                // let leftSideOfObject = this.position.x
                // let rightSideOfObject = this.position.x + this.width
                // let bottomOfObject = this.position.y + this.height

                collisionDetection(this.game.ball, this)
            }

            draw(ctx){
                ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
            }
        }

    



        class Game{
            constructor(gameWidth, gameHeight){
                this.gameWidth = gameWidth
                this.gameHeight = gameHeight  
            }
            
            start(){
                this.paddle = new Paddle(this)
                this.ball = new Ball(this)
                console.log(this.ball.position)
                // this.brick = new Brick
                let bricks = buildLevel(this, level1)

                // for(let i = 0; i < 10; i++){
                //     bricks.push(new Brick(this, {x: i * 52, y: 30}))
            
                // }

                this.gameObjects = [
                    this.paddle,
                    this.ball,
                    ...bricks
                ]
                
                new InputHandler(this.paddle)
                
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
        game.start()
        function gameLoop(){
            ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT)
            game.draw(ctx)
            game.update()
            requestAnimationFrame(gameLoop)
        }
        requestAnimationFrame(gameLoop)
    })