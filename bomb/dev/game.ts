class Game {
    
    private score: number = 0
    private destroyed: number = 0
    private textfield: HTMLElement
    private statusbar: HTMLElement
    private bombs: Bomb[]
    private car:Car;

    private gameOver:boolean = false;

    private readonly BOMBS:number = 4;
    
    constructor() {
        this.textfield  = document.getElementsByTagName("textfield")[0] as HTMLElement
        this.statusbar  = document.getElementsByTagName("bar")[0] as HTMLElement

        this.bombs = [];
        
        for (let i = 0; i < this.BOMBS; i++) {
            this.bombs.push(new Bomb(this));
        }


        this.car = new Car(this);

        console.log("start the game")
        
        // call method gameLoop
        this.gameLoop();
    }
    
    private gameLoop():void{
        console.log("updating the game")

        for (let i = 0; i < this.BOMBS; i++) {
            this.bombs[i].update();
        }

        this.car.update();
        
        // add request animation frame
        if (!this.gameOver) {
            requestAnimationFrame(() => this.gameLoop());
        }

    }

    public destroyBuilding(){
        this.destroyed ++
        console.log("buildings destroyed " + this.destroyed)

        this.statusbar.style.backgroundPositionX = `${-72 * this.destroyed}px`

        if (this.destroyed == 4) {
            this.gameOver = true;
        }
    }

    public repairBuildings() {
        this.destroyed = 0;
        this.statusbar.style.backgroundPositionX = `${-72 * this.destroyed}px`
    }
       
    public scorePoint() {
        this.score ++
        this.textfield.innerHTML = "Score: " + this.score
    }

} 

window.addEventListener("load", () => new Game())