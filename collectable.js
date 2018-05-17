class Collectable {
    constructor(posX, posY, func) {
        this.sprite = createSprite(posX, posY, 20, 20);
        this.func = func;
    }

    applyToPlayer(player) {
        this.func(player);
    }
}

function indicate(player, tintFunc, timeoutTime) {
    player.tint = () => {tintFunc()};
    let blink = setInterval(() => {
        if (player.tint == "() => {tint(255)}") {
            player.tint = () => {tintFunc()}
        }else {
            player.tint = () => {tint(255)};
        }
    }, 200);

    setTimeout(() => {
        player.tint = () => {tint(255)};
        clearInterval(blink);
        }, timeoutTime * 1000);
}

function createPowerUp(x, y, state) {
    let actOnVariable;
    if (state.toLowerCase() === "good") {
        actOnVariable = (a, b) => {return a + b};
    } else {
        actOnVariable = (a, b) => {return a - b};
    }
    return new Collectable(x, y, (player) => {
        let choice = Math.round(random(0.5, 3.49));
        // 1 - mass
        if (choice === 1) {
            let massIncrease = random(0.2, 1);
            player.sprite.mass = actOnVariable(player.sprite.mass, massIncrease);
            player.spriteSize = actOnVariable(player.spriteSize, massIncrease * 15);
        }
        // 2 - speed
        else if (choice === 2) {
            indicate(player, () => {tint(0, 0, 255, 200)}, 1.5);
            player.SPEED = actOnVariable(player.SPEED, random(0.001, 0.1))
        }
        // 3 - friction
        else {
            indicate(player, () => {tint(0, 193, 255, 200)}, 1.5);
            player.sprite.friction = actOnVariable(player.sprite.friction, random(0.001, 0.025))
        }
    } )
}
