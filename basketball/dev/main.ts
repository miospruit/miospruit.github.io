class Main {

    private balls: Ball[] = []
    private basketBall: Ball

    constructor() {

        this.balls.push(new Ball(0, window.innerWidth / 2, new Bouncing()))
        this.balls.push(new Ball(window.innerWidth / 2, window.innerWidth, new Space()))

        this.basketBall = new Ball(0, window.innerWidth, new Bouncing())
        this.basketBall.className = "basketball"

        this.gameLoop()
    }

    gameLoop() {
        for (const ball of this.balls) {
            ball.update()
        }

        this.basketBall.update()

        if (this.basketBall.x <= window.innerWidth / 2) {
            //earth
            this.basketBall.setBehavior(new Bouncing())
        }

        if (this.basketBall.x >= window.innerWidth / 2) {
            //space
            this.basketBall.setBehavior(new Space())
        }

        requestAnimationFrame(() => this.gameLoop())
    }
}

window.addEventListener("load", () => new Main())