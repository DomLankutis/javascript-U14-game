/// <reference path="./lib/p5.global-mode.d.ts"/>


/**
 * Creates a Selection Screen that allows the user to select player sprites.
 * 
 * @param {array} sprites   An array of sprites from which the players can choose from
 * @param {array} players   An empty array just so that the original will be edited from the get go.
 * 
 * @returns {array} An array of players with their sprites and configurations done.
 */
function selectCharacters(sprites, players) {

    clear();
    if (mouseIsPressed){
        image(sprites[1], 0, 0);
    }else{
        image(sprites[0], 0, 0);
    }

}
