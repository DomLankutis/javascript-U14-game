/// <reference path="./lib/p5.global-mode.d.ts"/>

let spriteChoice = [0, 1, 2, 3];
let lockedSprites = [0, 1, 2, 3];


/**
 * Checks if the incoming sprite is not locked otherwise will set the next closest unlocked sprite
 * 
 * 
 * @param {Number} incomingChange       Sprite which should be chosen
 * @param {Number} playerIndex          Index of which player it wants to assign it to
 * @param {Number} direction            The direction in which the sprite change will go
 */
function changeWithLock(incomingChange ,playerIndex, direction) {
    if (!lockedSprites.includes(incomingChange)){
        if (incomingChange < 0){ 
            incomingChange = sprites.length - 1;
        }
        spriteChoice[playerIndex] = incomingChange;
        return true;
    }
    changeWithLock(incomingChange + direction,playerIndex, direction);
}

/**
 * Change the sprite of the specific player
 * 
 * @param {Number} playerIndex  Index of the player which you would want to change the sprite for.
 * @param {Number} direction    The direction that the sprites should move
 */
function changeSprite(playerIndex, direction) {
    let incomingChange;
    if ((spriteChoice[playerIndex] + direction) < 0){
        incomingChange = (sprites.length - 1);
    }else
    if (spriteChoice[playerIndex] <= sprites.length - 1){
        if (direction > 0 || (direction < 0 && spriteChoice[playerIndex] >= 1)) {
            incomingChange = (spriteChoice[playerIndex] + direction) % (sprites.length - 1);
        }
    }

    // Check if sprite is not in use and set as allowed sprite
    changeWithLock(incomingChange, playerIndex, direction);

    // Set sprite lock
    lockedSprites[playerIndex] = spriteChoice[playerIndex];
    
}

/**
 * Returns all the characters with assigned sprites.
 */
function returnSetCharacters() {
    let stageRadius = height/2 - 25;
    players.push(new Player(["W", "S", "A", "D"], sprites[spriteChoice[0]], width/2, 25));
    players.push(new Player(["Y", "H", "G", "J"], sprites[spriteChoice[1]], width/2 + stageRadius, stageRadius));
    players.push(new Player(["P", 186, "L", 192], sprites[spriteChoice[2]], width/2 - stageRadius, stageRadius));
    players.push(new Player([104, 101, 100, 102], sprites[spriteChoice[3]], width/2, height - 25));
}

/**
 * Creates a Selection Screen that allows the user to select player sprites.
 * 
 * @param {array} sprites   An array of sprites from which the players can choose from
 * @param {array} players   An empty array just so that the original will be edited from the get go.
 * 
 * @returns {array} An array of players with their sprites and configurations done.
 */
function selectCharacters(sprites, players) {

    // Place the Selection of for the players.
    // Create of the layout should be done here.
    let SPRITESIZE = 120;
    let AVGPOSITION = (width / 4);
    let GAP = width/100 * 10;
    let BUTTONGAP = SPRITESIZE / 2;
    let YSPACE = height / 12;
    for (let i = 0; i < 4; i++) {
        let xPosition = i * AVGPOSITION + GAP;
        image(sprites[spriteChoice[i]], xPosition, YSPACE);

        if (!buttonsMade) {
            let sprites = buttonSprite;
            buttons.push(new Button(xPosition + GAP, YSPACE + 30, sprites, 50, () => {changeSprite(i, 1);}));
            buttons.push(new Button(xPosition - GAP, YSPACE + 30, sprites, 50, () => {changeSprite(i, -1);}, true));
        }
        
        if (!readyButtonMade) {
            buttons.push(new Button(width / 8 * 7.3, height / 8 * 6.5, buttonReadySprite, 100, () => {returnSetCharacters();}));
            readyButtonMade = true;
        }

        for (let i = 0; i < buttons.length ; i++) {
            buttons[i].update();
        }
    }
    buttonsMade = true;
}
