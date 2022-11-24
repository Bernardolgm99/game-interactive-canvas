//CANVAS INIT
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

//CANVAS HEIGHT/WIDTH
let W = canvas.width
let H = canvas.height

//COORDINATES TO MOVE THE IMAGE
let imgX = 370
let imgY = 0

//PROPS
let chosenProps = []
let randomProp
let props = [{id:1, name: `metalCanSoda`, img: `/media/props/metalCanSoda.png`, propX: -240, propY: -465, validate: false},
             {id:2, name: `plasticBleach`, img: `/media/props/plasticBleach.png`, propX: -1310, propY: -390, validate: false},
             {id:3, name: `plasticPop`, img: `/media/props/plasticPop4.png`, propX: -980, propY: -430, validate: false},
             {id:4, name: `glassWine`, img: `/media/props/glassWineFull.png`, propX: 400, propY: -400, validate: false},
             {id:5, name: `metalCanSoda1`, img: `/media/props/metalCanSoda.png`, propX: -260, propY: -750, validate: false},
             {id:6, name: `plasticPop1`, img: `/media/props/plasticPop4.png`, propX: 580, propY: -680, validate: false},
             {id:7, name: `glassWine1`, img: `/media/props/glassWineFull.png`, propX: 350, propY: -1050, validate: false},
             {id:8, name: `plasticBleach1`, img: `/media/props/plasticBleach.png`, propX: 590, propY: -1300, validate: false},
             {id:9, name: `glassWine2`, img: `/media/props/glassWineFull.png`, propX: -475, propY: -1050, validate: false},
             {id:10, name: `plasticBleach2`, img: `/media/props/plasticBleach.png`, propX: -730, propY: -1300, validate: false},
             {id:11, name: `metalCanSoda2`, img: `/media/props/metalCanSoda.png`, propX: -1110, propY: -1000, validate: false}
            ]
let propDimensionX = 1200
let propDimensionY = 700
let propName


//ORIGINAL IMAGE HEIGHT/WIDTH
let imgH
let imgW

//CHARACTER INITIAL POSITION
let characterX = 690
let characterY = 300 
let speed = 20

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
let metalCanProp = new Image();
let plasticBleach = new Image();
let backpack = new Image();
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
                props[randomProp].validate = true
                chosenProps.push(props[randomProp])
                console.log(chosenProps)
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
    ctx.drawImage(backpack, -7150, -70, 8000, 4800, 0, 0, W, H);

    
    chosenProps.forEach(prop => {
        if(prop.validate){
            ctx.drawImage(prop.name, prop.propX, prop.propY, propDimensionX, propDimensionY, 0, 0, W, H) 
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
                                    prop.propX -= speed*1.2
                                })
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
                                    prop.propY -= speed*1.15
                                })
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

            console.log(characterX, characterY)

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
                                    prop.propX += speed*1.2
                                })
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
                                        prop.propY += speed*1.15
                                    })
                                    yPosition -= speed*1.25
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
                if(tree <= 20000){
                    console.log('SOU VERDE')
                    console.log(-characterY + 300)
                    chosenProps.forEach(prop => {
                        if(prop.propY <= -characterY -225 && prop.propX <= -characterX -475){
                            console.log(prop)   
                            /* tree+=1
                            //SAVE THE VARIABLE LOCALSTORAGE
                            localStorage.setItem('tree', JSON.stringify(tree))
                            location.href = './spaceIndex.html' */
                        }
                    })
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
                if(tree <= 2000){
                    console.log('SOU VERDE')
                    chosenProps.forEach(prop => {
                        if(prop.propX <= -characterX + 200){
/*                             tree+=1
                            //SAVE THE VARIABLE LOCALSTORAGE
                            localStorage.setItem('tree', JSON.stringify(tree))
                            location.href = './spaceIndex.html' */
                        }
                    })
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
                if(tree <= 2000){
                    console.log('SOU VERDE')
                    console.log(imgX, imgY)
                    chosenProps.forEach(prop => {
                        console.log(prop.propX)
                        console.log(prop.propY)
                        if(prop.propX < characterX && prop.propX > -characterX + 135){
                            console.log('up')
                            console.log(prop)
/*                             tree+=1
                            //SAVE THE VARIABLE LOCALSTORAGE
                            localStorage.setItem('tree', JSON.stringify(tree))
                            location.href = './spaceIndex.html' */
                        }
                    })
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
                if(tree <= 20000){
                    chosenProps.forEach(prop => {
                        console.log('SOU VERDE')
                        if(prop.propX <= -characterX + 240){
/*                             tree+=1
                            //SAVE THE VARIABLE LOCALSTORAGE
                            localStorage.setItem('tree', JSON.stringify(tree))
                            location.href = './spaceIndex.html' */
                        }
                    })
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