class Player {

    /**
     * 
     * @param {array} Controls      The keys which are used to control the player object.
     *                              Order is [UP, DOWN, LEFT, RIGHT]
     * @param {image} sprite        The sprite of the player object
     * @param {number} spawnX       The X coordinate of where the object will be spawned
     * @param {number} spawnY       The Y coordinate of where the object will be spawned
     */
    constructor(Controls, sprite, spawnX, spawnY) {
        this._spriteSize = 50;
        this.spriteImage = sprite;
        this.tint = () => {tint(255)};
        this.sprite = createSprite(spawnX, spawnY, this.spriteSize, this.spriteSize);
        this.sprite.setCollider("circle", this.sprite.deltaX, this.sprite.deltaY, this._spriteSize / 2);
        let player = this;
        // Custom draw to resize image.
        this.sprite.draw = function() {
            image(sprite, this.deltaX, this.deltaY, player._spriteSize, player._spriteSize);
            player.tint();
            image(sprite, this.deltaX, this.deltaY, player._spriteSize, player._spriteSize);
        };
        this.CONTROLS = {
            UP: Controls[0],
            DOWN: Controls[1],
            LEFT: Controls[2],
            RIGHT: Controls[3]
        };
        this.alive = true;
        this.SPEED = 0.17;
        this.sprite.maxSpeed = 10;
        this.sprite.friction = 0.01;
        playersGroup.add(this.sprite);
    }

    get spriteSize() {
        return this._spriteSize;
    }

    set spriteSize(value) {
        this._spriteSize = value;
        this.sprite.setCollider("circle", 0, 0, this.spriteSize / 2);
    }

    update() {
        if (this.alive) {
            if (!this.sprite.overlap(stage)) {
                this.sprite.remove();
                this.alive = false;
            }
            playersGroup.bounce(playersGroup);
            // Key Input
            if (keyDown(this.CONTROLS.UP)) {
                this.sprite.addSpeed(this.SPEED, 270);
            }
            if (keyDown(this.CONTROLS.DOWN)) {
                this.sprite.addSpeed(this.SPEED, 90);
            }
            if (keyDown(this.CONTROLS.LEFT)) {
                this.sprite.addSpeed(this.SPEED, 180);
            }
            if (keyDown(this.CONTROLS.RIGHT)) {
                this.sprite.addSpeed(this.SPEED, 0);            
            }
        }
    }
}