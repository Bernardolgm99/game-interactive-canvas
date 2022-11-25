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

const player = JSON.parse(localStorage.getItem("player"))
player.bag.forEach((prop) => {
    props.push(new Prop(prop.h, prop.w, prop.src, prop.type, H, W, ctx))
})

dragAndDropGame()
//GAME PLAY
function dragAndDropGame() {
    //CONFIG DEFINITIONS
    missSound.volume = +localStorage.getItem("volume")
    successSound.volume = 0.25 * +localStorage.getItem("volume")


    //ECOPOINTS
    ecopoints.push(new EcoPoint(100 + 100, 270, 150, 180, `..\\media\\props\\trashBinYellow.png`, 'metal', 'metalEcoPoint', ctx))
    ecopoints.push(new EcoPoint(100 + 400, 270, 150, 180, `..\\media\\props\\trashBinBlue.png`, 'paper', 'paperEcoPoint', ctx))
    ecopoints.push(new EcoPoint(100 + 700, 270, 150, 180, `..\\media\\props\\trashBinGreen.png`, 'glass', 'glassEcoPoint', ctx))
    ecopoints.push(new EcoPoint(100 + 1000, 270, 150, 180, `..\\media\\props\\trashBin.png`, 'other', 'othersEcoPoint', ctx))

    //FIRST DRAW
    background.onload = () => ctx.drawImage(background, 0, 0, W, H)
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
    ctx.drawImage(background, 0, 0, W, H)
    /*     ctx.font = "20px Georgia";
        ctx.fillText(`Points: ${playerDragInDrop.score}`, 10, 30);
        ctx.font = "20px Georgia";
        ctx.fillText(`Trash Count: ${playerDragInDrop.bag.length}`, 10, 60); */
    ecopoints.forEach((ecopoint) => {
        ecopoint.update()
    })
    props.forEach((prop) => {
        prop.update()
    })
    if (!props.length) {
        if (JSON.parse(localStorage.getItem("chosenProps")).find((prop) => prop.validate == true)) {
            ctx.font = "150px Comic Sans MS"
            ctx.fillStyle = "white"
            ctx.textAlign = "center"
            ctx.fillText("WELL DONE", W / 2, H / 2 - 20)
            player.bag = []
            localStorage.setItem("player", JSON.stringify(player))
            setTimeout(() => { document.location = "./openWorld.html" }, 2000)
        } else {
            ctx.font = "80px Comic Sans MS"
            ctx.fillStyle = "white"
            ctx.textAlign = "center"
            ctx.fillText(`Pontuação final: ${player.score}`, W / 2, H / 2 - 20)
            localStorage.removeItem("player")
            localStorage.removeItem("tree")
            localStorage.removeItem("chosenProps")
            setTimeout(() => { document.location = "./index.html" }, 2000)
        }
    }
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
            if (ecopoint.type == prop.type) {
                props.pop()
                player.score += 100
                successSound.currentTime = 0
                successSound.play()
            }
            else {
                ecopoint.shake = true
                let shake = setInterval(() => { render() }, 40)
                player.score -= 10
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