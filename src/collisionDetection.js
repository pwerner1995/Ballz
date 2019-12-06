function collisionDetection(ball, gameObject){
  // debugger
  // let collisionType = null

  let topOfBall = ball.position.y
  let bottomOfBall = ball.position.y + ball.size
  let leftOfBall = ball.position.x
  let rightOfBall = ball.position.x

  let topOfObject = gameObject.position.y
  let leftSideOfObject = gameObject.position.x
  let rightSideOfObject = gameObject.position.x + gameObject.width
  let bottomOfObject = gameObject.position.y + gameObject.height

  if (bottomOfBall >= topOfObject
    && topOfBall <= bottomOfObject  // within the y bounds of the object
    && rightOfBall <= rightSideOfObject
    && leftOfBall >= leftSideOfObject) // within the x bounds of the object
    {
      // if(gameObject.position.x === 776){
      //   leftSideOfObject = leftSideOfObject - 6
        
      // }
      let hitPoint = ball.position
      let distanceFromBottom = Math.abs(topOfBall - bottomOfObject)
      let distanceFromTop = Math.abs(bottomOfBall - topOfObject)
      let distanceFromLeft = Math.abs(rightOfBall - leftSideOfObject)
      let distanceFromRight = Math.abs(leftOfBall - rightSideOfObject)
      let distanceArr = [distanceFromBottom, distanceFromTop, distanceFromLeft, distanceFromRight]
      let minDistance = Math.min(...distanceArr)
      // if(distanceFromLeft === 0 && distanceFromLeft !== null){
      //   debugger
      // }
      if (gameObject.constructor === Brick) {
        gameObject.markedForDelete = true
        game.score.value++
        // game.score.
      }
      let speedAdder = 0
      if (gameObject.constructor === Paddle) {
        let rand = Math.random()
        if (rand < 0.33) {
          speedAdder = -1
        }
        else if (rand >= 0.33 && rand <= 0.66) {
          speedAdder = 0
        }
        else {
          speedAdder = 1
        }
      }
      if (minDistance === distanceFromBottom) {
        
        // console.log("Closest side: bottom, distance: ", minDistance)
        // if (gameObject.constructor === Paddle){
        //   return false;
        // }
        ball.speed.y = -ball.speed.y
        // ball.speed.x += speedAdder
        ball.position.y = bottomOfObject
        return true;
      }
      else if (minDistance === distanceFromTop) {
        // console.log("Closest side: top, distance: ", minDistance)
        ball.speed.y = -ball.speed.y
        // ball.speed.x += speedAdder
        ball.position.y = topOfObject - ball.size
        return true;
      }
      else if (minDistance === distanceFromLeft) {
        // console.log("Closest side: left, distance: ", minDistance, rightOfBall)
        // debugger
        ball.speed.x = -ball.speed.x
        // ball.speed.y += speedAdder
        ball.position.x = leftSideOfObject - ball.size
        return true;
      }
      else if (minDistance === distanceFromRight) {
        // console.log("Closest side: right, distance: ", minDistance)
        ball.speed.x = -ball.speed.x
        // ball.speed.y += speedAdder
        ball.position.x = rightSideOfObject
        return true;
      }
      else {
        console.log("error in collision detection")
        return false;
      }
    } 
  else { // no collision
  return false
  }
}