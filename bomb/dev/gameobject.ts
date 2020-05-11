abstract class GameObject extends HTMLElement{
    
    protected posy: number
    protected posx: number

    protected game:Game;
        
    constructor(game:Game) {
        super()

        this.game = game;

        let foreground  = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this);
    
    }

    public update():void {
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`
    }
}