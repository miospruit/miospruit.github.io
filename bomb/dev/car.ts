/// <reference path="gameobject.ts" />

class Car extends GameObject{
        
    constructor(game:Game) {
        super(game)
        
        this.posx = -100
        this.posy = window.innerHeight - this.clientHeight;

        this.addEventListener("click", (e) => this.onClick(e as MouseEvent))
        
    }

    private onClick(e:MouseEvent) {
        this.game.repairBuildings();
    }

    public update():void {
        this.posx++;

        if (this.posx > window.innerWidth) {
            this.posx = -100;
        }
        
        super.update();
    }
}

window.customElements.define("car-component", Car as any)