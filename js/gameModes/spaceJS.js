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
            console.log(trash[indexColision])
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
            if (this.y >= yp + 70 || colision){
                startShoot = false  
                sizeRock = Math.floor(Math.random()* (18 - 10)+10)           
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
            if(scale > 5){
                wobble = Math.random() * (0.07 - (-0.07))
            }
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
    constructor(h, img, x, y){
        this.h = h;
        this.w = 2*h/3;
        this.img = img;
        this.x = x;
        this.y = y;
    }
    render(){
        ctx.fillStyle = this.img;
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.closePath()
    }
}

//player position and atributes
let xp = 100, yp = 800, w= 50, h= 70;
//keys
let rightKey = false, leftKey = false, upKey = false, downKey = false, fleft = false, spaceKey = false, easterEgg = false;
//calculate Shots
let angle, startShoot = false, scale;
//trash
let trash = [], quantity = 10;
//shot
let sizeRock = Math.floor(Math.random()* (15 - 10)+10)
let shot = new Shot(sizeRock, sizeRock, 'green')
//checkColisons
let colision = false, indexColision, colisionPlayer = false;
let size = Math.floor(Math.random() * (50 - 20) + 20), ground = false
let xrSpace, yrSpace;
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

let trashSize = 50;
function trashRender(){
    //escolher arvore
    trees.forEach((tree) => {
        //criar lixo na arvore, x vezes
        let nTimes = Math.floor(Math.random()*(6 - 2)+ 2)
        for (var i = 0; i < nTimes; i++){
            let x = tree.x + Math.random() * (tree.w- trashSize) // [MIN;MAX] = MIN + random*(MAX-MIN)
            let y = tree.y + Math.random() * (tree.h- trashSize)
            trash.push(new Prop(trashSize, 'black', 'metal', 'trash', x, y))
        }
        //x && y, de momento aparece aleatoriamente no canvas
        //
    })
    
}
let oldTree = {}, tree ={}
function treesRender(){
    /* let nTimes = Math.floor(Math.random()*(4 - 2)+ 2) //HOW MANY TIMES */
    let nTimes = 2
    for(let i = 0; i <= nTimes; i++){
        let sizes = Math.random() * (8*H/10 - 7*H/10) + 7*H/10
        x = Math.floor(Math.random()*W);
        y = Math.floor(Math.random()*(9*H/10 - 2*H/10)+2*H/10);
        tree = new Trees(sizes, 'red', x, y)
        trees.push(tree)

        //check positions
        trees.forEach((tree)=>{
            console.log(tree, oldTree)
        //se estiver fora do canvas
            if(tree.x + tree.w > W){
                let diference = (tree.x + tree.w) - W
                tree.x = tree.x - diference
            } 
            if(tree.y + tree.h > 8*H/10) {
                let diference = (tree.y + tree.h) - 8*H/10
                tree.y = tree.y - diference
            }
        //se estiver em cima de outra
            if(trees.length > 1){
                if(tree.x + tree.w > oldTree.x){
                    let diference = (tree.x + tree.w) - oldTree
                    tree.x = tree.x - diference
                } 
            }
            oldTree = tree
            oldTree.img = 'gray'
            /* if(tree.x > 0 || tree.x + tree.w > W ||
               tree.y > 0 || tree.y + tree.h > H){
                console.log('error')
                x = Math.floor(Math.random()*W) - this.w;
                y = Math.floor(Math.random()*9*H/10) - this.h;
            } */
            /* else {
                ctx.fillStyle = 'green'
                ctx.fillRect(this.x, this.y, this.h, this.w) 
            } */
            
            /* if (tree.x + tree.w < oldTree.x ||
                tree.x > oldTree.x + oldTree.w ||
                tree.y + tree.h < oldTree.y ||
                tree.y > oldTree.y + oldTree.h){
            } else {
                console.log(nTimes, 'tree colision detected')
            } */
        })
    }
        
}
//trash placement calculator

treesRender()
trashRender()

function render() {
    //clear the Canvas
    ctx.clearRect(0, 0, W, H);

    trees.forEach((tree)=>{ tree.render() })
    trash.forEach((prop) => { prop.update() })
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