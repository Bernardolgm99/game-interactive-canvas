import dragAndDropGame from "../js/gameModes/dragAndDropMode.js"




//Sounds
localStorage.setItem("volume", JSON.stringify(1))

const soundEffectMenu = new Audio("../media/sound/oneBeep.mp3");
let clickSound = (e) => {
    if ((e.keyCode >= 37 && e.keyCode <= 40) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode == 13))
        soundEffectMenu.currentTime = 0; soundEffectMenu.play();
}


//Create Canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
zeroCanvas();

menu();

function menu() {
    zeroCanvas();
    let actionButton = document.querySelectorAll("span, button")
    actionButton.forEach((btn) => btn.addEventListener("click", () => {
        soundEffectMenu.currentTime = 0; soundEffectMenu.play();
    }))
    document.addEventListener("keydown", clickSound) 
}

function zeroCanvas() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas.style.display = "none";
}








//EVENTS LISTENERS

//Start Button
document.getElementById("start").addEventListener('click', () => {
    setTimeout(() => {
        document.getElementById('userNameModal').showModal();
    }, 1000);
})

//Cancel Start Button
document.querySelectorAll(".cancel").forEach((btn) => {
    btn.addEventListener('click', () => {
        setTimeout(() => {
            canvas.style.display = "none";
        }, 500);
    })
})

//Create User
document.getElementById("confirm").addEventListener('click', () => {
    document.removeEventListener("keydown", clickSound)
    const userName = document.getElementById('userName').value;
    canvas.style.display = "";
    setTimeout(() => {
        dragAndDropGame();
    }, 500);
})

//
document.getElementById('options').addEventListener('click', () => {
    setTimeout(() => {
        document.getElementById('optionModal').showModal();
    }, 500);
})

document.getElementById('confirmOptions').addEventListener('click', () => {
    const volume = document.getElementById('volume');
    soundEffectMenu.volume = volume.value;
    localStorage.setItem('volume', volume.value)
})