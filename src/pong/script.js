
const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');
canvas.width = 720;
canvas.height = 480;



    
let ball = {
    x : canvas.width / 2,
    y : canvas.height / 2,
    vx : 0,
    vy : 0
}

function draw() {
    context.clearRect(0,0,canvas.width, canvas.height);
    context.strokeStyle = "#000";
    context.strokeRect(0,0,canvas.width, canvas.height);
    context.fillStyle = "rgb(0,0,0)";
    context.fillRect(ball.x, ball.y, 10, 10);
    ball.x+=10;
    console.log(ball.x);


}


    
setInterval(draw, 1000);





