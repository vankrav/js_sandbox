const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');
canvas.width = 720;
canvas.height = 1080;
context.fillStyle = "rgb(200,200,200)";
context.fillRect(0,0, canvas.width, canvas.height);


const canvasMatrix = document.getElementById("matrix");
canvasMatrix.height = 60;
canvasMatrix.width = 60;
const ctxMatrix = canvasMatrix.getContext("2d");

ctxMatrix.font = " 60px TRuin";
ctxMatrix.textAlign = "center";




function Cell(x, y, size, value, color, zombie) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.value = value;
    this.color = color;
    this.zombie = zombie;
    this.draw = function() {
        context.fillStyle = this.color;
        context.fillRect(this.x*this.size, this.y*this.size, this.size, this.size);
    }
}

const cellSize = 10;
const colorPair = {
    cell : "#8D94BA",
    noCell :  "#B4EDD2",
    zombie : "#EE6352"
}


let glyder = {
    width: 3,
    height: 3,
    matrix: [[0, 1, 0],
             [0, 0, 1],
             [1, 1, 1]]
}

let letter = {
    width: 60,
    height: 60,
    matrix: [],
    createMatrix: function(letter) {

        ctxMatrix.fillText(letter, 30, 55);
        const imageData = ctxMatrix.getImageData(0,0, 60, 60);
        for (let j = 0; j < imageData.height; j ++) {
            this.matrix[j] = [];
             for (let i = 0; i < imageData.width; i ++) {
                const index = (j * imageData.width + i) * 4;
                this.matrix[j][i] = imageData.data[index + 3] ? 1 : 0;
                
            }
        }
        ctxMatrix.clearRect(0, 0, 60, 60);
    }
};



let field = {
    cellSize: cellSize,
    cols: canvas.width/cellSize,
    rows: canvas.height/cellSize,
    chance: 0.5,
    zombieChance: 0.9,
    cells: [],

    count : function() {
        let count = 0;
        for(let j = 0; j < this.rows; j++) {
            for(let i = 0; i < this.cols; i++) {
                count+=this.cells[j][i].value;
            }
        }
        return count;
    },
    countZombie : function() {
        let count = 0;
        for(let j = 0; j < this.rows; j++) {
            for(let i = 0; i < this.cols; i++) {
                if(this.cells[j][i].zombie) {
                    count++;
                }
            }
        }
        return count;
    },
    create : function() {
        for(let j = 0; j < this.rows; j++) {
            this.cells[j] = [];
            for(let i = 0; i < this.cols; i++) {
                this.cells[j][i] = new Cell(i, j, this.cellSize,0, colorPair.cell, 0);
            }
        }
    },
    random : function() {
        for(let j = 0; j < this.rows; j++) {
            for(let i = 0; i < this.cols; i++) {
                this.cells[j][i].value =  Math.random() <= 0.6;
             
            }
        }
    },

    clear: function() {
        for(let j = 0; j < this.rows; j++) {
            for(let i = 0; i < this.cols; i++) {
                this.cells[j][i].value = 0;

            }
        }
    },

    update: function() {
        let newStates = [];
        for(let j = 0; j < this.rows; j++) {
            newStates[j] = [];
            for(let i = 0; i < this.cols; i++) {
                let count = this.neirboursCount(i, j);
                let currentState = this.cells[j][i].value;
                let newState = currentState;

                if(!this.cells[j][i].zombie && currentState == 1 && (count < 2 || count > 3)) {
                    newState = 0; 
                } else if(!this.cells[j][i].zombie && currentState == 0 && count == 3) {
                    newState = 1; 
                }

                if(this.cells[j][i].zombie && currentState == 1 && Math.random() > this.zombieChance) {
                    newState = 0; 
                    this.cells[j][i].zombie = 0;
                } 

                newStates[j][i] = newState;
            }
        }

        for(let j = 0; j < this.rows; j++) {
            for(let i = 0; i < this.cols; i++) {
                this.cells[j][i].value = newStates[j][i];
            }
        }
    },

    neirboursCount: function(x, y) {
        let count = 0;
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];
        directions.forEach(([dx, dy]) => {
            const newX = (x + dx + this.cols) % this.cols;
            const newY = (y + dy + this.rows) % this.rows;
            count += this.cells[newY][newX].value;
        });
        return count;
    },
    
    draw: function () {
        for(let j = 0; j < this.rows; j++) {
            for(let i = 0; i < this.cols; i++) {
                this.cells[j][i].color = this.cells[j][i].value ? colorPair.cell : colorPair.noCell;
                this.cells[j][i].color = this.cells[j][i].zombie ? colorPair.zombie : this.cells[j][i].color;
                this.cells[j][i].draw();
            }
        }
    },

    add: function(x, y, figure) {
        for(let j = 0; j < figure.height; j++) {
            for(let i = 0; i < figure.width; i++) {
                this.cells[y+j][x+i].value = figure.matrix[j][i];
                this.cells[y+j][x+i].zombie = this.cells[y+j][x+i].value ? 1 : 0;
            }
        }
}
}



function addLetter() { 
    
}


// field.chance = 1;
field.zombieChance = 0.9;
field.create();
field.random();
// // field.clear();
let a = letter

let string = "ЭТОПРОЙДЁТ"







let index = 0;
function init() {
    field.zombieChance -= 0.001;
    field.draw();
    field.update();
    if(field.countZombie() < 50) {
         a.createMatrix(string[index]);
        field.add(field.cols/2 - 30, field.rows/2 - 33, a);
        field.zombieChance += 0.08;
        console.log(string[index]);
       
        index++;
        if(index == string.length) {
            index = 0;
        }
    }
    console.log(field.countZombie());

}
setInterval(init, 40);
init();

