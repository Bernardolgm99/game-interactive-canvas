let canvasH, canvasW, ctx;

export function canvasInfo(ctxInfo, H, W) {
    canvasH = H;
    canvasW = W;
    ctx = ctxInfo;
}

export function createEcoPoint(x, y, height, width, img, type, name) {
    return new EcoPoint(x, y, height, width, img, type, name)
}



export default class EcoPoint {
    img = new Image();
    constructor(x, y, w, h, img, type, name) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.img.src = img
        this.type = type
        this.name = name
    }
    draw() {
        this.img.onload = () => { ctx.drawImage(this.img, this.x, this.y, this.w, this.h) }
        ctx.beginPath()
        ctx.fillRect(this.x + this.w / 4, this.y, this.w / 2, this.h / 2)
        ctx.closePath()
    }
    update() {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        ctx.beginPath()
        ctx.fillRect(this.x + this.w / 4, this.y, this.w / 2, this.h / 2)
        ctx.closePath()
    }
}
