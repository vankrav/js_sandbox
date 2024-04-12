const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');
const scoreLabel = document.getElementById("score");
canvas.width = 720;
canvas.height = 480;



    
let ball = {
    size: 10,
    x : canvas.width / 2,
    y : canvas.height / 2,
    vx : 3,
    vy : 3,
    draw : function() {
        context.fillStyle = "rgb(0,0,0)";
        context.fillRect(this.x, this.y, this.size, this.size);
    },
    move : function() {
        this.x+=this.vx;
        this.y+=this.vy;
    }

}

let rocketRight = {
    size: 40,
    x: canvas.width - 10,
    y: canvas.height / 2,
    draw : function() {
        context.fillStyle = "rgb(0,0,0)";
        context.fillRect(this.x, this.y - this.size / 2, 10, this.size);
    }
}

let rocketLeft = {
    vy : 2.6,
    size: 40,
    x: 0,
    y: canvas.height / 2,
    draw : function() {
        context.fillStyle = "rgb(0,0,0)";
        context.fillRect(this.x, this.y - this.size / 2, 10, this.size);
    },
    move : function() {
        this.y < ball.y  ? this.y+=this.vy : this.y-=this.vy;
    }
}

let score = {
    left : 0,
    right : 0,
    win: 3,
    goal : function(player) {
        if(player === "left") {
            this.left++;
            scoreLabel.textContent = `${this.left}:${this.right}`;
            if(this.left === this.win) {
                scoreLabel.textContent = "robot win";
                ball.x = canvas.width / 2 - ball.size / 2;
                ball.y = canvas.height / 2;
                ball.vx = 0;
                ball.vy = 0;
                rocketLeft.y = canvas.height / 2;
                rocketRight.y = canvas.height / 2;
            }
        }
        if(player === "right") {
            this.right++;
            scoreLabel.textContent = `${this.left}:${this.right}`;
            if(this.right === this.win) {
                scoreLabel.textContent = "you win";
                ball.x = canvas.width / 2 - ball.size / 2;
                ball.y = canvas.height / 2;
                ball.vx = 0;
                ball.vy = 0;
                rocketLeft.y = canvas.height / 2;
                rocketRight.y = canvas.height / 2;
            }
        }
    }
}

canvas.addEventListener("mousemove", (e) => {
    rocketRight.y = e.clientY - canvas.getBoundingClientRect().top;
});

function draw() {
    context.clearRect(0,0,canvas.width, canvas.height);
    context.strokeStyle = "#000";
    context.strokeRect(0,0,canvas.width, canvas.height);
    context.fillRect(canvas.width / 2,0,1, canvas.height);
    collision();
    rocketLeft.move();
    ball.move();
    ball.draw();
    rocketRight.draw();
    rocketLeft.draw();
    
    


}


function checkCollisionWithRockets() {
    // Столкновение с правой ракеткой
    if (ball.x + ball.size >= rocketRight.x && ball.y + ball.size >= rocketRight.y - rocketRight.size / 2 && ball.y <= rocketRight.y + rocketRight.size / 2) {
        ball.vx = -ball.vx;
        ball.x = rocketRight.x - ball.size; // Отодвигаем мяч, чтобы он не "застревал" в ракетке
    }

    // Столкновение с левой ракеткой
    if (ball.x <= rocketLeft.x + 10 && ball.y + ball.size >= rocketLeft.y - rocketLeft.size / 2 && ball.y <= rocketLeft.y + rocketLeft.size / 2) {
        ball.vx = -ball.vx;
        ball.x = rocketLeft.x + 10; // Отодвигаем мяч, чтобы он не "застревал" в ракетке
    }
}

function collision() {
    // Обработка столкновений с границами поля
    if (ball.x > canvas.width - ball.size) {
        ball.vx = -ball.vx;
        score.goal("left");
    } else if (ball.x < 0) {
        ball.vx = -ball.vx;
        score.goal("right");
    }

    if (ball.y > canvas.height - ball.size || ball.y < 0) {
        ball.vy = -ball.vy;
    }

    // Проверка столкновений с ракетками
    checkCollisionWithRockets();
}

function restart() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.vx = 3;
    ball.vy = 3;
    rocketLeft.y = canvas.height / 2;
    rocketRight.y = canvas.height / 2;
    score.left = 0;
    score.right = 0;
    scoreLabel.textContent = `${score.left}:${score.right}`;
    // ocation.reload();
}




function main() {
    requestAnimationFrame(main);
    draw();
}
    

main();




