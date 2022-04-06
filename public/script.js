document.addEventListener('DOMContentLoaded', () => {
    
    const character = document.querySelector('.character')
    const grid = document.querySelector('.runner-grid')
    const alert = document.getElementById('alert')
    const score = document.getElementById('score')
    const cloud = document.querySelector('.cloud')
    const refres = document.getElementById('refresh')
    const animationEnd = document.getElementById('gameOver')

    let isJumping = false
    let gravity = 0.9
    let isGameOver = false

    var scoreInterval = null;


    // hide gameOver info
    alert.style.display = "none";
    refresh.style.display = "none";
        
    animationEnd.style.display = "none";


    
    var scoreCount = () => {
        
        currentScore++;
        score.innerHTML = 'S ' + currentScore;

    }
    
    scoreInterval = setInterval(scoreCount, 200);
    
    // start function
    function control(start) {

        if (start.keyCode === 32) {

            if (!isJumping) {
                isJumping = true;
                jumpingFunction()
            }
        }

        cloud.firstElementChild.style.animation = "cloudAnimation 30s linear infinite";

    }
    let currentScore = 0;




    document.addEventListener('keydown', control)



    let position = 0


    function jumpingFunction() {
        //score

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
                }, 20)

            }
            //move up
            position += 30
            count++
            position = position * gravity
            character.style.bottom = position + 'px'
        }, 20)


    }



    function generateObstacles() {
        let randomTime = Math.random() * 4000
        let obstaclePosition = 1000
        const obstacle = document.createElement('div')
        if (!isGameOver) obstacle.classList.add('obstacle')
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'px'

        let timerId = setInterval(function () {
            
            if (obstaclePosition > 0 && obstaclePosition < 64 && position < 64) {
                isGameOver = true;

                alert.innerHTML = 'Game Over'
                alert.style.display = "block";
                refresh.style.display = "block";
                animationEnd.style.display = "block";

                clearInterval(scoreInterval);
                clearInterval(timerId);

                document.addEventListener('keyup', function (e) {
                
                    window.location.reload();
                });
                //remove children

                while (grid.firstChild) 
                {
                    grid.removeChild(grid.lastChild)
                }
                score.style.right= "45%"
                score.style.fontSize="25px"
            }
            obstaclePosition -= 10
            obstacle.style.left = obstaclePosition + 'px'
        }, 20)

        if (!isGameOver) setTimeout(generateObstacles, randomTime)

    }
    generateObstacles()
})