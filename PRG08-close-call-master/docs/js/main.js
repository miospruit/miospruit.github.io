class GameObject extends HTMLElement {
    constructor(GameObject) {
        super();
        this.x = 0;
        this.y = 0;
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
    }
    hasCollision(GameObject) {
    }
    draw() {
        this.style.transform = `translate(${this.x}px, ${this.y}px)`;
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
    constructor(yIndex, game, gameObject) {
        super(gameObject);
        this.speed = Math.random() * 2 + 1;
        this.braking = false;
        this.stopped = false;
        this.game = game;
        this.X = 0;
        this.Y = (70 * yIndex) + 80;
        new Wheel(this, 105);
        new Wheel(this, 20);
        document.addEventListener("keydown", (e) => this.handleKeyDown(e));
        this.addEventListener("click", (e) => this.handleMouseClick(e));
        let parent = document.getElementById("container");
        parent.appendChild(this);
    }
    get Speed() { return this.speed; }
    get X() { return this.x; }
    set X(value) { this.x = value; }
    get Y() { return this.y; }
    set Y(value) { this.y = value; }
    get width() { return this.clientWidth; }
    get height() { return this.clientHeight; }
    onCollision() {
        throw new Error("Method not implemented.");
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
        this.X += this.speed;
        if (this.braking)
            this.speed *= 0.98;
        if (this.speed < 0.5)
            this.speed = 0;
        if (this.speed == 0 && this.braking && !this.stopped) {
            this.changeColor(80);
            this.game.addScore(this.X);
            this.braking = false;
            this.stopped = true;
        }
        super.draw();
    }
    crash() {
        this.speed = 0;
        this.braking = false;
        this.changeColor(300);
    }
    changeColor(deg) {
        this.style.filter = `hue-rotate(${deg}deg)`;
    }
}
window.customElements.define("car-component", Car);
class Game {
    constructor() {
        this.vehicles = [];
        this.score = 0;
        this.request = 0;
        this.gameover = false;
        for (let i = 0; i < 6; i++) {
            this.addCarWithRock(i);
        }
        this.gameLoop();
    }
    addCarWithRock(index) {
        this.vehicles.push(new Car(index, this, this));
        this.vehicles.push(new Rock(index, this));
    }
    gameLoop() {
        for (let vehicle of this.vehicles) {
            vehicle.move();
        }
        this.checkCollision();
        this.request = requestAnimationFrame(() => this.gameLoop());
    }
    checkCollision() {
        for (let car of this.vehicles) {
            for (let rock of this.vehicles) {
                if (this.hasCollision(car, rock)) {
                    rock.crashed(car.Speed);
                    car.crash();
                    this.gameOver();
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
    hasCollision(rect1, rect2) {
        return (rect1.X < rect2.X + rect2.width &&
            rect1.X + rect1.width > rect2.X &&
            rect1.Y < rect2.Y + rect2.height &&
            rect1.Y + rect1.height > rect2.Y);
    }
}
window.addEventListener("load", () => new Game());
class Rock extends GameObject {
    constructor(index, gameObject) {
        super(gameObject);
        this.speed = 0;
        this.g = 0;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.X = Math.random() * 400 + 400;
        this.Y = (70 * index) + 80;
        let parent = document.getElementById("container");
        parent.appendChild(this);
    }
    set Speed(s) { this.speed = s; }
    get X() { return this.x; }
    set X(value) { this.x = value; }
    get Y() { return this.y; }
    set Y(value) { this.y = value; }
    get width() { return this.clientWidth; }
    get height() { return this.clientHeight; }
    onCollision() {
        throw new Error("Method not implemented.");
    }
    move() {
        this.X += this.speed;
        this.Y += this.g;
        this.speed *= 0.98;
        this.rotation += this.rotationSpeed;
        super.draw();
    }
    crashed(carSpeed) {
        this.g = 9.81;
        this.speed = carSpeed;
        this.rotationSpeed = 5;
    }
}
window.customElements.define("rock-component", Rock);
//# sourceMappingURL=main.js.map