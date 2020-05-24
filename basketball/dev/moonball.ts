// class MoonBall extends Ball {
//     constructor(minWidth: number, maxWidth: number) {
//         super(minWidth, maxWidth)
//     }

//     public update(): void {
//         this.x += this.speedX
//         this.y += this.speedY

//         if (this.x < this.minWidth || this.x > this.maxWidth) {
//             this.speedX *= -1

//         }
//         if (this.y < 0 || this.y > this.maxHeight) {
//             this.speedY *= -1
//         }

//         this.draw()
//     }
// }

// window.customElements.define("moonball-component", MoonBall as any)