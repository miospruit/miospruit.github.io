/// <reference path="gameobject.ts" />
class Car extends gameObject{
    game: Game;
    s: number;
    h: number;
    w: number;
    
    posx: number
    posy: number
    
    constructor() {
        super()
        this.h = window.innerHeight 
        this.w = window.innerWidth 
        this.s = 1
        let foreground  = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this);
        
        this.posx = this.getRandomNumberBetween(-500,-300)
        this.posy = 780
    }

    public update():void {
        if(this.posx == this.w){
            this.posx = this.getRandomNumberBetween(-500,-300)
        }else{
            this.posx++
        }
        this.draw()
    }

    public getRandomNumberBetween(min:number,max:number){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    public draw(){
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`
    }
}

window.customElements.define("car-component", Car as any)
