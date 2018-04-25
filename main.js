/// <reference path="./lib/p5.global-mode.d.ts"/>

let sprites = [],
    players = [];

function preload() {
    // Load sprites in to an array
    for (let i = 0; i < 18; i++){
        sprites.push( loadImage("./sprites/Sprite ("+(i+1)+").png"));
    }
}


function setup() {
    createCanvas(1280, 720);
    createSprite(400, 200, 50, 50);
}

function draw() {
    if (players == 0){
        selectCharacters(sprites, players);
    }
    else{
        clear();
        background(0);
        
        // for(let i = 0; i < players.length; i++) {
            
        // }

        drawSprites();
    }
    
}