class GameObject extends HTMLElement {
    get speed() { return this._speed; }
    set speed(value) { this._speed = value; }
    get x() { return this._x; }
    set x(value) { this._x = value; }
    get y() { return this._y; }
    set y(value) { this._y = value; }
    get width() { return this.clientWidth; }
    get height() { return this.clientHeight; }
    constructor() {
        super();
    }
    hasCollision(GameObject) {
        return (this._x < GameObject._x + GameObject.width &&
            this._x + this.width > GameObject._x &&
            this._y < GameObject._y + GameObject.height &&
            this._y + this.height > GameObject._y);
    }
    move() {
        this.draw();
    }
    draw() {
        this.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }
}
class Wheel extends HTMLElement {
    constructor(car, offsetCarX) {
        super();
        this.style.transform = `translate(${offsetCarX}px, 30px)`;
        car.appendChild(this);
    }
}
window.customElements.define("wheel-component", Wheel);
class Car extends GameObject {
    constructor(yIndex, game) {
        super();
        this.braking = false;
        this.stopped = false;
        this.game = game;
        this.x = 0;
        this.y = (70 * yIndex) + 80;
        this.speed = Math.random() * 2 + 1;
        new Wheel(this, 105);
        new Wheel(this, 20);
        document.addEventListener("keydown", (e) => this.handleKeyDown(e));
        this.addEventListener("click", (e) => this.handleMouseClick(e));
        let parent = document.getElementById("container");
        parent.appendChild(this);
    }
    handleMouseClick(e) {
        this.braking = true;
        this.changeColor(80);
    }
    handleKeyDown(e) {
        if (e.key == ' ') {
            this.braking = true;
        }
    }
    move() {
        this.x += this.speed;
        if (this.braking)
            this.speed *= 0.98;
        if (this.speed < 0.5)
            this.speed = 0;
        if (this.speed == 0 && this.braking && !this.stopped) {
            this.changeColor(80);
            this.game.addScore(this.x);
            this.braking = false;
            this.stopped = true;
        }
        super.move();
    }
    crash() {
        this.speed = 0;
        this.braking = false;
        this.changeColor(300);
    }
    changeColor(deg) {
        this.style.filter = `hue-rotate(${deg}deg)`;
    }
    onCollision(gameObject) {
        if (gameObject instanceof Rock) {
            this.crash();
            this.game.gameOver();
        }
    }
}
window.customElements.define("car-component", Car);
class Rock extends GameObject {
    constructor(index) {
        super();
        this.g = 0;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.x = Math.random() * 400 + 400;
        this.y = (70 * index) + 80;
        let parent = document.getElementById("container");
        parent.appendChild(this);
    }
    onCollision(gameObject) {
        if (gameObject instanceof Car) {
            this.crashed(gameObject.speed);
        }
    }
    move() {
        this.x += this.speed;
        this.y += this.g;
        this.speed *= 0.98;
        this.rotation += this.rotationSpeed;
        if (this.y + this.clientHeight > document.getElementById("container").clientHeight) {
            this.speed = 0;
            this.g = 0;
            this.rotationSpeed = 0;
        }
        super.move();
    }
    crashed(carSpeed) {
        this.g = 9.81;
        this.speed = carSpeed;
        this.rotationSpeed = 5;
    }
}
window.customElements.define("rock-component", Rock);
class Game {
    constructor() {
        this.gameobject = [];
        this.score = 0;
        this.request = 0;
        this.gameover = false;
        for (let i = 0; i < 6; i++) {
            this.addCarWithRock(i);
        }
        this.gameLoop();
    }
    addCarWithRock(index) {
        this.gameobject.push(new Car(index, this));
        this.gameobject.push(new Rock(index));
    }
    gameLoop() {
        for (let object of this.gameobject) {
            object.move();
        }
        this.checkCollision();
        this.request = requestAnimationFrame(() => this.gameLoop());
    }
    checkCollision() {
        for (const gameobject1 of this.gameobject) {
            for (const gameobject2 of this.gameobject) {
                if (gameobject1.hasCollision(gameobject2)) {
                    gameobject1.onCollision(gameobject2);
                }
            }
        }
    }
    gameOver() {
        this.gameover = true;
        document.getElementById("score").innerHTML = "Game Over";
        cancelAnimationFrame(this.request);
    }
    addScore(x) {
        if (!this.gameover) {
            this.score += Math.floor(x);
            this.draw();
        }
    }
    draw() {
        document.getElementById("score").innerHTML = "Score : " + this.score;
    }
}
window.addEventListener("load", () => new Game());
//# sourceMappingURL=main.js.map