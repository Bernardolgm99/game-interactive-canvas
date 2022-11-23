import Prop from '../class/propClass.js'

const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

//GLOBALS
//add dash
//update backgrounds
//trash img
//player sprites
//last checks
class PropSpace {
    constructor(h, img, type, name, x, y) {
        this.h = h;
        this.w = h;
        this.img = img;
        this.type = type;
        this.name = name;
        this.ground = false;
        this.colisionPlayer = false;
        this.x = x;
        this.y = y;
        this.fall = false
    }
    update() {
        ctx.clearRect(this.x, this.y, this.w, this.h)
        ctx.fillStyle = this.img
        ctx.beginPath()
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.closePath()
        if(colision){
            if (this.fall){
                ctx.fillStyle = 'gray';
                let finishPath = yp + trashSize
                ctx.fillRect(this.x, this.y, this.w, this.h)
                if(!this.ground){
                    this.x += this.dx
                    this.y += this.dy 
                    this.dy += 0.05
                    if (this.x + this.w < W || this.x < 0){
                    } else {this.dx = -this.dx;}
                    if (this.x + this.w > W || this.x > 0){
                    } else {this.dx = -this.dx;}
                    this.colPlayer()
                    if(this.y >= finishPath || this.colisionPlayer) this.ground = true, colision = false;
                    if(this.colisionPlayer && this.ground) this.colisionPlayer = false;
                }
            }
        }
    }
    colPlayer(){
        for(let i = 0; i < trash.length; i++){
            if (xp + w < this.x || xp > this.x + trashSize || yp + w < this.y || yp > this.y + trashSize){
            } else {this.colisionPlayer = true; break;}
        };
        if(this.colisionPlayer){
            playerBag.push(new Prop(this.h, this.w, this.img, this.type, this.name, H, W, ctx));
            this.removeTrash()//remove trash
        }
        //points
        if(this.colisionPlayer && !this.ground){
            points += Math.round(yp-this.y)*5
        } 
        if(this.colisionPlayer && this.ground){
            points += Math.round(-((yp-this.y)/3))*5
        }
    }
    calculateTrag(dx, dy){
        this.dx = dx/4
        this.dy = 3*dy/4
    }
    removeTrash(){
        for( let i = 0; i < trash.length; i++){
            if(trash[i] == this){
                trash.splice(i, 1);
                break;}
        }
    }
}
//fazer ricochet nas paredes
class Shot {
    shotImg = new Image();
    constructor (h, img){
        this.h = h;
        this.w = h;
        this.shotImg.src = img;
        this.shotImg.width = h
        this.shotImg.height = h
        this.x = xp;
        this.y = yp;
        this.rotation = 0;
    }
    update() {
        //SHHOT
        if (startShoot){
            //change rotation
            this.rotation += 0.05
            ctx.save()
            ctx.translate(this.x+this.w/2, this.y+this.h/2)
            ctx.rotate(this.rotation)
            ctx.drawImage(this.shotImg, -this.w/2, -this.h/2, this.w, this.h)
            ctx.restore()
            this.x += this.dx
            this.y += this.dy
            this.dy += 0.05
            shot.checkColison()
            //add colisions walls canvas
            if (this.x + this.w < W || this.x < 0){
            } else {this.dx = -this.dx;}
            if (this.x + this.w > W || this.x > 0){
            } else {this.dx = -this.dx;}
            if (this.y >= yp + 50 || colision){
                startShoot = false;
                dashAvailabe = false; 
                sizeRock = Math.floor(Math.random()* (25 - 15)+15)           
            }
        }
    }
    //shots calcuations
    shotsCalculator (xr, yr){
        if (!(startShoot)){
            angle = Math.atan2(yr - yp, xr-xp)
            startShoot = true;
            dashAvailabe = true;

            scale = (Math.sqrt((Math.pow(yp-yr, 2) + Math.pow(xp-xr, 2))))/40;
            if(scale >= 7.7 && !easterEgg) scale = 8
            else if(easterEgg) scale = scale * 2

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
                trash[i].calculateTrag(this.dx, this.dy)
                trash[i].fall =true
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
        this.hwMax = this.w - 3*this.w/10;
        this.hhMin = y + this.h/10;
        this.hhMax = h- 4*this.h/11;
    }
    update(){
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}

//player position and atributes
let xp = 100, yp = 700, w= 50, h= 70, pMovement = 1.3, playerBag = [], points = 0;
//keys
let rightKey = false, leftKey = false, upKey = false, downKey = false, fleft = false, spaceKey = false, easterEgg = false;
//shot
let sizeRock = Math.floor(Math.random()* (25 - 15)+15), shot = new Shot(sizeRock, '../../media/rock.png');
//calculate Shots
let angle, startShoot = false, dashAvailabe = false, scale;
//trash
let trash = [], trashSize, bgGround =  new Image(), numTrash = 10;
//checkColisons
let colision = false, xrSpace, yrSpace;//colisionPlayer = false
//arvores
let trees = []

//keys EVENTS
window.addEventListener('keydown', e => {
    if (e.key == 'ArrowRight' || e.keyCode == 68) rightKey = true, fleft = false, checkGround();
    if (e.key == 'ArrowLeft' || e.keyCode == 65) leftKey = true, fleft = true, checkGround();
    if (e.key == 'ArrowDown' || e.keyCode == 83) downKey = true, checkGround();
    if (e.key == 'ArrowUp' || e.keyCode == 87) upKey = true, checkGround();
    if (e.keyCode == 32) spaceKey = true; dashAvailabe == true;
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
    if (e.key == 'ArrowRight' || e.keyCode == 68) rightKey = false, checkGround();
    if (e.key == 'ArrowLeft' || e.keyCode == 65) leftKey = false, checkGround();
    if (e.key == 'ArrowDown' || e.keyCode == 83) downKey = false, checkGround();
    if (e.key == 'ArrowUp' || e.keyCode == 87) upKey = false, checkGround();
    if (e.keyCode == 32) spaceKey = false, dashAvailabe = false;
});
//canvas EVENTS
canvas.addEventListener('click', e => {
    let xr = e.offsetX; let yr = e.offsetY;
    console.log(xr, yr, xp, yp)
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
        let nTimes = Math.floor(Math.random()*(4 - 2)+ 2)
        if(trash.length <= numTrash) {
            for (let i = 0; i < nTimes; i++){
                trashSize = Math.floor(Math.random()*(45 - 35) + 35)
                let x = Math.random() * (tree.hwMax- trashSize)+ tree.hwMin // [MIN;MAX] = MIN + random*(MAX-ITEM)
                let y = Math.random() * (tree.hhMax- trashSize) + tree.hhMin
                //check trash colision
                trash.forEach(garbage => {
                    if (x + trashSize < garbage.x || x > garbage.x + garbage.w || y + trashSize < garbage.y || y > garbage.y + garbage.h){
                    } else {
                        x = Math.random() * (tree.hwMax- trashSize)+ tree.hwMin
                        y = Math.random() * (tree.hhMax- trashSize) + tree.hhMin
                    }
                })
                trash.push(new PropSpace(trashSize, 'black', 'metal', 'trash', x, y))
            }
        }
    })
    
}
function checkGround(){
    trash.forEach(garbage => {
        garbage.colPlayer()
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
treesRender()
trashRender()

function render() {
    //clear the Canvas
    ctx.clearRect(0, 0, W, H);
    //ground
    ctx.fillStyle = 'rgb(80,155,102)'
    ctx.fillRect(0, 670, W, H)
    //points and trash number display
    ctx.font = "20px Georgia";
    ctx.fillText(`Points: ${points}`, 10, 30);
    ctx.font = "20px Georgia";
    ctx.fillText(`Trash Count: ${playerBag.length}`, 10, 60);
    //render trees
    trees.forEach((tree)=>{ tree.update() })
    //ground
    bgGround.src = '../../media/groundSpace.png';
    ctx.drawImage(bgGround, 0, 690)
    //render shot
    shot.update()
    //render trash
    trash.forEach((prop) => { prop.update() })
    //player boundering;
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