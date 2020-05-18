/// <reference path="wheel.ts"/>
/// <reference path="car.ts"/>
/// <reference path="rock.ts"/>
/// <reference path="GameObject.ts"/>

class Game {

    // Fields
    private gameobject: GameObject[] = []
    private score: number = 0
    private request: number = 0
    private gameover: boolean = false



    constructor() {
        for (let i = 0; i < 6; i++) {
            this.addCarWithRock(i)
        }

        this.gameLoop()
    }

    private addCarWithRock(index: number) {
        this.gameobject.push(new Car(index, this))
        this.gameobject.push(new Rock(index))
    }

    private gameLoop() {
        for (let object of this.gameobject) {
            object.move()
        }

        this.checkCollision()

        this.request = requestAnimationFrame(() => this.gameLoop())
    }

    private checkCollision() {
        for (const gameobject1 of this.gameobject) {
            for (const gameobject2 of this.gameobject) {
                if (gameobject1.hasCollision(gameobject2)) {
                    gameobject1.onCollision(gameobject2)
                }
            }

        }
    }

    public gameOver(): void {
        this.gameover = true
        document.getElementById("score").innerHTML = "Game Over"
        cancelAnimationFrame(this.request)
    }

    public addScore(x: number) {
        if (!this.gameover) {
            this.score += Math.floor(x)
            this.draw()
        }
    }

    private draw() {
        document.getElementById("score").innerHTML = "Score : " + this.score
    }


}

// load
window.addEventListener("load", () => new Game())