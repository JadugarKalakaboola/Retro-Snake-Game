const scoreDisplay = document.getElementById('score')
const grid = document.querySelector(".grid")
const startBtn = document.getElementById("start")
const overMsg = document.getElementById("over")
let squares = []
let currentSnake = [5, 4, 3, 2, 1, 0]
let direction = 1
let width = 20
let appleIndex = 0
let timerId = 0
let score = 0
function startGame(){
    let started = false
    if(!started){
        startBtn.textContent = "Start";
        started = true
    } else {
        startBtn.textContent = "Restart";
        started = false
    }
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [5, 4, 3, 2, 1, 0]
    score = 0
    scoreDisplay.textContent = score
    overMsg.style.display = "none";
    direction = 1
    generateApple()
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, 400)
}
function createGrid(){
    for (let i = 0; i < 400; i++){
        const square = document.createElement('div')
        square.classList.add('smallGrid')
        grid.appendChild(square)
        squares.push(square)
        console.log(i)
    }
    currentSnake.forEach(index => squares[index].classList.add('snake'))
}
createGrid()


function move(){
    if (
        (currentSnake[0] + width >= width*width && direction === width) || 
        (currentSnake[0] % width === width-1 && direction === 1) || 
        (currentSnake[0] % width === 0 && direction === -1) || 
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ){
        overMsg.style.display = "block";
        return clearInterval(timerId)
    }

    let tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    if(squares[currentSnake[0]].classList.contains('apple')){
        squares[currentSnake[0]].classList.remove('apple')
        score++
        scoreDisplay.textContent = score
        squares[tail].classList.add('snake')
        console.log(tail)
        currentSnake.push(tail)
        console.log(currentSnake)
        generateApple()
    }
}



function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
} 
function control(e) {
    if(direction === 1){
        if (e.keyCode === 39) {
            console.log('right pressed')
            direction = 1
        } else if (e.keyCode === 38) {
            console.log('up pressed')
            direction = -width
        }else if (e.keyCode === 40) {
            console.log('down pressed')
            direction = +width
        }
    } else if(direction === -1){
        if (e.keyCode === 38) {
            console.log('up pressed')
            direction = -width
        } else if (e.keyCode === 37) {
            console.log('left pressed')
            direction = -1
        } else if (e.keyCode === 40) {
            console.log('down pressed')
            direction = +width
        }
    } else if(direction === -width){
        if (e.keyCode === 39) {
            console.log('right pressed')
            direction = 1
        } else if (e.keyCode === 38) {
            console.log('up pressed')
            direction = -width
        } else if (e.keyCode === 37) {
            console.log('left pressed')
            direction = -1
        } 
    } else if(direction === width){
        if (e.keyCode === 39) {
            console.log('right pressed')
            direction = 1
        } else if (e.keyCode === 40) {
            console.log('udown pressed')
            direction = width
        } else if (e.keyCode === 37) {
            console.log('left pressed')
            direction = -1
        } 
    }
}
document.addEventListener('keyup', control)
document.getElementById("start").addEventListener("click", startGame)