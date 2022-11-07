//CANVAS INIT
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

//CANVAS HEIGHT/WIDTH
let W = canvas.width
let H = canvas.height

//COORDINATES TO MOVE THE IMAGE
let imgX = 0
let imgY = 0

//IMPORTED IMAGES
let base_image = new Image();
let hitbox_image = new Image()

//ORIGINAL IMAGE HEIGHT/WIDTH
let imgH
let imgW

//BALL INITIAL POSITION
let ballX = 148
let ballY = 148

//DIMENSIONS
let dimensionX = 250
let dimensionY = 250

//PIXEL VARIABLE CHECK
/* let pixelArray = [] */
let pixel



//WHOLE MAP INIT
base()

//IMAGE CREATION
function base(){
    base_image.src = `img/map.png`; //MAIN BACKGROUND IMAGE
    hitbox_image.src = `img/hitbox.png`; //HITBOX BACKGROUND IMAGE
    base_image.onload = function(){
        imgW = base_image.width
        imgH = base_image.height   
        //console.log(imgW, imgH); 
        // ctx.drawImage(base_image, imgX, imgY, dimensionX, dimensionY, 0, 0, 500, 500);
        


/*         //BERNARDO TEST
         ctx.drawImage(hitbox_image, imgX, imgY, dimensionX, dimensionY, 0, 0, 500, 500)
        //x = i AND y = j
       for(let i = 0; i < W; i++) {
           for(let j = 0; j < H; j++) {
                pixel = ctx.getImageData(i, j, 1, 1)
                if(pixel.data[0] == 255 && pixel.data[1] == 255 && pixel.data[2] == 255){
                    pixelArray.push(1)
                } else {
                    pixelArray.push(0)
                }
           }
       }
       console.log(pixelArray)
       console.log(pixelArray.filter(pixel => pixel == 1))
    }  */
 }
}



window.onload = render()

//FUNCTION TO DRAW
function render() {
    // BACKGROUND 
    ctx.clearRect(0, 0, W, H)
    //base_image.src = `img/map.png`;
    //console.log(imgX, imgY)
     ctx.drawImage(hitbox_image, imgX, imgY, dimensionX, dimensionY, 0, 0, 500, 500) 
     ctx.drawImage(base_image,  imgX, imgY, dimensionX, dimensionY, 0, 0, 500, 500);  

    //TEST BALL
    ctx.beginPath()
    ctx.arc(ballX, ballY, 5, 0, 2*Math.PI)
    ctx.strokeStyle = "blue"
    ctx.stroke()
    ctx.fill()

    //TEST SQUARE
/*     ctx.beginPath()
    ctx.fillRect(130, 130 , 45, 45) */
    
    requestAnimationFrame(render);
}

// EVENTS - KEY  

//MOVES IMAGE
window.addEventListener('keydown', (event) => {
    

    //SWITCH CASE FOR EVERY ARROW KEY
    switch (event.keyCode){
        case 37:
            
            ctx.drawImage(hitbox_image, imgX, imgY, dimensionX, dimensionY, 0, 0, 500, 500)

            //PIXEL COLOR CHECK
            pixel = ctx.getImageData(ballX-7, ballY, 25, 25) 
            console.log(pixel.data[0])
            console.log(pixel.data[1])
            console.log(pixel.data[2]) 

            //PIXEL COLOR CHECK
              if(pixel.data[0] == 255 && pixel.data[1] == 255 && pixel.data[2] == 255){
                if(ballX > 100){
                    ballX -= 3
                } else {
                    if(imgX > 0){
                        imgX -= 3
                    }
                }
            } 
            //console.log('left')
            break;
        case 38: 

            ctx.drawImage(hitbox_image, imgX, imgY, dimensionX, dimensionY, 0, 0, 500, 500)

            //PIXEL COLOR CHECK
            pixel = ctx.getImageData(ballX, ballY-7, 25, 25) 
            console.log(pixel.data[0])
            console.log(pixel.data[1])
            console.log(pixel.data[2]) 

            //PIXEL COLOR CHECK
            if(pixel.data[0] == 255 && pixel.data[1] == 255 && pixel.data[2] == 255){
                if(ballY > 100){
                    ballY -= 3
                } else {
                    if(imgY > 0){
                        imgY -= 3
                    }
                }
            }
            //console.log('up')
            break;
        case 39:

            ctx.drawImage(hitbox_image, imgX, imgY, dimensionX, dimensionY, 0, 0, 500, 500)

            //PIXEL COLOR CHECK
            pixel = ctx.getImageData(ballX+4, ballY, 25, 25) 
            console.log(pixel.data[0])
            console.log(pixel.data[1])
            console.log(pixel.data[2]) 
            
            //PIXEL COLOR CHECK
            if(pixel.data[0] == 255 && pixel.data[1] == 255 && pixel.data[2] == 255){
                if(ballX < 400){
                    ballX += 3
                } else {
                    if(imgX + dimensionY < imgW){
                        imgX += 3
                    }
                }
            }
            //console.log('right')
        break;
        case 40:

                ctx.drawImage(hitbox_image, imgX, imgY, dimensionX, dimensionY, 0, 0, 500, 500)

                //PIXEL COLOR CHECK
                pixel = ctx.getImageData(ballX, ballY+4, 25, 25) 
                console.log(pixel.data[0])
                console.log(pixel.data[1])
                console.log(pixel.data[2]) 

                //PIXEL COLOR CHECK
                if(pixel.data[0] == 255 && pixel.data[1] == 255 && pixel.data[2] == 255){
                    if(ballY < 400){
                        ballY += 3
                    } else {
                        if(imgY + dimensionX < imgH){
                            imgY += 3
                        }
                    }
                }
            //console.log('down')
            break;
    
        default:
            break;
    }
    
 
})
