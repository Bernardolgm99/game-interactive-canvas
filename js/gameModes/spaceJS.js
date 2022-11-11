const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

//GLOBALS
//trash
class Prop {
    constructor(h, w, img, type, name) {
        this.h = h;
        this.w = w;
        this.img = img;
        this.type = type;
        this.name = name;
        this.ground = false;
        this.x = Math.floor(Math.random() * (W - this.h));
        this.y = Math.floor(Math.random() * (7*H/10 - this.w));
    }
    update() {
        ctx.clearRect(this.x, this.y, this.w, this.h)
        ctx.fillStyle = this.img
        ctx.beginPath()
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.closePath()
        if(colision){
            ctx.fillStyle = 'gray';
            ctx.fillRect(trash[indexColision].x, trash[indexColision].y, trash[indexColision].w, trash[indexColision].h)
            if(!trash[indexColision].ground){
                trash[indexColision].y += 0.1
                if(trash[indexColision].y >= yp + 20) trash[indexColision].ground = true, colision = false
                if(colisionPlayer) playerBag.push(trash[indexColision])
            }
        }
    }
}
class Shot {
    constructor (h, w, img){
        this.h = h;
        this.w = w;
        this.img = img;
        this.x = xp;
        this.y = yp;
    }
    update() {
        ////SHHOT
        if (startShoot){
            ctx.fillStyle = "green"
            ctx.fillRect(this.x, this.y, 10, 10)
            this.x += this.dx
            this.y += this.dy 
            this.dy += 0.05
            shot.checkColison()
            if (this.y >= yp + 70 || colision){
                startShoot = false             
            }
            /* console.log(trashArray[indexColision].x) */
        }
    }
    //shots calcuations
    shotsCalculator (xr, yr){
        if (!(startShoot)){
            angle = Math.atan2(yr - yp, xr-xp)
            startShoot = true;

            scale = (Math.sqrt((Math.pow(yp-yr, 2) + Math.pow(xp-xr, 2))))/40;
            if(scale >= 7.7) scale = 8

            //faceing 
            if (angle <= -1.5 ||  angle >= 1.4){
                this.x = xp + 25
                this.y = yp
                fleft = true;
            } else {
                this.x = xp + 25
                this.y = yp
            }

            //agle random far not really accurate
            let wobble = Math.random() * (0.07 - (-0.07))
            this.dx = scale*Math.cos(angle + wobble)
            this.dy = scale*Math.sin(angle + wobble)
        }
    }
    checkColison(){
        for(let i = 0; i < trash.length; i++){
            if (this.x + 10 < trash[i].x ||
                this.x > trash[i].x + size ||
                this.y + 10 < trash[i].y ||
                this.y > trash[i].y + size){
               
            } else {
                colision = true;
                indexColision = i
                console.log(colision, i)
                console.log(this, trash)
                break
            }
        };
    }
}
class Trees {
    constructor(h){
        this.h = h;
    }
}

//player position and atributes
let xp = 100, yp = 800, w= 50, h= 70;
//keys
let rightKey = false, leftKey = false, upKey = false, downKey = false, fleft = false, spaceKey = false;
//calculate Shots
let angle, startShoot = false, scale;
//trash
let trash = [], quantity = 10;
//shot
let shot = new Shot(10, 10, 'green')
//checkColisons
let colision = false, indexColision, colisionPlayer = false;
let size = Math.floor(Math.random() * (50 - 20) + 20), ground = false
let xrSpace, yrSpace;

//keys EVENTS
window.addEventListener('keydown', e => {
    if (e.key == 'ArrowRight' || e.keyCode == 68)
        rightKey = true, fleft = false;
    if (e.key == 'ArrowLeft' || e.keyCode == 65)
        leftKey = true, fleft = true;
    if (e.key == 'ArrowDown' || e.keyCode == 83)
        downKey = true;
    if (e.key == 'ArrowUp' || e.keyCode == 87)
        upKey = true;
    if (e.keyCode == 32){
        spaceKey = true;
        shot.shotsCalculator(xrSpace, yrSpace)
    }
    e.preventDefault();
});
window.addEventListener('keyup', e => {
    if (e.key == 'ArrowRight' || e.keyCode == 68)
        rightKey = false;
    if (e.key == 'ArrowLeft' || e.keyCode == 65)
        leftKey = false;
    if (e.key == 'ArrowDown' || e.keyCode == 83)
        downKey = false;
        if (e.key == 'ArrowUp' || e.keyCode == 87)
        upKey = false;
        if (e.keyCode == 32){
            spaceKey = false;
        }
});
//canvas EVENTS
canvas.addEventListener('click', e => {
    let xr = e.offsetX; let yr = e.offsetY;
    shot.shotsCalculator(xr, yr)
}) 
canvas.addEventListener('mousemove', e => {
    xrSpace = e.offsetX; yrSpace = e.offsetY;
})     

function trashRender(nTimes){
    //escolher arvore aleratoriamente
    //criar lixo
    for (var i = 0; i < nTimes; i++){
        trash.push(new Prop(50,50, 'black', 'metal', 'trash'))
    }
    //x && y, de momento aparece aleatoriamente no canvas
}
//trash placement calculator

trashRender(10)
function render() {
    //clear the Canvas
    ctx.clearRect(0, 0, W, H);
    
    //arvores
    let count = 0, countw = 0
    for (let i = 0; i < 8; i++){
        //uno
        ctx.fillStyle = 'red';
        ctx.fillRect(count,650,w,h)
        ctx.fillStyle = 'red';
        ctx.fillRect(countw,200,200,500)
        count += 300;
        countw += 280;
        width = 200 
    }
    
    trash.forEach((prop) => {
        prop.update()
    })
    shot.update()
    
    //player boundering
    if (rightKey && xp + w < W) xp+=1.3;
    if (leftKey && xp > 0) xp-=1.3;
    if (downKey && yp + h < H) yp+=1.3;
    if (upKey && yp + h > 8*H/10) yp-=1.3;
    //player
    ctx.fillStyle = 'blue';
    ctx.fillRect(xp,yp,w,h)    

    window.requestAnimationFrame(render);
}
window.onload = render;