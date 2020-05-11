"use strict";
class gameObject extends HTMLElement {
    constructor() {
        super();
    }
}
class Bomb extends gameObject {
    constructor() {
        super();
        this.h = window.innerHeight;
        this.w = window.innerWidth;
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this);
        this.posy = this.getRandomNumberBetween(-300, -500);
        this.posx = this.getRandomNumberBetween(0, this.w);
        this.s = this.getRandomNumberBetween(2, 4);
        console.log(this.s);
        let Game = document.getElementsByTagName("game")[0];
        Game.appendChild(this);
    }
    update() {
        this.addEventListener("click", () => this.clickBombs());
        if (this.posy >= this.h) {
            this.posy = this.getRandomNumberBetween(-300, -500);
            this.posx = this.getRandomNumberBetween(0, this.w);
            this.posy += this.s;
        }
        else {
            this.posy += this.s;
        }
        this.draw();
    }
    getRandomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    clickBombs() {
        this.Game.scorePoint();
        this.posy = this.getRandomNumberBetween(-300, -500);
        this.posx = this.getRandomNumberBetween(0, this.w);
        this.posy += this.s;
    }
    draw() {
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
    }
}
window.customElements.define("bomb-component", Bomb);
class Car extends gameObject {
    constructor() {
        super();
        this.h = window.innerHeight;
        this.w = window.innerWidth;
        this.s = 1;
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this);
        this.posx = this.getRandomNumberBetween(-500, -300);
        this.posy = 780;
    }
    update() {
        if (this.posx == this.w) {
            this.posx = this.getRandomNumberBetween(-500, -300);
        }
        else {
            this.posx++;
        }
        this.draw();
    }
    getRandomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    draw() {
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
    }
}
window.customElements.define("car-component", Car);
class Game {
    constructor() {
        this.score = 0;
        this.destroyed = 0;
        this.bombs = [
            this.bomb = new Bomb(),
            this.bomb = new Bomb(),
            this.bomb = new Bomb(),
            this.bomb = new Bomb()
        ];
        this.car = new Car();
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.score = 0;
        this.gameLoop();
    }
    gameLoop() {
        console.log("updating the game");
        this.bombsDown();
        this.bomb.update();
        this.car.update();
        requestAnimationFrame(() => this.gameLoop());
    }
    bombsDown() {
        for (let c of this.bombs) {
            c.update();
        }
    }
    destroyBuilding() {
        this.destroyed++;
        console.log("buildings destroyed " + this.destroyed);
    }
    scorePoint() {
        this.score++;
        this.textfield.innerHTML = "Score: " + this.score;
    }
}
window.addEventListener("load", () => new Game());
//# sourceMappingURL=main.js.map