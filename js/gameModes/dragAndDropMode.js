//EXPORTS
import * as Prop from "../class/propClass.js"
import * as EcoPoint from "../class/ecoPointClass.js"


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

//FEEDING CLASS
Prop.canvasInfo(ctx,H,W)
EcoPoint.canvasInfo(ctx,H,W)

//TEST OBJECTS
ecopoints.push(EcoPoint.createEcoPoint(10, 10, 100, 100, `..\\media\\props\\plasticBleach.png`, 'metal', 'metalEcoPoint'))
ecopoints.push(EcoPoint.createEcoPoint(200, 10, 100, 100, `..\\media\\props\\plasticBleach.png`, 'papel', 'metalEcoPoint'))

props.push(Prop.createProp(50, 50, `..\\media\\props\\glassWineFull.png`, "vidro", "trash"))
props.push(Prop.createProp(50, 50, `..\\media\\props\\metalCanSoda.png`, "metal", "can"))
props.push(Prop.createProp(50, 50, `..\\media\\props\\plasticPop4.png`, "papel", "trash"))
props.push(Prop.createProp(50, 50, `..\\media\\props\\plasticBleach.png`, "outros", "trash"))

ecopoints.forEach((ecopoint) => {
    ecopoint.draw()
})
props.forEach((prop) => {
    prop.draw()
})

//FUNCTION
function render() {
    ctx.clearRect(0, 0, W, H)
    ecopoints.forEach((ecopoint) => {
        ecopoint.update()
    })
    props.forEach((prop) => {
        prop.update()
    })
}

function draging(e, object) {
    object.x = e.offsetX - object.w / 2
    object.y = e.offsetY - object.h / 2
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

// EVENTS
canvas.addEventListener('mousedown', (e) => {
    if (verifyObjectHover(e, props))
        propMoving = verifyObjectHover(e, props)
    propMoving.h = propMoving.h * 1.5
    propMoving.w = propMoving.w * 1.5
    propMoving.x = e.offsetX - (propMoving.w / 2)
    propMoving.y = e.offsetY - (propMoving.h / 2)
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
    propMoving.h = propMoving.h / 1.5
    propMoving.w = propMoving.w / 1.5
    propMoving = {}
    render()
    isMoving = false;
});

window.addEventListener('mouseup', () => {
    propMoving.w = propMoving.w / 1.5
    propMoving.h = propMoving.h / 1.5
    propMoving.x += propMoving.w / 3
    propMoving.y += propMoving.h / 3
    correctPosition(propMoving, ecopoints)
    if (propMoving)
        propMoving = {}
    render()
    isMoving = false;
});