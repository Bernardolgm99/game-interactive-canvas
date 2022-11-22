//CANVAS INIT
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

//CANVAS HEIGHT/WIDTH
let W = canvas.width
let H = canvas.height

//COORDINATES TO MOVE THE IMAGE
let imgX = 370
let imgY = 0

//IMPORTED IMAGES
let base_image = new Image();
let hitbox_image = new Image()
let character_right = new Image();
let character_left = new Image();
let character_right_walk = new Image();
let character_left_walk = new Image();

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
/* let pixelArray = [] */
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

//MAP SQUARES
let xPosition = 265
let yPosition = 550
let wSquare = 100
let hSquare = 70
265, 550 , 100, 70
let props = [{xPosition: 265, yPosition: 550, }]

//WHOLE MAP INIT
base()

//IMAGE CREATION
function base(){
    base_image.src = `/media/map.png`; //MAIN BACKGROUND IMAGE
    hitbox_image.src = `/media/hitbox.png`; //HITBOX BACKGROUND IMAGE
    character_right.src = `/media/animation_player/static_right1.png`; //CHARACTER SPRITE
    character_left.src = `/media/animation_player/static_left1.png`; //CHARACTER SPRITE
    character_right_walk.src = `/media/animation_player/walk_right1.png`; //CHARACTER SPRITE
    character_left_walk.src = `/media/animation_player/walk_left1.png`; //CHARACTER SPRITE
    direction = character_right
    base_image.onload = function(){
        imgW = base_image.width
        imgH = base_image.height   
        //console.log(imgW, imgH); 
        // ctx.drawImage(base_image, imgX, imgY, dimensionX, dimensionY, 0, 0, 500, 500);
    }
    if(!localStorage.bag){
        bag = []
        localStorage.setItem('bag', JSON.stringify(bag))
        console.log('bag data injected')
    } else {
        bag = JSON.parse(localStorage.getItem('bag'))
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

    //SPRITE
    ctx.drawImage(direction, frameIndex * 90/6, 0, 14, 23, characterX, characterY, characterDimensions, characterDimensions)
    animationFrameCount++

    if(animationFrameCount % 6 == 0) {
        frameIndex++

        if(frameIndex == 6) {
            frameIndex = 0
        }
    }



    //CUBE TEST
    /* ctx.fillRect(characterX, characterY, ballWH, ballWH) */

    //TEST SQUARE
    ctx.beginPath()
    ctx.fillRect(xPosition, yPosition , wSquare, hSquare)
    
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
            if(pixelCheck(pixel.data, 0, 255, 0)){
                console.log('SOU VERDE')
                break
            } else if(pixelCheck(pixel.data, 0, 0, 255)){
                if(bag.length == 0){
                    alert('BAG IS EMPTY')
                    break
                }
                break
            }

            pixel = ctx.getImageData(characterX+40, characterY, 25, 25)
            if(pixelCheck(pixel.data, 0, 255, 0)){
                console.log('SOU VERDE')
                break
            } else if(pixelCheck(pixel.data, 0, 0, 255)){
                if(bag.length == 0){
                    alert('BAG IS EMPTY')
                    break
                }
                break
            }

            pixel = ctx.getImageData(characterX, characterY-20, 25, 25)
            if(pixelCheck(pixel.data, 0, 255, 0)){
                console.log('SOU VERDE')
                break
            } else if(pixelCheck(pixel.data, 0, 0, 255)){
                if(bag.length == 0){
                    alert('BAG IS EMPTY')
                    break
                }
                break
            }

            pixel = ctx.getImageData(characterX-40, characterY, 25, 25)
            if(pixelCheck(pixel.data, 0, 255, 0)){
                console.log('SOU VERDE')
                break
            } else if(pixelCheck(pixel.data, 0, 0, 255)){
                if(bag.length == 0){
                    alert('BAG IS EMPTY')
                    break
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

/*     console.log(dataArray)
    console.log(r)
    console.log(g)
    console.log(b)*/
    let dataFilter = dataArray.filter(data => data[0] == r && data[1] == g && data[2] == b)
 /*    console.log(dataFilter) */
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

//REPLACE VALUES TO DRAW SQUARES
function squareValue(x, y, w, h){
    xPosition = x
    yPosition = y
    wSquare = w
    hSquare = h
}