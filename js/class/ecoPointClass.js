export default class EcoPoint {
    img = new Image();
    shake = false
    constructor(x, y, w, h, img, type, name, ctx) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.img.src = img
        this.type = type
        this.name = name
        this.ctx = ctx
    }
    draw() {
        this.img.onload = () => { this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h) }
    }
    update() {
        if (this.shake) {
            this.ctx.save()
            let dx = -1 + Math.random() * 2 // MIN + random*(MAX-MIN)
            let dy = -1 + Math.random() * 2
            this.ctx.translate(this.x + this.w / 2 + dx, this.y + this.h / 2 + dy)
            this.ctx.rotate(-0.05 + Math.random() * 0.1)
            this.ctx.drawImage(this.img, -this.w / 2 + dx, -this.h / 2 + dy, this.w, this.h)
            this.ctx.restore()
        } else this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}
