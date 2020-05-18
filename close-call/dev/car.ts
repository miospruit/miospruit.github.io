/// <reference path="wheel.ts"/>

/// <reference path="GameObject.ts" />

class Car extends GameObject {

    // Fields
    private game: Game
    private braking: boolean = false
    private stopped: boolean = false


    constructor(yIndex: number, game: Game) {
        super()

        this.game = game
        this.x = 0
        this.y = (70 * yIndex) + 80
        this.speed = Math.random() * 2 + 1

        new Wheel(this, 105)  // front wheel 
        new Wheel(this, 20)   // rear wheel 

        // hier een keypress event listener toevoegen. een keypress zorgt dat braking true wordt
        document.addEventListener("keydown", (e: KeyboardEvent) => this.handleKeyDown(e))
        this.addEventListener("click", (e: MouseEvent) => this.handleMouseClick(e))

        let parent: HTMLElement = document.getElementById("container")
        parent.appendChild(this)
    }


    private handleMouseClick(e: MouseEvent) {
        this.braking = true
        this.changeColor(80) //green
    }

    private handleKeyDown(e: KeyboardEvent) {
        if (e.key == ' ') { // spacebar
            // Brake
            this.braking = true
        }
    }

    public move(): void {
        // de snelheid bij de x waarde optellen
        this.x += this.speed

        // hier de snelheid verlagen als we aan het afremmen zijn
        if (this.braking) this.speed *= 0.98
        if (this.speed < 0.5) this.speed = 0

        if (this.speed == 0 && this.braking && !this.stopped) {
            this.changeColor(80) //green
            this.game.addScore(this.x)
            this.braking = false
            this.stopped = true
        }
        super.move()
    }

    public crash() {
        this.speed = 0
        this.braking = false
        this.changeColor(300) //red
    }

    public changeColor(deg: number): void {
        this.style.filter = `hue-rotate(${deg}deg)`
    }

    public onCollision(gameObject: GameObject): void {
        if (gameObject instanceof Rock) {
            this.crash()
            this.game.gameOver()
        }
    }

}

window.customElements.define("car-component", Car as any)