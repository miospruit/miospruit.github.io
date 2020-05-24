"use strict";
class Ball extends HTMLElement {
    constructor(minWidth, maxWidth, ballBehavoir) {
        super();
        this.gravity = 0.1;
        this.friction = 0.9;
        this.x = 0;
        this.y = 0;
        this.speedX = 5;
        this.speedY = -3;
        this.minWidth = 0;
        this.maxWidth = 0;
        this.maxHeight = 0;
        this.ballBehavoir = new Space();
        let content = document.getElementsByTagName("content")[0];
        content.appendChild(this);
        maxWidth -= this.clientWidth;
        this.x = (Math.random() * (maxWidth - minWidth)) + minWidth;
        this.y = 100;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.maxHeight = window.innerHeight - this.clientHeight;
        this.ballBehavoir = ballBehavoir;
    }
    get X() { return this.x; }
    setBehavior(ballBehavoir) {
        this.ballBehavoir = ballBehavoir;
    }
    update() {
        this.ballBehavoir.BallBounce(this);
        this.draw();
    }
    draw() {
        this.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
}
window.customElements.define("ball-component", Ball);
class Main {
    constructor() {
        this.balls = [];
        this.balls.push(new Ball(0, window.innerWidth / 2, new Bouncing()));
        this.balls.push(new Ball(window.innerWidth / 2, window.innerWidth, new Space()));
        this.basketBall = new Ball(0, window.innerWidth, new Bouncing());
        this.basketBall.className = "basketball";
        this.gameLoop();
    }
    gameLoop() {
        for (const ball of this.balls) {
            ball.update();
        }
        this.basketBall.update();
        if (this.basketBall.x <= window.innerWidth / 2) {
            this.basketBall.setBehavior(new Bouncing());
        }
        if (this.basketBall.x >= window.innerWidth / 2) {
            this.basketBall.setBehavior(new Space());
        }
        requestAnimationFrame(() => this.gameLoop());
    }
}
window.addEventListener("load", () => new Main());
class Bouncing {
    BallBounce(ball) {
        if (ball.x < ball.minWidth) {
            ball.x = ball.minWidth;
            ball.speedX *= -1;
            ball.speedX *= ball.friction;
        }
        if (ball.x > ball.maxWidth) {
            ball.x = ball.maxWidth;
            ball.speedX *= -1;
            ball.speedX *= ball.friction;
        }
        if (ball.y + ball.speedY > ball.maxHeight) {
            ball.y = ball.maxHeight;
            ball.speedY *= -1;
            ball.speedY *= ball.friction;
            ball.speedX *= ball.friction;
        }
        else {
            ball.speedY += ball.gravity;
        }
        ball.x += ball.speedX;
        ball.y += ball.speedY;
    }
}
class Space {
    BallBounce(ball) {
        ball.x += ball.speedX;
        ball.y += ball.speedY;
        if (ball.x < ball.minWidth || ball.x > ball.maxWidth) {
            ball.speedX *= -1;
        }
        if (ball.y < 0 || ball.y > ball.maxHeight) {
            ball.speedY *= -1;
        }
    }
}
//# sourceMappingURL=main.js.map