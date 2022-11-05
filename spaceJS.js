const canvas = document.querySelector('#myCanvas');
        const ctx = canvas.getContext("2d");
        const W = canvas.width;
        const H = canvas.height;

        let xp = 100, yp = 800, w= 50, h= 70;//player position and atributes
        let rightKey = false, leftKey = false, upKey = false, downKey = false, fleft = false, spaceKey = false;
        //keys events
        window.addEventListener('keydown', e => {
            if (e.key == 'ArrowRight' || e.keyCode == 68)
                rightKey = true, fleft = false;
            if (e.key == 'ArrowLeft' || e.keyCode == 65)
                leftKey = true, fleft = true;
            if (e.key == 'ArrowDown' || e.keyCode == 83)
                downKey = true;
            if (e.key == 'ArrowUp' || e.keyCode == 87)
                upKey = true;
            if (e.keyCode == 32){
                spaceKey = true;

                shotsCalculator(xrSpace, yrSpace)
            }
            e.preventDefault();
        });
        window.addEventListener('keyup', e => {
            if (e.key == 'ArrowRight' || e.keyCode == 68)
                rightKey = false;
            if (e.key == 'ArrowLeft' || e.keyCode == 65)
                leftKey = false;
            if (e.key == 'ArrowDown' || e.keyCode == 83)
                downKey = false;
            if (e.key == 'ArrowUp' || e.keyCode == 87)
                upKey = false;
            if (e.keyCode == 32){
                spaceKey = false;
            }
        });

        //shots calcuations
        let angle, startShoot = false; let shoot = {x: 0, y:0}, scale;
        function shotsCalculator (xr, yr){
            if (!(startShoot)){
                angle = Math.atan2(yr - yp, xr-xp)
                startShoot = true;
        
                scale = (Math.sqrt((Math.pow(yp-yr, 2) + Math.pow(xp-xr, 2))))/80;
                if (scale >= 8){scale = 7.7} 
        
                if (angle <= -1.5 ||  angle >= 1.4){
                    shoot.x = xp + 25
                    shoot.y = yp
                    fleft = true;
                } else {
                    shoot.x = xp + 25
                    shoot.y = yp
                }
                shoot.dx = scale*Math.cos(angle)
                shoot.dy = scale*Math.sin(angle)
            }
        } 
        //trash placement calculator
        let trash = {x: 0, y: 0, src: ''}, quantity = 10
        let trashArray = []
        function trashCalculator(){
            //escolher arvore aleratoriamente
            //criar lixo
            for (let i = 0; i < quantity; i++){
                trash = {x: 0, y: 0, src: ''}
                trash.x = Math.floor(Math.random() * W)
                trash.y = Math.floor(Math.random() * 8*H/10)
                trash.src = ''
                trashArray.push(trash)
            }
            //x && y, de momento aparece aleatoriamente no canvas
        }
        //checkColisons
        let colision = false, indexColision;
        function checkColison(){
            for(let i = 0; i < trashArray.length; i++){
                if (shoot.x + 10 < trashArray[i].x ||
                    shoot.x > trashArray[i].x + size ||
                    shoot.y + 10 < trashArray[i].y ||
                    shoot.y > trashArray[i].y + size){
                   
                    colision = false;
                } else {
                    colision = true;
                    indexColision = i
                    break
                }
            };
        }
        
        canvas.addEventListener('click', e => {
            let xr = e.offsetX; let yr = e.offsetY;
            shotsCalculator(xr, yr)
        }) 
        let xrSpace, yrSpace;
        canvas.addEventListener('mousemove', e => {
            xrSpace = e.offsetX; yrSpace = e.offsetY;
        })
        
        
        let size = Math.floor(Math.random() * (50 - 20) + 20), ground = false
        trashCalculator()
        function render() {
            //clear the Canvas
            ctx.clearRect(0, 0, W, H);
            //player boundering
            if (rightKey && xp + w < W)
            xp+=1.3;
            if (leftKey && xp > 0)
            xp-=1.3;
            
            if (downKey && yp + h < H)
            yp+=1.3;
            if (upKey && yp + h > 8*H/10)
            yp-=1.3;
            
            
            //arvores
            let count = 0, countw = 0
            for (let i = 0; i < 8; i++){
                //uno
                ctx.fillStyle = 'red';
                ctx.fillRect(count,650,w,h)
                ctx.fillStyle = 'red';
                ctx.fillRect(countw,200,200,500)
                count += 300;
                countw += 280;
                width = 200 
            }
            

            //player
            ctx.fillStyle = 'blue';
            ctx.fillRect(xp,yp,w,h)
            //trash
            for (let i = 0; trashArray.length > i; i++) {
                ctx.fillStyle = 'gray';
                ctx.fillRect(trashArray[i].x,trashArray[i].y,size, size)
            }
            ////SHHOT
            if (startShoot){
                ctx.fillStyle = "green"
                ctx.fillRect(shoot.x, shoot.y, 10, 10)
                shoot.x += shoot.dx
                shoot.y += shoot.dy 
                shoot.dy += 0.05
                checkColison()
                if (shoot.y >= yp + 70 && trashArray[indexColision].x >= yp || colision){
                    startShoot = false
                    ground = true
                }
                console.log(trashArray[indexColision].x)
            }
            if(colision && !(ground)){
                ctx.fillStyle = 'gray';
                ctx.fillRect(trashArray[indexColision].x,trashArray[indexColision].y,size, size)
                trashArray[indexColision].y++
            }
            
            window.requestAnimationFrame(render);
        }
        window.onload = render;