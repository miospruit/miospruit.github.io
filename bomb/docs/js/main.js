"use strict";
class GameObject extends HTMLElement {
    constructor(game) {
        super();
        this.game = game;
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this);
    }
    update() {
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
    }
}
class Bomb extends GameObject {
    constructor(game) {
        super(game);
        this.resetPosition();
        this.addEventListener("click", (e) => this.onClick(e));
    }
    onClick(e) {
        this.game.scorePoint();
        this.resetPosition();
    }
    update() {
        this.posy += this.speed;
        if (this.posy > window.innerHeight) {
            this.game.destroyBuilding();
            this.resetPosition();
        }
        super.update();
    }
    resetPosition() {
        this.speed = 1 + Math.floor(Math.random() * 5);
        this.posy = (Math.random() * -100) - this.clientHeight;
        this.posx = Math.floor(Math.random() * (window.innerWidth - this.clientWidth));
    }
}
window.customElements.define("bomb-component", Bomb);
class Car extends GameObject {
    constructor(game) {
        super(game);
        this.posx = -100;
        this.posy = window.innerHeight - this.clientHeight;
        this.addEventListener("click", (e) => this.onClick(e));
    }
    onClick(e) {
        this.game.repairBuildings();
    }
    update() {
        this.posx++;
        if (this.posx > window.innerWidth) {
            this.posx = -100;
        }
        super.update();
    }
}
window.customElements.define("car-component", Car);
class Game {
    constructor() {
        this.score = 0;
        this.destroyed = 0;
        this.gameOver = false;
        this.BOMBS = 4;
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.bombs = [];
        for (let i = 0; i < this.BOMBS; i++) {
            this.bombs.push(new Bomb(this));
        }
        this.car = new Car(this);
        console.log("start the game");
        this.gameLoop();
    }
    gameLoop() {
        console.log("updating the game");
        for (let i = 0; i < this.BOMBS; i++) {
            this.bombs[i].update();
        }
        this.car.update();
        if (!this.gameOver) {
            requestAnimationFrame(() => this.gameLoop());
        }
    }
    destroyBuilding() {
        this.destroyed++;
        console.log("buildings destroyed " + this.destroyed);
        this.statusbar.style.backgroundPositionX = `${-72 * this.destroyed}px`;
        if (this.destroyed == 4) {
            this.gameOver = true;
        }
    }
    repairBuildings() {
        this.destroyed = 0;
        this.statusbar.style.backgroundPositionX = `${-72 * this.destroyed}px`;
    }
    scorePoint() {
        this.score++;
        this.textfield.innerHTML = "Score: " + this.score;
    }
}
window.addEventListener("load", () => new Game());
//# sourceMappingURL=main.js.map