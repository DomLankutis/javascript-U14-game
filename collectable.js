class Collectable {
    constructor(posX, posY, func) {
        this.sprite = createSprite(posX, posY, 20, 20);
        this.func = func;
    }

    applyToPlayer(player) {
        this.func(player);
    }
}

function createGoodPowerUp(x, y) {
    // Aspect ratio is 18:9.
    return new Collectable(x, y, (player) => {
        // 1 - mass
        // 2 - speed
        // 3 - friction
        let choice = Math.round(random(0.5, 3.49));
        if (choice === 1) {
            let massIncrease = random(0, 1);
            player.sprite.mass += massIncrease;
            player.spriteSize += massIncrease * 10;
        }
        else if (choice === 2) {
            player.SPEED += random(0, 0.1);
        }
        else {
            player.sprite.friction += random(0, 0.009);
        }
    } )
}

function createBadPowerUp(x, y) {
    // Aspect ratio is 18:9.
    return new Collectable(x, y, (player) => {
        // 1 - mass
        // 2 - speed
        // 3 - friction
        let choice = Math.round(random(0.5, 3.49));
        if (choice === 1) {
            let massIncrease = random(0, 1);
            player.sprite.mass -= massIncrease;
            player.spriteSize -= massIncrease * 10;
        }
        else if (choice === 2) {
            player.SPEED -= random(0, 0.1);
        }
        else {
            player.sprite.friction -= random(0, 0.009);
        }
    } )
}