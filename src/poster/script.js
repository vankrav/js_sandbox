import {game, text} from "./game.js"





let field = game;
field.setup("canvas", 720, 1080, 10);

field.zombieChance = 0.9;

field.create();
field.random();

let a = text;
a.setup("matrix", 72, 108);
let string = "ЭТОПРОЙДЁТ"

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();

//play a middle 'C' for the duration of an 8th note
synth.triggerAttackRelease("C4", "8n");

let index = 0;
function init() {
    field.zombieChance -= 0.001;
    field.draw();
    field.update();
    if(field.countZombie() < 50) {
        a.createMatrix(string[index]);
        field.add(0, 0, a);
        field.zombieChance += 0.08;
        console.log(string[index]);
        
       
        index++;
        if(index == string.length) {
            index = 0;
        }
    }
    // console.log(field.countZombie());

}
setInterval(init, 40);

