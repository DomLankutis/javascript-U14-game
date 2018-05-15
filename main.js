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
    playersGroup,
    collectables = [];

function preload() {
    // Load sprites in to an array
    loadKeySprites();
    for (let i = 0; i < 18; i++){
        sprites.push( loadImage("sprites/Sprite ("+(i+1)+").png"));
    }
    stageSprite = loadImage("sprites/stage.png");
    buttonSprite.push(loadImage("sprites/buttonRight.png"));
    buttonSprite.push(loadImage("sprites/buttonLeft.png"));
    buttonReadySprite.push(loadImage("sprites/ready.png"));
}

function setup() {
    createCanvas(1800, 900);
    stage = createSprite(width/2, height/2);
    stage.setCollider("circle", 0, 0, height /2);
    stage.draw = function() {image(stageSprite, this.deltaX/2, this.deltaY/2, height*1.05, height*1.05);};
    playersGroup = new Group();
    let radius = height / 3;
    for (let i = 0; i <= random(2, 10); i++) {
        let choice = Math.round(random());
        let x = 0;
        let y = 0;
        do {
            x = Math.round(random(0, width));
            y = Math.round(random(0, height));
        } while ((Math.pow(x - width / 2, 2) + (Math.pow(y - height / 2, 2)) > (radius * radius)));
        if (choice === 0) {
            collectables.push(createGoodPowerUp(x, y));
        } else {
            collectables.push(createBadPowerUp(x, y));
        }
    }

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
        printEmojiText("winner", width/2.5, height/3);
        image(player.spriteImage, width/2 - 250 / 2, height/2, 250, 250);
    }
    else{
        for (let i = 0; i < players.length; i++) {
            players[i].update();
            for (let j = 0; j < collectables.length; j++) {
                if (players[i].sprite.overlap(collectables[j].sprite)) {
                    collectables[j].applyToPlayer(players[i]);
                    collectables[j].sprite.remove();
                    collectables.splice(j, 1);
                }
            }
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
