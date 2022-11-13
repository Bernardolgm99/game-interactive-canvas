const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

//GLOBALS
//trash
class Prop {
    constructor(h, img, type, name, x, y) {
        this.h = h;
        this.w = h;
        this.img = img;
        this.type = type;
        this.name = name;
        this.ground = false;
        this.x = x;
        this.y = y;
    }
    update() {
        ctx.clearRect(this.x, this.y, this.w, this.h)
        ctx.fillStyle = this.img
        ctx.beginPath()
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.closePath()
        if(colision){
            ctx.fillStyle = 'gray';
            //lixo saltar
            ctx.fillRect(trash[indexColision].x, trash[indexColision].y, trash[indexColision].w, trash[indexColision].h)
            if(!trash[indexColision].ground){
                trash[indexColision].y += 0.1
                let finishPath = Math.floor((Math.random()*(H + 8*H/10))-(8*H/10))
                if(trash[indexColision].y >= finishPath) trash[indexColision].ground = true, colision = false
                if(colisionPlayer) playerBag.push(trash[indexColision])//player
            }
        }
    }
}
//fazer ricochet
class Shot {
    constructor (h, img){
        this.h = h;
        this.w = h;
        this.img = img;
        this.x = xp;
        this.y = yp;
    }
    update() {
        ////SHHOT
        if (startShoot){
            ctx.fillStyle = "green"
            ctx.fillRect(this.x, this.y, sizeRock, sizeRock)
            this.x += this.dx
            this.y += this.dy 
            this.dy += 0.05
            shot.checkColison()
            if (this.y >= yp + 50 || colision){
                startShoot = false  
                sizeRock = Math.floor(Math.random()* (18 - 10)+10)           
            }
        }
    }
    //shots calcuations
    shotsCalculator (xr, yr){
        if (!(startShoot)){
            angle = Math.atan2(yr - yp, xr-xp)
            startShoot = true;

            scale = (Math.sqrt((Math.pow(yp-yr, 2) + Math.pow(xp-xr, 2))))/40;
            if(scale >= 7.7 && !easterEgg) scale = 8
            else if(easterEgg) scale = scale * 5

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
            let wobble = 0
            if(scale > 8){
                wobble = Math.random() * (0.02 - (-0.02))
            }
            this.dx = scale*Math.cos(angle + wobble)
            this.dy = scale*Math.sin(angle + wobble)
        }
    }
    checkColison(){
        for(let i = 0; i < trash.length; i++){
            if (this.x + sizeRock < trash[i].x ||
                this.x > trash[i].x + trashSize ||
                this.y + sizeRock < trash[i].y ||
                this.y > trash[i].y + trashSize ||
                trash[i].ground == true){
            } else {
                colision = true;
                indexColision = i
                break
            }
        };
    }
}
class Trees {
    img = new Image();
    constructor(h, img, x, y){
        this.h = h;
        this.w = 2*h/3;
        this.img.src = img;
        this.x = x;
        this.y = y;
        this.hwMin = x+ 2*this.w/11;
        //console.log(h, this.h);
        this.hwMax = this.w - 3*this.w/10;
        this.hhMin = y + this.h/10;
        this.hhMax = h- 4*this.h/11;
    }
    update(){
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}

//player position and atributes
let xp = 100, yp = 800, w= 50, h= 70, pMovement = 1.3;
//keys
let rightKey = false, leftKey = false, upKey = false, downKey = false, fleft = false, spaceKey = false, easterEgg = false;
//shot
let sizeRock = Math.floor(Math.random()* (15 - 10)+10), shot = new Shot(sizeRock, 'green');
//calculate Shots
let angle, startShoot = false, scale;
//trash
let trash = [], trashSize = Math.floor(Math.random()*(40 - 25) + 25);
//checkColisons
let colision = false, indexColision, colisionPlayer = false, xrSpace, yrSpace;
//arvores
let trees = []


//keys EVENTS
window.addEventListener('keydown', e => {
    if (e.key == 'ArrowRight' || e.keyCode == 68) rightKey = true, fleft = false;
    if (e.key == 'ArrowLeft' || e.keyCode == 65) leftKey = true, fleft = true;
    if (e.key == 'ArrowDown' || e.keyCode == 83) downKey = true;
    if (e.key == 'ArrowUp' || e.keyCode == 87) upKey = true;
    if (e.keyCode == 32){
        spaceKey = true;
        shot.shotsCalculator(xrSpace, yrSpace)
    }
    if(e.keyCode == 85){
        if(!easterEgg){
            easterEgg = true;
        } else {
            easterEgg = false;
        } 
    }
    e.preventDefault();
});
window.addEventListener('keyup', e => {
    if (e.key == 'ArrowRight' || e.keyCode == 68) rightKey = false;
    if (e.key == 'ArrowLeft' || e.keyCode == 65) leftKey = false;
    if (e.key == 'ArrowDown' || e.keyCode == 83) downKey = false;
    if (e.key == 'ArrowUp' || e.keyCode == 87) upKey = false;
    if (e.keyCode == 32) spaceKey = false;
});
//canvas EVENTS
canvas.addEventListener('click', e => {
    let xr = e.offsetX; let yr = e.offsetY;
    shot.shotsCalculator(xr, yr)
}) 
canvas.addEventListener('mousemove', e => {
    xrSpace = e.offsetX; yrSpace = e.offsetY;
})

//function
function trashRender(){
    //escolher arvore
    trees.forEach((tree) => {
        //criar lixo na arvore, x vezes
        console.log(tree.x, tree.hwMin);
        let nTimes = Math.floor(Math.random()*(6 - 2)+ 2)
        for (let i = 0; i < nTimes; i++){
            let x = Math.random() * (tree.hwMax- trashSize)+ tree.hwMin // [MIN;MAX] = MIN + random*(MAX-ITEM)
            let y = Math.random() * (tree.hhMax- trashSize) + tree.hhMin
            trash.push(new Prop(trashSize, 'black', 'metal', 'trash', x, y))
        }
    })
    
}
function treesRender(){
    let tree ={}
    let nTimes = Math.floor(Math.random()*(6 - 3)+ 3) //HOW MANY TIMES
    if(nTimes > 4) nTimes = 4; //fazer mais provavel que sejam 4 arvores
    let spaceTree = Math.floor(W/nTimes)
    for(let i = 1; i <= nTimes; i++){
        let sizes = Math.floor(Math.random() * (8*H/10 - 7*H/10) + 7*H/10)
        let x = Math.floor(Math.random()*(spaceTree*i - spaceTree*(i-1)) + spaceTree*(i-1));
        let y = Math.floor(Math.random()*(9*H/10 - 2*H/10)+2*H/10);
        tree = new Trees(sizes, '..\\media/pixel-tree1.png', x, y)
        
        //se estiver fora do espaço delimitado para ele
        if(tree.x + tree.w > spaceTree*i){
            let diference = (tree.x + tree.w) - spaceTree*i
            tree.x = tree.x - diference, tree.hwMin = tree.hwMin - diference
        } 
        if(tree.y + tree.h > 8*H/10) {
            let diference = (tree.y + tree.h) - 8*H/10
            tree.y = tree.y - diference, tree.hhMin = tree.hhMin - diference
        }
        trees.push(tree)
    }}
//trash placement calculator

trees.forEach((tree)=>{ tree.update() })
treesRender()
trashRender()

function render() {
    //clear the Canvas
    ctx.clearRect(0, 0, W, H);
    
    trees.forEach((tree)=>{ tree.update() })
    trash.forEach((prop) => { prop.update() })
    shot.update()
    
    //player boundering
    if (rightKey && xp + w < W) xp+=pMovement;
    if (leftKey && xp > 0) xp-=pMovement;
    if (downKey && yp + h < H) yp+=pMovement;
    if (upKey && yp + h > 8*H/10) yp-=pMovement;
    //player
    ctx.fillStyle = 'blue';
    ctx.fillRect(xp,yp,w,h)    

    window.requestAnimationFrame(render);
}
window.onload = render;