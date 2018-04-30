/// <reference path="./lib/p5.global-mode.d.ts"/>

let sprites = [],
    players = [],
    buttons = [],
    buttonsMade = false,
    readyButtonMade = false,
    winnerExists = [false, 0],
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
    let liveCount = 0;
    clear();
    background(0);
    if (players == 0){
        selectCharacters(sprites, players);
    }else if (winnerExists[0]){
        player = winnerExists[1];
        fill(255);
        textSize(64);        
        textAlign(CENTER);                
        text("Winner", width/2, height/3);
        image(player.spriteImage, width/2 - 250 / 2, height/2, 250, 250);
    }
    else{
        for (let i = 0; i < players.length; i++) {
            players[i].update();
            liveCount += players[i].alive;
        }
        drawSprites();
        if (liveCount <= 1) {
            for (let i = 0; i < players.length; i++) {
                if (players[i].alive) {
                    winnerExists[0] = true;
                    winnerExists[1] = players[i];
                }
            }
        }
    }
}