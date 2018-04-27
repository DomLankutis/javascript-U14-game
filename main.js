/// <reference path="./lib/p5.global-mode.d.ts"/>

let sprites = [],
    players = [],
    buttons = [],
    buttonsMade = false,
    readyButtonMade = false,
    buttonReadySprite = [],
    buttonSprite = [],
    stageSprite,
    stage,
    playersGroup;

function preload() {
    // Load sprites in to an array
    for (let i = 0; i < 18; i++){
        sprites.push( loadImage("./sprites/Sprite ("+(i+1)+").png"));
    }
    stageSprite = loadImage("./sprites/stage.png");
    buttonSprite.push(loadImage("./sprites/buttonRight.png"));
    buttonSprite.push(loadImage("./sprites/buttonLeft.png"));
    buttonReadySprite.push(loadImage("./sprites/ready.png"));
}

function setup() {
    createCanvas(1920, 960);
    stage = createSprite(width/2, height/2);
    stage.setCollider("circle", width/2, height/2, height /2);
    stage.draw = function() {image(stageSprite, this.deltaX/2, this.deltaY/2, height*1.05, height*1.05);};
    playersGroup = new Group();
}

function draw() {
    clear();
    background(0);
    if (players == 0){
        selectCharacters(sprites, players);
    }else{
        for(let i = 0; i < players.length; i++) {
            players[i].update();
        }
        drawSprites();
    }
}