class Rock extends GameObject {
    // Fields 

    private speed: number = 0
    private g: number = 0 // gravity
    private rotation: number = 0
    private rotationSpeed: number = 0

    // Properties
    public set Speed(s: number) { this.speed = s }

    public get X(): number { return this.x }
    public set X(value: number) { this.x = value }

    public get Y(): number { return this.y }
    public set Y(value: number) { this.y = value }


    public get width(): number { return this.clientWidth }
    public get height(): number { return this.clientHeight }

    constructor(index: number, gameObject: GameObject) {
        super(gameObject)
        this.X = Math.random() * 400 + 400
        this.Y = (70 * index) + 80

        let parent: HTMLElement = document.getElementById("container")
        parent.appendChild(this)
    }

    public onCollision(): void {
        throw new Error("Method not implemented.")
    }

    public move(): void {
        // speed optellen zo lang we niet de bodem raken
        // speed wordt hoger dan 0 zodra de auto de rots raakt
        this.X += this.speed
        this.Y += this.g
        this.speed *= 0.98
        this.rotation += this.rotationSpeed



        //teken de div op de juiste positie
        super.draw()
    }

    public crashed(carSpeed: number) {
        this.g = 9.81
        this.speed = carSpeed
        this.rotationSpeed = 5
    }
}

window.customElements.define("rock-component", Rock as any)