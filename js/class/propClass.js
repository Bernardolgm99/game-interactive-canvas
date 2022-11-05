let canvasH, canvasW, ctx;

export function canvasInfo(ctxInfo,H,W){
    canvasH = H;
    canvasW = W;
    ctx = ctxInfo;
}

export function createProp(height, width,img,type,name) {
    return new Prop(height, width, img, type, name)
}

class Prop {
    img = new Image();
    constructor(h, w, img, type, name) {
        this.h = h;
        this.w = w;
        this.img.src = img;
        this.img.height = h;
        this.img.width = w;
        this.type = type;
        this.name = name;
        this.x = Math.floor(Math.random() * (canvasW - this.h));
        this.y = Math.floor(Math.random() * (canvasH - this.w));
    }
    draw() {
        this.img.onload = () => {
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        }
    }
    update() {
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}