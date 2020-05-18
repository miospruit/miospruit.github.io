abstract class GameObject extends HTMLElement {

    private _x: number
    private _y: number
    private _speed: number

    // Properties
    public get speed(): number { return this._speed }
    public set speed(value: number) { this._speed = value }

    public get x(): number { return this._x }
    public set x(value: number) { this._x = value }

    public get y(): number { return this._y }
    public set y(value: number) { this._y = value }


    public get width(): number { return this.clientWidth }
    public get height(): number { return this.clientHeight }

    constructor() {
        super()
    }

    public hasCollision(GameObject: GameObject): boolean {
        return (this._x < GameObject._x + GameObject.width &&
            this._x + this.width > GameObject._x &&
            this._y < GameObject._y + GameObject.height &&
            this._y + this.height > GameObject._y)
    }

    public move(): void {
        this.draw()
    }

    protected draw() {
        this.style.transform = `translate(${this._x}px, ${this._y}px)`
    }

    public abstract onCollision(gameObject: GameObject): void
}