/// <reference path="./lib/p5.global-mode.d.ts"/>

class Button{
    /**
     * Class for a reusable button that can be used within P5.JS
     * 
     * @param {Number} x            X position of where the button should be placed
     * @param {Number} y            Y Position of where the button should be placed
     * @param {Array} spriteSheet   Spritesheet for the buttons
     * @param {Number} imageSize    Size of the image
     * @param {function} func       The function which the button is meant to do
     * @param {Number} flip         Whether the button should be flipped or not (Requires you to provide two sprites [Not Flipped, Flipped])
     */
    constructor(x, y, spriteSheet, imageSize, func, flip=false) {
        // Shows whether button is clicked or not (0 is not clicked, 1 is clicked)
        this.state = 0;
        this.buttonSprite = spriteSheet;
        this.imageSize = imageSize;
        this.flip = flip;
        this.func = func;
        this.posistion = {
            x: x,
            y: y
        };
    }

    /**
     * Update behavior of the button
     */
    update() {
        image(this.buttonSprite[Number(this.flip)], this.posistion.x, this.posistion.y, this.imageSize, this.imageSize);
        if (mouseIsPressed && mouseX >= this.posistion.x && mouseX <= this.posistion.x + this.imageSize &&
            mouseY >= this.posistion.y && mouseY <= this.posistion.y + this.imageSize) {
            if (this.state == 0) {
                this.func();
            }this.state = 1;
        }else{this.state = 0;}
    }
}