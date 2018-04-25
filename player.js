class Player {

    /**
     * @param {array} Controls      The keys which are used to controll the player object.
     *                              Order is [UP, DOWN, LEFT, RIGHT]
     */
    constructor(Controls) {
        this.sprite = createSprite(0, 0, 50, 50);
        this.CONTROLS = {
            UP: Controls[0],
            DOWN: Controls[1],
            LEFT: Controls[2],
            RIGHT: Controls[3]
        };

        this.SPEED = 0.17;

        this.sprite.maxSpeed = 10;
        this.sprite.friction = 0.01;
    }

    update() {

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