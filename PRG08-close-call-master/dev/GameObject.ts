abstract class GameObject extends HTMLElement {

    protected x: number = 0
    protected y: number = 0
    public width: number
    public height: number
    constructor(GameObject: GameObject) {
        super()

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this)
    }

    public hasCollision(GameObject: GameObject) {

    }

    public abstract move(): void

    protected draw() {
        this.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public abstract onCollision(): void
}