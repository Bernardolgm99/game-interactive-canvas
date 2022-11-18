export default class Prop {
    img = new Image();
    constructor(h, w, img, type, name , H, W, ctx) {
        this.h = h;
        this.w = w;
        this.img.src = img;
        this.img.height = h;
        this.img.width = w;
        this.type = type;
        this.name = name;
        this.x = Math.floor(Math.random() * (W - this.h));
        this.y = Math.floor(Math.random() * (H - this.w));
        this.ctx = ctx
    }
    draw() {
        this.img.onload = () => {
            this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        }
    }
    update() {
        // ctx.fillRect(this.x, this.y, this.w, this.h)
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}