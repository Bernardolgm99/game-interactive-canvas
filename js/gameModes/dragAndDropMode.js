//EXPORTS
import Prop from "../class/propClass.js"
import EcoPoint from "../class/ecoPointClass.js"


//SOUNDS
const missSound = new Audio ("../media/sound/miss.mp3")
const successSound = new Audio ("../media/sound/success.mp3")

//GLOBALS
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
const W = canvas.width, H = canvas.height;
let isMoving = false;
let ecopoints = [];
let props = []; // props array of objects
let propMoving = {};
let background = new Image()
background.src = "../media/bg/trashBackGround.png";
background.width = W;
background.height = H;
//GAME PLAY
export default function dragAndDropGame() {
    //CONFIG DEFINITIONS
    console.log(localStorage.getItem('volume'));
    missSound.volume = +localStorage.getItem("volume")
    successSound.volume = 0.25 * +localStorage.getItem("volume")

    let player = JSON.parse(localStorage.getItem('player'))
    
    //TEST OBJECTS
    
    // props = player.h
    ecopoints.push(new EcoPoint(100+100, 270, 150, 180, `..\\media\\props\\trashBinYellow.png`, 'metal', 'metalEcoPoint', ctx))
    ecopoints.push(new EcoPoint(100+400, 270, 150, 180, `..\\media\\props\\trashBinBlue.png`, 'paper', 'paperEcoPoint', ctx))
    ecopoints.push(new EcoPoint(100+700, 270, 150, 180, `..\\media\\props\\trashBinGreen.png`, 'glass', 'glassEcoPoint', ctx))
    ecopoints.push(new EcoPoint(100+1000, 270, 150, 180, `..\\media\\props\\trashBin.png`, 'others', 'othersEcoPoint', ctx))

    props.push(new Prop(50, 50, "..\\media\\props\\glassWineFull.png", "glass", "trash", H, W, ctx))
    props.push(new Prop(50, 50, "..\\media\\props\\metalCanSoda.png", "metal", "can", H, W, ctx))
    props.push(new Prop(50, 50, "..\\media\\props\\plasticPop4.png", "metal", "trash", H, W, ctx))
    props.push(new Prop(50, 50, "..\\media\\props\\plasticBleach.png", "metal", "trash", H, W, ctx))
    localStorage.setItem('player', JSON.stringify({name:"JOHN DOE", point: 100, bag: props}))


    //FIRST DRAW
    ecopoints.forEach((ecopoint) => {
        ecopoint.draw()
    })
    props.forEach((prop) => {
        prop.draw()
    })
}

//FUNCTION
function render() {
    ctx.clearRect(0, 0, W, H)
    ctx.fillRect(0, 0, W, H)
    ctx.drawImage(background,0,0,W,H)
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
            if (ecopoint.type == prop.type){
                props.pop()
                successSound.currentTime = 0
                successSound.play() 
            }
            else {
                ecopoint.shake = true
                let shake = setInterval(() => { render() }, 40)
                missSound.currentTime = 0
                missSound.play() 
                setTimeout(() => { clearTimeout(shake); ecopoint.shake = false }, 300)
            }
    })
}

function verifyObjectInRange(propMoving) {
    if (propMoving.x < 0)
        propMoving.x = 0
    if (propMoving.x > W - propMoving.w)
        propMoving.x = W - propMoving.w
    if (propMoving.y < 0)
        propMoving.y = 0
    if (propMoving.y > H - propMoving.h)
        propMoving.y = H - propMoving.h
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
    verifyObjectInRange(propMoving)
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
    verifyObjectInRange(propMoving)
    if (propMoving)
        propMoving = {}
    render()
    isMoving = false;
});

render()