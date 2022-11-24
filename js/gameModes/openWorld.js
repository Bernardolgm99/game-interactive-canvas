//CANVAS INIT
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

//CANVAS HEIGHT/WIDTH
let W = canvas.width
let H = canvas.height

//COORDINATES TO MOVE THE IMAGE
let imgX = 370
let imgY = 0

//SOUND
const bg_music = new Audio ("../media/sound/bg_music.mp3")
bg_music.volume = 0.1
bg_music.play()

//PROPS
let chosenProps = []
let randomProp
let props = [{id:1, name: `metalCanSoda`, img: `/media/props/glass01.png`, propX: 300, propY: 550, validate: false},
             {id:2, name: `plasticBleach`, img: `/media/props/glass02.png`, propX: 1200, propY: 500, validate: false},
             {id:3, name: `plasticPop`, img: `/media/props/glass03.png`, propX: 1500, propY: 500, validate: false},
             {id:4, name: `glassWine`, img: `/media/props/glass04.png`, propX: -475, propY: 485, validate: false},
             {id:5, name: `metalCanSoda1`, img: `/media/props/glass05.png`, propX: -650, propY: 825, validate: false},
             {id:6, name: `plasticPop1`, img: `/media/props/metal01.png`, propX: -450, propY: 1250, validate: false},
             {id:7, name: `glassWine1`, img: `/media/props/metal02.png`, propX: -700, propY: 1600, validate: false},
             {id:8, name: `plasticBleach1`, img: `/media/props/metal03.png`, propX: 300, propY: 900, validate: false},
             {id:9, name: `glassWine2`, img: `/media/props/metal04.png`, propX: 575, propY: 1300, validate: false},
             {id:10, name: `plasticBleach2`, img: `/media/props/metal05.png`, propX: 850, propY: 1650, validate: false},
             {id:11, name: `metalCanSoda2`, img: `/media/props/other01.png`, propX: 1350, propY: 1225, validate: false}
            ]
/* let test1 = {name: 'test', img: `/media/props/metal04.png`, propX: 1350, propY:1225} */
let propName


//ORIGINAL IMAGE HEIGHT/WIDTH
let imgH
let imgW

//CHARACTER INITIAL POSITION
let characterX = 690
let characterY = 300 
let speed = 4

//DIMENSIONS
let dimensionX = 500
let dimensionY = 300

//PIXEL VARIABLE CHECK
let pixel

//SPRITE FRAME COUNTER
let frameIndex = 0
let animationFrameCount = 0

//SPRITE DIRECTIONS
let direction
let right = true
let left = false
let characterDimensions = 40

//LOCALSTORAGE INJECTION
let bag
let tree
let score

//MAP SQUARES
let xPosition = 265
let yPosition = 550
let wSquare = 100
let hSquare = 70

//DATA INJECTION
injectData()

//IMPORTED IMAGES
let base_image = new Image();
let hitbox_image = new Image()
let character_right = new Image();
let character_left = new Image();
let character_right_walk = new Image();
let character_left_walk = new Image();
let backpack = new Image();
/* test1.name = new Image(); */
chosenProps.forEach(prop => {
    if(prop.validate == true){
        prop.name = new Image() 
    }
})

//WHOLE MAP INIT
base()

//IMAGE CREATION
function base(){
    base_image.src = `/media/map.png`; //MAIN BACKGROUND IMAGE
    hitbox_image.src = `/media/hitbox.png`; //HITBOX BACKGROUND IMAGE
    character_right.src = `/media/animation_player/static_right1.png`; //CHARACTER SPRITE
    character_left.src = `/media/animation_player/static_left1.png`; //CHARACTER SPRITE
    character_right_walk.src = `/media/animation_player/walk_right1.png`; //CHARACTER SPRITE
    backpack.src = `/media/props/backpack.png` //TRASH COUNT
    character_left_walk.src = `/media/animation_player/walk_left1.png`; //CHARACTER SPRITE
    direction = character_right
    chosenProps.forEach(prop => {
        if(prop.validate){
            prop.name.src = prop.img
        }
    }) 
/*     test1.name.src = test1.img */


    base_image.onload = function(){
        imgW = base_image.width
        imgH = base_image.height   
        // console.log(imgW, imgH); 
        // ctx.drawImage(base_image, imgX, imgY, dimensionX, dimensionY, 0, 0, 500, 500);
    }
}

//GET ALL THE DATA NEEDED
function injectData() {
    if(!localStorage.bag){
        bag = []
        localStorage.setItem('bag', JSON.stringify(bag))
        console.log('bag data injected')
    } else {
        bag = JSON.parse(localStorage.getItem('bag'))
    }
    
    if(!localStorage.tree){
        tree = 0
        localStorage.setItem('tree', JSON.stringify(tree))
        console.log('tree data injected')
    } else {
        tree = JSON.parse(localStorage.getItem('tree'))
    }

    if(!localStorage.score){
        score = 0
        localStorage.setItem('score', JSON.stringify(score))
        console.log('score data injected')
    } else {
        score = JSON.parse(localStorage.getItem('score'))
    }

    if(!localStorage.chosenProps){
        //RANDOM ITEMS
        for(let i = 0; i < 5; i++){
            
            randomProp = Math.floor(Math.random() * 11) + 1

            if(!chosenProps.find(prop => prop.id == randomProp)){
                props[randomProp-1].validate = true
                chosenProps.push(props[randomProp-1])
            } else {
                i--
            }
        }
        localStorage.setItem('chosenProps', JSON.stringify(chosenProps))
        console.log('trash data injected')
    } else {
        chosenProps = JSON.parse(localStorage.getItem('chosenProps'))
    }
}

window.onload = render()

//FUNCTION TO DRAW
function render() {
    // BACKGROUND 
    ctx.clearRect(0, 0, W, H)
    //base_image.src = `img/map.png`;
    //console.log(imgX, imgY)
    ctx.drawImage(base_image,  imgX, imgY, dimensionX, dimensionY, 0, 0, W, H);
    ctx.drawImage(backpack, 1275, 0, 100, 100);

/*     ctx.drawImage(test1.name, test1.propX, test1.propY) */
    
    chosenProps.forEach(prop => {
        if(prop.validate){
            // ctx.drawImage(prop.name, prop.propX, prop.propY, propDimensionX, propDimensionY, 0, 0, W, H)
            ctx.drawImage(prop.name, prop.propX, prop.propY)  
        }
    })
    
    //SPRITE
    ctx.drawImage(direction, frameIndex * 90/6, 0, 14, 23, characterX, characterY, characterDimensions, characterDimensions)

    //BAG TEXT
    ctx.fillText(`x${bag.length}`, 1375, 80)
    ctx.font = '30px IBM Plex Mono';
    ctx.fillStyle = 'white'

    //SOCRE TEXT
    ctx.fillText(`Score:${score}`, 20, 50)
    animationFrameCount++

    if(animationFrameCount % 6 == 0) {
        frameIndex++

        if(frameIndex == 6) {
            frameIndex = 0
        }
    }

    requestAnimationFrame(render);
}

// EVENTS - KEY  

//MOVES IMAGE
window.addEventListener('keydown', (event) => {
    
    //SWITCH CASE FOR EVERY ARROW KEY
    switch (event.keyCode){
        case 37:
            
            ctx.clearRect(0, 0, W, H)
            ctx.drawImage(hitbox_image, imgX, imgY, dimensionX, dimensionY, 0, 0, W, H)

            //PIXEL COLOR CHECK
            pixel = ctx.getImageData(characterX-4, characterY, characterDimensions, characterDimensions) 

            //PIXEL COLOR CHECK
              if(!pixelCheck(pixel.data, 0, 0, 0)){ //CHECK IF THE COLOR PIXEL COLOR IS BLACK
                if(!pixelCheck(pixel.data, 0, 255, 0)){ //CHECK IF THE COLOR PIXEL COLOR IS GREEN
                    if(!pixelCheck(pixel.data, 0, 0, 255)){ //CHECK IF THE COLOR PIXEL COLOR IS BLUE
                        if(characterX > H * 0.15){ //MAKES THE CHARACTER MOVE
                            characterX -= speed
                            direction = character_left_walk
                            right = false
                            left = true
                        } else {
                            if(imgX > 0){ //MOVE MAP
                                imgX -= speed/2
                                
                                chosenProps.forEach(prop => {
                                    prop.propX += speed*1.45
                                })
                                /* test1.propX += speed*1.45 */
                                direction = character_left_walk
                                right = false
                                left = true
                            } else if(imgX <= 0 && characterX > 0 && characterX != 0){ //THE CHARACTER MOVES ALONE ON THE EDGE
                                characterX -= speed
                                direction = character_left_walk
                                right = false
                                left = true
                            }
                        } 
                    }
                }
            } 
            //console.log('left')
            break;
        case 38: 
        ctx.clearRect(0, 0, W, H)
        ctx.drawImage(hitbox_image, imgX, imgY, dimensionX, dimensionY, 0, 0, W, H)

        //PIXEL COLOR CHECK
        pixel = ctx.getImageData(characterX, characterY-7, characterDimensions, characterDimensions) 

        //PIXEL COLOR CHECK
        if(!pixelCheck(pixel.data, 0, 0, 0)){ //CHECK IF THE COLOR PIXEL COLOR IS BLACK
            if(!pixelCheck(pixel.data, 0, 255, 0)){ //CHECK IF THE COLOR PIXEL COLOR IS GREEN
                if(!pixelCheck(pixel.data, 0, 0, 255)){ //CHECK IF THE COLOR PIXEL COLOR IS BLUE
                    if(characterY > (W * 0.15)){ //MAKES THE CHARACTER MOVE
                        characterY -= speed
                        if(right == true){
                            direction = character_right_walk
                        } else {
                            direction = character_left_walk
                        }
                    } else {
                        if(imgY > 0){ //MOVE MAP
                            imgY -= speed/2
                            chosenProps.forEach(prop => {
                                prop.propY += speed*1.43
                            })
                            /* test1.propY += speed*1.45 */
                            if(right == true){
                                direction = character_right_walk
                            } else {
                                direction = character_left_walk
                            }
                        } else if(imgY <= 0 && characterY > 0 && characterY != 0){ //THE CHARACTER MOVES ALONE ON THE EDGE
                            characterY -= speed
                            if(right == true){
                                direction = character_right_walk
                            } else {
                                direction = character_left_walk
                            }
                        }
                }
                }
            }
        }
        //console.log('up')
        break;
        case 39:
            ctx.clearRect(0, 0, W, H)
            ctx.drawImage(hitbox_image, imgX, imgY, dimensionX, dimensionY, 0, 0, W, H)

            //PIXEL COLOR CHECK
            pixel = ctx.getImageData(characterX+4, characterY, characterDimensions, characterDimensions) 

            //PIXEL COLOR CHECK
            if(!pixelCheck(pixel.data, 0, 0, 0)){ //CHECK IF THE COLOR PIXEL COLOR IS BLACK
                if(!pixelCheck(pixel.data, 0, 255, 0)){ //CHECK IF THE COLOR PIXEL COLOR IS GREEN
                    if(!pixelCheck(pixel.data, 0, 0, 255)){ //CHECK IF THE COLOR PIXEL COLOR IS BLUE
                        if(characterX < (W - (W * 0.15))){ //MAKES THE CHARACTER MOVE
                            characterX += speed
                            direction = character_right_walk
                            left = false
                            right = true
                        } else {
                            if(imgX + dimensionX < imgW){ //MOVE MAP
                                imgX += speed/2
                                chosenProps.forEach(prop => {
                                    prop.propX -= speed*1.45
                                })
                                /* test1.propX -= speed*1.45 */
                                direction = character_right_walk
                                left = false
                                right = true
                            } else if(imgX + dimensionX >= imgW && characterX < W && characterX != W){ //THE CHARACTER MOVES ALONE ON THE EDGE
                                characterX += speed
                                direction = character_right_walk
                                left = false
                                right = true
                            }
                        }
                    }
                }
            }
            //console.log('right')
        break;
        case 40:
                ctx.clearRect(0, 0, W, H)
                ctx.drawImage(hitbox_image, imgX, imgY, dimensionX, dimensionY, 0, 0, W, H)
                
                //PIXEL COLOR CHECK
                pixel = ctx.getImageData(characterX, characterY+7, characterDimensions, characterDimensions) 
                
                //PIXEL COLOR CHECK
                if(!pixelCheck(pixel.data, 0, 0, 0)){ //CHECK IF THE COLOR PIXEL COLOR IS BLACK
                    if(!pixelCheck(pixel.data, 0, 255, 0)){ //CHECK IF THE COLOR PIXEL COLOR IS GREEN
                        if(!pixelCheck(pixel.data, 0, 0, 255)){ //CHECK IF THE COLOR PIXEL COLOR IS BLUE
                            if(characterY < (H - (H * 0.15))){ //MAKES THE CHARACTER MOVE
                                characterY += speed
                                if(right == true){ 
                                    direction = character_right_walk
                                } else {
                                    direction = character_left_walk
                                }
                            } else {
                                if(imgY + dimensionY < imgH){ //MOVE MAP
                                    imgY += speed/2
                                    chosenProps.forEach(prop => {
                                        prop.propY -= speed*1.43
                                    })
                                    yPosition -= speed*1.25
                                    /* test1.propY -= speed*1.45 */
                                    if(right == true){
                                        direction = character_right_walk
                                    } else {
                                        direction = character_left_walk
                                    }
                                } else if(imgY + dimensionY >= imgH && characterY + characterDimensions < H && characterY != imgH){ //THE CHARACTER MOVES ALONE ON THE EDGE
                                    characterY += speed
                                    if(right == true){
                                        direction = character_right_walk
                                    } else {
                                        direction = character_left_walk
                                    }
                                }
                            }
                        }
                    }
                }
            //console.log('down')
        break;
        case 90: //'z' press
        
        //THE HITBOX WILL CHECK EVERY COLOR AROUND THE CHARACTER AND IF IT FINDS THE CORRESPONDING COLOR, IT INTERACTS WITH THE COLOR
        
        ctx.drawImage(hitbox_image, imgX, imgY, dimensionX, dimensionY, 0, 0, W, H)
            
            //PIXEL COLOR CHECK
            pixel = ctx.getImageData(characterX, characterY+25, 25, 25)
            if(pixelCheck(pixel.data, 0, 255, 0)){ //CHECK IF THE COLOR
                if(tree != 2){

                    let closestTrash = {propX:0, propY: 0}
                    let closestDist = Infinity

                    chosenProps.forEach(prop => {
                        if(prop.propY <= -characterY -225 && prop.propX <= -characterX -475){  
                            let dist = Math.sqrt(Math.pow((prop.propX - characterX), 2) + Math.pow((prop.propY - characterY), 2)) //COMPARES ALL THE PROOPS TO CHECK WHICH IS THE CLOSEST ONE
                            if( dist < closestDist){
                                closestDist =  dist
                                closestTrash = prop
                            }
                        }
                    })
                    tree+=1
                    chosenProps.forEach(chosenprop => {
                        if(chosenprop.id == closestTrash.id){
                            chosenprop.validate = false
                        }
                    })
                    //SAVE THE VARIABLE LOCALSTORAGE
                    localStorage.setItem('tree', JSON.stringify(tree))
                    localStorage.setItem('chosenProps', JSON.stringify(chosenProps))
                    location.href = './spaceIndex.html' 
                } else {
                    alert('SEPARA PRIMEIRO O LIXO ANTES DE APANHARES MAIS')
                }
            } else if(pixelCheck(pixel.data, 0, 0, 255)){
                if(bag.length == 0){
                    alert('BAG IS EMPTY')
                    break
                } else {
                    tree = 0

                    //SAVE THE VARIABLE LOCALSTORAGE
                    localStorage.setItem('tree', JSON.stringify(tree))
                    location.href = './drag-and-drop.html'
                }
                break
            }
            

            pixel = ctx.getImageData(characterX+40, characterY, 25, 25)
            if(pixelCheck(pixel.data, 0, 255, 0)){ //CHECK IF THE COLOR
                if(tree != 2){

                    let closestTrash = {propX:0, propY: 0}
                    let closestDist = Infinity

                    chosenProps.forEach(prop => {
                        if(prop.propX <= -characterX + 200){
                            let dist = Math.sqrt(Math.pow((prop.propX - characterX), 2) + Math.pow((prop.propY - characterY), 2)) //COMPARES ALL THE PROOPS TO CHECK WHICH IS THE CLOSEST ONE
                            if( dist < closestDist){
                                closestDist =  dist
                                closestTrash = prop
                            }
                        }})
                        tree+=1
                        chosenProps.forEach(chosenprop => {
                            if(chosenprop.id == closestTrash.id){
                                chosenprop.validate = false
                            }
                        })
                        //SAVE THE VARIABLE LOCALSTORAGE
                        localStorage.setItem('tree', JSON.stringify(tree))
                        localStorage.setItem('chosenProps', JSON.stringify(chosenProps))
                        location.href = './spaceIndex.html'  
                } else {
                    alert('SEPARA PRIMEIRO O LIXO ANTES DE APANHARES MAIS')
                }
            } else if(pixelCheck(pixel.data, 0, 0, 255)){
                if(bag.length == 0){
                    alert('BAG IS EMPTY')
                    break
                } else {
                    tree = 0
                    //SAVE THE VARIABLE LOCALSTORAGE
                    localStorage.setItem('tree', JSON.stringify(tree))
                    location.href = './drag-and-drop.html'
                }
                break
            }
            
            pixel = ctx.getImageData(characterX, characterY-20, 25, 25)
            if(pixelCheck(pixel.data, 0, 255, 0)){ //CHECK IF THE COLOR
                let closestTrash = {propX:0, propY: 0}
                let closestDist = Infinity

                if(tree != 2){
                    chosenProps.forEach(prop => {
                        let dist = Math.sqrt(Math.pow((prop.propX - characterX), 2) + Math.pow((prop.propY - characterY), 2)) //COMPARES ALL THE PROOPS TO CHECK WHICH IS THE CLOSEST ONE
                        if( dist < closestDist){
                            closestDist =  dist
                            closestTrash = prop
                        }                 
                    })
                    tree+=1
                    chosenProps.forEach(chosenprop => {
                        if(chosenprop.id == closestTrash.id){
                            chosenprop.validate = false
                        }
                    })
                    //SAVE THE VARIABLE LOCALSTORAGE
                    localStorage.setItem('tree', JSON.stringify(tree))
                    localStorage.setItem('chosenProps', JSON.stringify(chosenProps))
                    location.href = './spaceIndex.html'
                } else {
                    alert('SEPARA PRIMEIRO O LIXO ANTES DE APANHARES MAIS')
                }
            } else if(pixelCheck(pixel.data, 0, 0, 255)){
                if(bag.length == 0){
                    alert('BAG IS EMPTY')
                    break
                } else {
                    tree = 0
                    //SAVE THE VARIABLE LOCALSTORAGE
                    localStorage.setItem('tree', JSON.stringify(tree))
                    location.href = './drag-and-drop.html'
                }
                break
            }

            pixel = ctx.getImageData(characterX-40, characterY, 25, 25)
            if(pixelCheck(pixel.data, 0, 255, 0)){ //CHECK IF THE COLOR
                if(tree != 2){

                    let closestTrash = {propX:0, propY: 0}
                    let closestDist = Infinity

                    chosenProps.forEach(prop => {
                        if(prop.propX <= -characterX + 240){
                            let dist = Math.sqrt(Math.pow((prop.propX - characterX), 2) + Math.pow((prop.propY - characterY), 2)) //COMPARES ALL THE PROOPS TO CHECK WHICH IS THE CLOSEST ONE
                            if( dist < closestDist){
                                closestDist =  dist
                                closestTrash = prop
                            }
                        }
                    })
                    tree+=1
                    chosenProps.forEach(chosenprop => {
                        if(chosenprop.id == closestTrash.id){
                            chosenprop.validate = false
                        }
                    })
                    //SAVE THE VARIABLE LOCALSTORAGE
                    localStorage.setItem('tree', JSON.stringify(tree))
                    localStorage.setItem('chosenProps', JSON.stringify(chosenProps))
                    location.href = './spaceIndex.html'
                } else {
                    alert('SEPARA PRIMEIRO O LIXO ANTES DE APANHARES MAIS')
                }
            } else if(pixelCheck(pixel.data, 0, 0, 255)){
                if(bag.length == 0){
                    alert('BAG IS EMPTY')
                    break
                } else {
                    tree = 0
                    //SAVE THE VARIABLE LOCALSTORAGE
                    localStorage.setItem('tree', JSON.stringify(tree))
                    location.href = './drag-and-drop.html'
                }
                break
            }                            
        
            break;
        default:
            break;
    }
})

window.addEventListener('keyup', () => {
    if(right == true) { //CHARACTER DIRECTION
        direction = character_right
    } else {
        direction = character_left
    }
})

//PIXEL COLOR FUNCTION
 function pixelCheck(pixel, r, g, b){
    let dataArray = []
    for(let i = 0; i < pixel.length/4; i++){
        dataArray.push([pixel[i*4], pixel[i*4+1], pixel[i*4+2], pixel[i*4+3]])
    }

    let dataFilter = dataArray.filter(data => data[0] == r && data[1] == g && data[2] == b)

    //BLACK COLOR
    if(r == 0 && g == 0 && b == 0){
        if(dataFilter.length >= 15){
            return true
        } else {
            return false
        }

    //WHITE COLOR
    } else if( r == 255 && g == 255 && b == 255) {
        if(dataFilter.length >= 15){
            return true
        } else {
            return false
        }

    //GREEN COLOR
    } else if(r == 0 && g == 255 && b == 0){
        if(dataFilter.length >= 15){
            return true
        } else {
            return false 
        }

    //BLUE COLOR
    } else if(r == 0 && g == 0 && b == 255){
        if(dataFilter.length >= 15){
            return true
        } else {
            return false 
        }   
    }
} 