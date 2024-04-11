const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');
canvas.width = 720;
canvas.height = 1080;
context.fillStyle = "rgb(200,200,200)";
context.fillRect(0,0, canvas.width, canvas.height);




function Cell(x, y, size, value, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.value = value;
    this.color = color;
    this.draw = function() {
        context.fillStyle = this.color;
        context.fillRect(this.x*this.size, this.y*this.size, this.size, this.size);
    }
}

const cellSize = 10;
const colorPair = {
    cell : "#1C1D21",
    noCell :  "#a288a6"
}


let glyder = {
    width: 3,
    height: 3,
    matrix: [[0, 1, 0],
             [0, 0, 1],
             [1, 1, 1]]
}


let field = {
    cellSize: cellSize,
    cols: canvas.width/cellSize,
    rows: canvas.height/cellSize,
    chance: 0.5,
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
    create : function() {
        for(let j = 0; j < this.rows; j++) {
            this.cells[j] = [];
            for(let i = 0; i < this.cols; i++) {
                this.cells[j][i] = new Cell(i, j, this.cellSize,0, colorPair.cell);
            }
        }
    },
    random : function() {
        for(let j = 0; j < this.rows; j++) {
            for(let i = 0; i < this.cols; i++) {
                this.cells[j][i].value =  Math.random() <= 0.5;
             
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

                if(currentState == 1 && (count < 2 || count > 3)) {
                    newState = 0; 
                } else if(currentState == 0 && count == 3) {
                    newState = 1; 
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
                this.cells[j][i].draw();
            }
        }
    },

    add: function(x, y, figure) {
        for(let j = 0; j < figure.height; j++) {
            for(let i = 0; i < figure.width; i++) {
                this.cells[y+j][x+i].value = figure.matrix[j][i];
             
            }
        }
}
}



// async function imageToMatrix(imagePath) {
//     const image = new Image();
//     image.crossOrigin = "anonymous";
//     image.src = imagePath;
//     await image.decode();

//     const cv = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     cv.width = 340;
//     canvas.height = 340;
//     ctx.drawImage(image, 0, 0, 340, 340);
//     const imageData = ctx.getImageData(0, 0, 340, 340);
//     const matrix = [];
//     for (let y = 0; y < 34; y++) {
//         const row = [];
//         for (let x = 0; x < 34; x++) {
//             const index = (y * 34 + x) * 4;
//             const r = imageData.data[index];
//             const g = imageData.data[index + 1];
//             const b = imageData.data[index + 2];
//             // Считаем участок ярким, если среднее значение RGB больше 127
//             row.push((r + g + b) / 3 > 50 ? 1 : 0);
//         }
//         matrix.push(row);
//     }
//     return matrix;
// }



// field.chance = 1;
field.create();
field.random();
// // field.clear();
// field.add(30, 30, glyder);

let t = 1;
function init() {
    requestAnimationFrame(init, 40);
    // field.chance = Math.sin(t) * 0.1 + 0.9;
    // t+=0.01;
    field.draw();
    field.update();
    
    console.log(field.count());

}
// setInterval(init, 80);
init();
// let letterA = imageToMatrix("/Users/vankrav/Projects/js_sandbox/src/poster/a.png");
// console.log(letterA);
