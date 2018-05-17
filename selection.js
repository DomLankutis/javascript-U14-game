/// <reference path="./lib/p5.global-mode.d.ts"/>

let spriteChoice = [0, 1, 2, 3];
let lockedSprites = [0, 1, 2, 3];
let controls = [["W", "S", "A", "D"], ["I", "K", "J", "L"], ["UP", "DOWN", "LEFT", "RIGHT"], ["8NUMPAD", "5NUMPAD", "4NUMPAD", "6NUMPAD"]];

function findKeyByValue(obj, val) {
    return Object.keys(obj).find(key => obj[key] === val);
}


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
    players.push(new Player(controls[0], sprites[spriteChoice[0]], width/2, 25));
    players.push(new Player(controls[1], sprites[spriteChoice[1]], width/2 + stageRadius, stageRadius));
    players.push(new Player(controls[2], sprites[spriteChoice[2]], width/2 - stageRadius, stageRadius));
    players.push(new Player(controls[3], sprites[spriteChoice[3]], width/2, height - 25));
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
    let AVGPOSITION = (width / 4);
    let GAP = width/100 * 4;
    let YSPACE = height / 12;
    let textSize = 35;
    for (let i = 0; i < 4; i++) {
        let xPosition = i * AVGPOSITION + GAP + (width / 100 * 5);
        image(sprites[spriteChoice[i]], xPosition, YSPACE);
        if (i !== 3) {
            textSize = 35;
            let lowerKeySection  = controls[i][2] + " " + controls[i][1] + " " + controls[i][3];
            printEmojiText(controls[i][0], xPosition + (GAP / 2), height / 2 - 50, textSize);
            printEmojiText(lowerKeySection, xPosition + (GAP / 2) - (lowerKeySection.length  * textSize / 2.5) , height / 2, textSize);
        }else {
            textSize = 50;
            let lowerKeySection  = controls[i][2][0] + " " + controls[i][1][0] + " " + controls[i][3][0];
            printEmojiText(controls[i][0][0], xPosition + (GAP / 2), height / 2 - 50, textSize);
            printEmojiText(lowerKeySection, xPosition + (GAP / 2) - (lowerKeySection.length  * textSize / 2.5), height / 2, textSize);
        }





        if (!buttonsMade) {
            let sprites = buttonSprite;
            buttons.push(new Button(xPosition + GAP * 2, YSPACE + 30, sprites, 50, () => {changeSprite(i, 1);}));
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
