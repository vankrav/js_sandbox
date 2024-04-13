export function Cell(context, x, y, size, value, color, zombie) {
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






export let game = {
    canvas: 0,
    context: 0,
    cellSize: 0,
    cols: 0,
    rows: 0,
    chance: 0.5,
    zombieChance: 0.9,
    cells: [],
    colorPair : {
        cell : "#8D94BA",
        noCell :  "#B4EDD2",
        zombie : "#EE6352"
    },
    setup : function(id, width, height, cellSize , colors) {
        this.canvas = document.getElementById(id);
        this.context = canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;

        this.cols = width / cellSize;
        this.rows = height / cellSize;
        this.cellSize = cellSize;

        this.colorPair = colors;

    },
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
                this.cells[j][i] = new Cell(this.context, i, j, this.cellSize,0, this.colorPair.cell, 0);
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
                let count = this.neirbours(i, j).count;
                
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

    neirbours: function(x, y) {
        let neirbour = {
            count : 0,
            color : {r: 0, g: 0, b: 0}
        };
        let colorCount = 0;
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];
        directions.forEach(([dx, dy]) => {
            const newX = (x + dx + this.cols) % this.cols;
            const newY = (y + dy + this.rows) % this.rows;
            neirbour.count += this.cells[newY][newX].value;
           
        });
       
        return neirbour;
    },
    
    draw: function () {
        for(let j = 0; j < this.rows; j++) {
            for(let i = 0; i < this.cols; i++) {
                this.cells[j][i].color = this.cells[j][i].value ? this.colorPair.cell : this.colorPair.noCell;
                this.cells[j][i].color = this.cells[j][i].zombie ? this.colorPair.zombie : this.cells[j][i].color;
                this.cells[j][i].draw();
            }
        }
    },

    add: function(x, y, figure) {
        for(let j = 0; j < figure.height; j++) {
            for(let i = 0; i < figure.width; i++) {
                if(figure.matrix[j][i]) {
                    this.cells[y+j][x+i].value = figure.matrix[j][i];
                    this.cells[y+j][x+i].zombie = this.cells[y+j][x+i].value ? 1 : 0;
                }
            }
        }
}
}

export let text = {
    canvas: 0,
    context: 0,
    width: 0,
    height: 0,
    matrix: [],
    setup : function(id, width, height,font) {
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;

        this.width = width;
        this.height = height;
        this.context.textAlign = "center";
        this.context.font = this.height/1.5 + "px " +font;

    },
    createMatrix: function(letter) {

        this.context.fillText(letter, this.width/2, this.height/1.35);
        const imageData = this.context.getImageData(0,0, this.width, this.height);
        for (let j = 0; j < this.height; j ++) {
            this.matrix[j] = [];
             for (let i = 0; i < this.width; i ++) {
                const index = (j * this.width + i) * 4;
                this.matrix[j][i] = imageData.data[index + 3] ? 1 : 0;
                
            }
        }
        this.context.clearRect(0, 0, this.width, this.height);
    }
};
