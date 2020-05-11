
abstract class gameObject extends HTMLElement {

    abstract posy: number
    abstract posx: number
    abstract h: number
    abstract w: number
    abstract s: number

    constructor() {
        super()
    }

    abstract update(): void
    abstract draw(): void
}

