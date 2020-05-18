/// <reference path="GameObject.ts" />

class Rock extends GameObject {
    // Fields 

    private g: number = 0 // gravity
    private rotation: number = 0
    private rotationSpeed: number = 0

    constructor(index: number) {
        super()
        this.x = Math.random() * 400 + 400
        this.y = (70 * index) + 80

        let parent: HTMLElement = document.getElementById("container")
        parent.appendChild(this)
    }
    public onCollision(gameObject: GameObject): void {
        if (gameObject instanceof Car) {
            this.crashed(gameObject.speed)
        }
    }

    public move(): void {
        // speed optellen zo lang we niet de bodem raken
        // speed wordt hoger dan 0 zodra de auto de rots raakt
        this.x += this.speed
        this.y += this.g
        this.speed *= 0.98
        this.rotation += this.rotationSpeed

        if (this.y + this.clientHeight > document.getElementById("container").clientHeight) {
            this.speed = 0
            this.g = 0
            this.rotationSpeed = 0
        }

        //teken de div op de juiste positie
        super.move()
    }

    public crashed(carSpeed: number) {
        this.g = 9.81
        this.speed = carSpeed
        this.rotationSpeed = 5
    }
}

window.customElements.define("rock-component", Rock as any)