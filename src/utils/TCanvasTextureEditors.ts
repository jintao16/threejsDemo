

export class TCanvasTextureEditors {
    canvas: HTMLCanvasElement
    constructor(width: number = 200, height: number = 200,bgColor: string = 'white') {
        this.canvas = document.createElement('canvas')
        this.canvas.width = width
        this.canvas.height = height
        this.canvas.style.backgroundColor = bgColor

    }
    draw(fun: (ctx: CanvasRenderingContext2D) => void) {
        const ctx = this.canvas.getContext('2d')!
        if (ctx) {
            fun(ctx)
            return this
        } else {
            console.error('浏览器不支持canvas2d')
            return this

        }
    }
    preview() {
        const canvas = this.canvas
        canvas.style.position = 'fixed'
        canvas.style.left = '5%'
        canvas.style.top = '5%'
        document.body.appendChild(this.canvas)
        return this

    }
}