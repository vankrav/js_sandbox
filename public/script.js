import {game, text} from "./game.js"
import { colorGenerator } from "./colorGenerator.js";

const resolution = {
    width: 720,
    height: 1080,
    cell: 5
}

let colors = colorGenerator();

let field = game;
field.setup("canvas", resolution.width, resolution.height, resolution.cell, colors);
field.zombieChance = 0.9;
field.create();
// field.random();
field.draw();


let a = text;
a.setup("matrix", 
        resolution.width / resolution.cell, 
        resolution.height / resolution.cell, 
        "Baskerville");
let string = "ЭТОПРОЙДЁТ"

// //create a synth and connect it to the main output (your speakers)
// const synth =  new Tone.AMSynth(Tone.Synth).toDestination();

// //play a middle 'C' for the duration of an 8th note
// synth.triggerAttackRelease("C4", "8n");



let zombie;
let index = 0;
function init() {
    zombie = field.countZombie();
    // if(zombie > 30){
    // synth.triggerAttackRelease(Math.round(900 / zombie) *  Math.pow(index+1, 1.2), "32n");
    // }
    
    field.zombieChance -= 0.001;
    field.draw();
    field.update();
    if(zombie < 5) {
        
        a.createMatrix(string[index]);
        field.add(0, 0, a);
        field.zombieChance += 0.08;
        console.log(string[index]);
        index++;
        if(index == string.length) {
            index = 0;
        }
    }
    
    console.log(Math.round(900 / zombie));

}

let loop;

function startGame() {
    loop = setInterval(init, 40); // Запускаем игру с интервалом в 40 мс
    

}

function stopGame() {
    clearInterval(loop); // Останавливаем игру
}

let isPaused =  true; // Переменная для отслеживания состояния игры

function togglePause() {
    isPaused = !isPaused; // Переключаем состояние игры
    if (isPaused) {
        console.log("Игра на паузе");
        stopGame(); // Останавливаем игру
    } else {
        console.log("Игра продолжается");
        startGame(); // Возобновляем игру
    }
}

// Добавляем обработчик события клика к документу
document.addEventListener('click', togglePause);




