
//board
var blockSize = 22;
var rows = 20;
var cols = 20;
var board;
var context; 

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10); //100 milliseconds
    var restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", restartGame);
}

function adjustFoodSize() {
    // Accéder à l'élément de nourriture par son ID
    var foodElement = document.getElementById("food");

    // Modifier sa taille en utilisant la classe
    foodElement.classList.add("blockSize");
}
// Quelque part dans votre code où vous avez besoin d'ajuster la taille de la nourriture
adjustFoodSize();


function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="aquamarine";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
        }
    }
    if (gameOver) {
        alert("Game Over");

        // Affiche le bouton "Recommencer"
        var restartButton = document.getElementById("restartButton");
        restartButton.style.display = "block";
    } else {
        // Cache le bouton "Recommencer"
        var restartButton = document.getElementById("restartButton");
        restartButton.style.display = "none";
    }
}
//La fonction ci-dessous s'occupe de la direction prise par le serpant ainsi que sa vitesse, j'ai diminué la vitesse du serpent qui etait a 1
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 0.5) {
        velocityX = 0;
        velocityY = -0.5;
    }
    else if (e.code == "ArrowDown" && velocityY != -0.5) {
        velocityX = 0;
        velocityY = 0.5;
    }
    else if (e.code == "ArrowLeft" && velocityX != 0.5) {
        velocityX = -0.5;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -0.5) {
        velocityX = 0.5;
        velocityY = 0;
    }
}


function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function restartGame() {
    if (confirm("Game Over. Restart the game?")) {
        // Réinitialise les variables du jeu pour recommencer
        snakeX = blockSize * 5;
        snakeY = blockSize * 5;
        velocityX = 0;
        velocityY = 0;
        snakeBody = [];
        gameOver = false;
        placeFood();
    }
}
