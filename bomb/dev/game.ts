class Game {
    
    public score: number = 0
    private destroyed: number = 0
    private textfield: HTMLElement
    private statusbar: HTMLElement
    private bomb: Bomb
    private car: Car
    private bombs: Array<Bomb>
    
    constructor() {
        this.bombs = [
            this.bomb           = new Bomb(),
            this.bomb           = new Bomb(),
            this.bomb           = new Bomb(),
            this.bomb           = new Bomb()
        ]
        this.car                = new Car()
        this.textfield          = document.getElementsByTagName("textfield")[0] as HTMLElement
        this.statusbar          = document.getElementsByTagName("bar")[0] as HTMLElement
        this.score              = 0
        // call method gameLoop
        this.gameLoop()
        
    }
    
    private gameLoop():void{
        
        console.log("updating the game")
        this.bombsDown()
        this.bomb.update()
        this.car.update()
        requestAnimationFrame(() => this.gameLoop())

        // add request animation frame
    }

    public bombsDown(){
        for(let c of this.bombs){
            c.update()
        }
    }

    public destroyBuilding(){
        this.destroyed ++
        console.log("buildings destroyed " + this.destroyed)
    }
       
    public scorePoint(){
        this.score ++
        this.textfield.innerHTML = "Score: " + this.score
    }

} 

window.addEventListener("load", () => new Game())