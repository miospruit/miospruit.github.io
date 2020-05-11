/// <reference path="gameobject.ts" />

class Bomb extends GameObject {

    private speed:number;
           
    constructor(game:Game) {
        super(game)

        this.resetPosition();

        this.addEventListener("click", (e) => this.onClick(e as MouseEvent))
        
    }

    private onClick(e:MouseEvent) {
        this.game.scorePoint();
        this.resetPosition();
    }

    public update():void {
        this.posy += this.speed;

        if (this.posy > window.innerHeight) {
            this.game.destroyBuilding();
            this.resetPosition();
        }

        super.update();

    }

    private resetPosition() {
        this.speed = 1 + Math.floor(Math.random() * 5);
        this.posy = (Math.random() * -100) - this.clientHeight;
        this.posx = Math.floor(Math.random() * (window.innerWidth - this.clientWidth));
    }
}

window.customElements.define("bomb-component", Bomb as any)