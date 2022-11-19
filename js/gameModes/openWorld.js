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
let ballWH = 20

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
    base_image.src = `/media/map.png`; //MAIN BACKGROUND IMAGE
    hitbox_image.src = `/media/hitbox.png`; //HITBOX BACKGROUND IMAGE
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
    ctx.drawImage(base_image,  imgX, imgY, dimensionX, dimensionY, 0, 0, 500, 500);

    //CUBE TEST
    ctx.fillRect(ballX, ballY, ballWH, ballWH)

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
              if(!pixelCheck(pixel.data, 0, 0, 0)){
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
            if(!pixelCheck(pixel.data, 0, 0, 0)){
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
            pixel = ctx.getImageData(ballX+ballWH, ballY, 1, ballWH) 
            console.log(pixel.data[0])
            console.log(pixel.data[1])
            console.log(pixel.data[2]) 
            
            //PIXEL COLOR CHECK
            if(!pixelCheck(pixel.data, 0, 0, 0)){
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
                pixel = ctx.getImageData(ballX, ballY+ballWH, 1, 1) 
                console.log(pixel.data[0])
                console.log(pixel.data[1])
                console.log(pixel.data[2]) 

                //PIXEL COLOR CHECK
                if(!pixelCheck(pixel.data, 0, 0, 0)){
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


//PIXEL COLOR FUNCTION
function pixelCheck(pixel, r, g, b){
    let dataArray = []
    for(let i = 0; i < pixel.length/4; i++){
        dataArray.push([pixel[i*4], pixel[i*4+1], pixel[i*4+2], pixel[i*4+3]])
    }

    console.log(dataArray)
    console.log(r)
    console.log(g)
    console.log(b)
    console.log(dataArray.find(data => data[0] == r && data[1] == g && data[2] == b))
    return dataArray.find(data => data[0] == r && data[1] == g && data[2] == b)
}