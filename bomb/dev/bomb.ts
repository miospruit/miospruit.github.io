/// <reference path="gameobject.ts" />

class Bomb extends gameObject{
    s: number
    h: number
    w: number
    posy: number
    posx: number
    
        
    constructor() {
        super()
        this.h = window.innerHeight 
        this.w = window.innerWidth 
        let foreground  = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this);
        
        this.posy = this.getRandomNumberBetween(-300,-500)
        this.posx = this.getRandomNumberBetween(0,this.w)
        this.s = this.getRandomNumberBetween(2,4)
        console.log(this.s)
        let Game = document.getElementsByTagName("game")[0]
        Game.appendChild(this)
    }

    public update():void {
        this.addEventListener("click", () => this.clickBombs())
        if(this.posy >= this.h){
            this.posy = this.getRandomNumberBetween(-300,-500)
            this.posx = this.getRandomNumberBetween(0,this.w)
            this.posy += this.s
            // this.game.destroyBuilding()

        }else{
            this.posy += this.s
        }
        this.draw()
    }

    public getRandomNumberBetween(min:number,max:number){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    public clickBombs(){
        this.Game.scorePoint()
        this.posy = this.getRandomNumberBetween(-300,-500)
        this.posx = this.getRandomNumberBetween(0,this.w)
        this.posy += this.s

    }

    public draw(){
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`
    }
}

window.customElements.define("bomb-component", Bomb as any)
