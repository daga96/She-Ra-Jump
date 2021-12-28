document.addEventListener('DOMContentLoaded', () => {
    const character = document.querySelector('.character')
    const grid = document.querySelector('.runner-grid')
    const body = document.querySelector('body')
    const alert = document.getElementById('alert')
    const score = document.getElementById('score')
    
    let isJumping = false
    let gravity = 0.9
    let isGameOver = false
    
    function control(e) {
      if (e.keyCode === 32) {
        if (!isJumping) {
          isJumping = true;
          jumpingFunction()
        }
      }
    }
    let currentScore=0;
    alert.style.display = "none";
    let scoreCount = () => {
        currentScore++;
        score.innerHTML=currentScore;
    }
    

    document.addEventListener('keyup', control)
    
    

    let position = 0
    let interval = null;
    function jumpingFunction() {
      let count = 0
      let timerId = setInterval(function () {
        //move down
        if (count === 15) {
          clearInterval(timerId)
          let downTimerId = setInterval(function () {
            if (count === 0) {
              clearInterval(downTimerId)
              isJumping = false
            }
            position -= 5
            count--
            position = position * gravity
            character.style.bottom = position + 'px'
          },20)
    
        }
        //move up
        position +=30
        count++
        position = position * gravity
        character.style.bottom = position + 'px'
      },20)
      //score
      let currentScore = 0;
      interval = setInterval(scoreCount, 200);
    }
    


    function generateObstacles() {
      let randomTime = Math.random() * 4000
      let obstaclePosition = 1000
      const obstacle = document.createElement('div')
      if (!isGameOver) obstacle.classList.add('obstacle')
      grid.appendChild(obstacle)
      obstacle.style.left = obstaclePosition + 'px'
    
      let timerId = setInterval(function() {
        if (obstaclePosition > 0 && obstaclePosition < 64 && position < 64) {
          clearInterval(timerId)
          alert.innerHTML = 'Game Over'
          alert.style.display = "block";
          isGameOver = true
          //remove all children
          body.removeChild(body.firstChild)
          while (grid.firstChild) {
          grid.removeChild(grid.lastChild)
          }
          
        }
        obstaclePosition -=10
        obstacle.style.left = obstaclePosition + 'px'
      },20)
      if (!isGameOver) setTimeout(generateObstacles, randomTime)
    }
    generateObstacles()
    })