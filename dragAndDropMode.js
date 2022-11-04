//GLOBALS
const canvas = document.querySelector('#myCanvas');
canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid';
const ctx = canvas.getContext("2d");
const W = canvas.width, H = canvas.height;
let isMoving = false;
let ecopoints = [];
let props = []; // props array of objects
let propMoving = {};



//CLASS

class Prop {
    constructor(h, w, img, type, name) {
        this.h = h;
        this.w = w;
        this.img = img;
        this.type = type;
        this.name = name;
        this.x = Math.floor(Math.random() * (W - this.h));
        this.y = Math.floor(Math.random() * (H - this.w));
    }
    draw() {
        ctx.fillStyle = this.img
        ctx.beginPath()
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.closePath()
    }
    update() {
        ctx.clearRect(this.x, this.y, this.w, this.h)
        ctx.fillStyle = this.img
        ctx.beginPath()
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.closePath()
    }
}

class EcoPoint {
    constructor(x, y, w, h, img, type, name) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.img = img
        this.type = type
        this.name = name
    }
    draw() {
        ctx.fillStyle = this.img
        ctx.beginPath()
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.closePath()
    }
}



//FUNCTION

function render() {
    ctx.clearRect(0, 0, W, H)
    ecopoints.forEach((ecopoint) => {
        ecopoint.draw()
    })
    props.forEach((prop) => {
        prop.update()
    })
}

function draging(e, object) {
    object.x += e.movementX
    object.y += e.movementY
}

function verifyObjectHover(e, objects) {
    for (let i = objects.length - 1; i >= 0; i--) { // take the object who is the highlight layer
        if (((objects[i].x < e.offsetX) && (e.offsetX < objects[i].x + objects[i].w)) && ((objects[i].y < e.offsetY) && (e.offsetY < objects[i].y + objects[i].h))) {
            objects.push(objects.splice(i, 1)[0]) // reorganize the array, for draw the object was moved later in first layer
            return objects[objects.length - 1] // return object who was draged
        }
    }
    return false
}

function correctPosition(prop, ecopoints) {
    ecopoints.forEach((ecopoint) => {
        if ((ecopoint.x < prop.x) && (ecopoint.y < prop.y) && (ecopoint.x + ecopoint.w > prop.x + prop.w) && (ecopoint.y + ecopoint.h > prop.y + prop.h))
            if (ecopoint.type == prop.type)
                props.pop()
            else
                console.log("tente novamente");
    })
}



//TEST OBJECTS
ecopoints.push(new EcoPoint(10, 10, 100, 100, 'black', 'metal', 'metalEcoPoint'))
ecopoints.push(new EcoPoint(200, 10, 100, 100, 'grey', 'papel', 'metalEcoPoint'))

props.push(new Prop(50, 50, "blue", "vidro", "trash"))
props.push(new Prop(50, 50, "red", "metal", "can"))
props.push(new Prop(50, 50, "yellow", "papel", "trash"))
props.push(new Prop(50, 50, "green", "outros", "trash"))

render()



// EVENTS

canvas.addEventListener('mousedown', (e) => {
    if (verifyObjectHover(e, props))
        propMoving = verifyObjectHover(e, props)
    propMoving.h = propMoving.h * 1.1
    propMoving.w = propMoving.w * 1.1
    render()
    isMoving = true;
});
canvas.addEventListener('mousemove', (e) => {
    if (isMoving) {
        draging(e, propMoving)
        render()
    }
});
canvas.addEventListener('mouseout', () => {
    propMoving.h = propMoving.h / 1.1
    propMoving.w = propMoving.w / 1.1
    propMoving = {}
    render()
    isMoving = false;
});
window.addEventListener('mouseup', () => {
    propMoving.h = propMoving.h / 1.1
    propMoving.w = propMoving.w / 1.1
    correctPosition(propMoving, ecopoints)
    if (propMoving)
        propMoving = {}
    render()
    isMoving = false;
});