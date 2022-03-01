

const canvas = document.getElementById('canvasbg');
const ctx = canvas.getContext('2d');

const canvas_width = canvas.width = 800;
const canvas_height = canvas.height = 690;
let gameSpeed = 0;
const gravity =0.2;
const numberofenemies = 1;
//const enemiesArray = [];
let  enemies = []
//cage
const cageImage = new Image();
cageImage.src = './Assets/cage.png'
//player 

class Player{
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity ={
            x: 0,
            y: 1
        }
        this.frames = {
                idle: 7,
                jumpup: 7,
                jumpdown: 7,
                run: 9,
                dizzy: 11,
                sit: 5,
                roll: 7,
                bite: 7,
                ko: 12,
                gethit: 4
            }
        
        this.width = 55
        this.height = 50
        this.image = new Image();
        this.image.src = './Assets/shadow_dog.png'
        this.frameX = 0;
        this.frameY = 0;
        this.spirteWidth = 6876/12;
        this.spriteHeight = 5230/10;
        this.gameframe = 0;
        this.staggeredframe = 5;
        this.n = 6;
        
    }
    drawPlayer (){
        ctx.fillStyle = 'black'
        ctx.drawImage(this.image,
            this.spirteWidth*this.frameX,
            this.spriteHeight*this.frameY ,
            this.spirteWidth,
            this.spriteHeight,
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height)
    }
    updatePlayer(){
        this.position.y += this.velocity.y
        if (this.gameframe%this.staggeredframe ==0){
            if (this.frameX <this.n /*to changed with a variable*/) this.frameX++;
            else this.frameX = 0;
        }
        if (gameSpeed>0) {
            if (this.velocity.y>0 || this.velocity.y<0){
                if (this.velocity.y>0) {
                    this.frameY = 2;
                    this.n = 6
                }
                else {
                    this.frameY =1;
                    this.n = 6
                }
            }
            else if (this.velocity.y == 0) {
                this.frameY = 3
                this.n = 8
            }
        }
        else if (gameSpeed ==0){
            this.frameY = 0
            this.n = 6
        }
        this.drawPlayer()
        //adding gravity in each loop 
        if (this.position.y +this.height +this.velocity.y <= canvas.height -50)
            this.velocity.y += gravity
        else 
            this.velocity.y =0
        this.gameframe++
    }
    
}
const player =  new Player()

//enemydw
class Enemy{
    constructor (gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width= 250/3;
        this.height = 231/3
        this.x =this.gameWidth;
        this.y = this.gameHeight - this.height-50;
        this.frameX = 0
    }
    draw(){
        //ctx.fillRect(this.x, this.y,this.width, this.height )
        ctx.drawImage(cageImage, this.x, this.y,this.width, this.height )
    }
    update(){
        this.x = this.x - gameSpeed;
    }
};



//doggo - run
const bgLayer1 = new Image();
bgLayer1.src = './Assets/layers/L-1.png';
const bgLayer2 = new Image();
bgLayer2.src = './Assets/layers/L-2.png';
const bgLayer3 = new Image();
bgLayer3.src = './Assets/layers/L-3.png';
const bgLayer4 = new Image();
bgLayer4.src = './Assets/layers/L-4.png';
const bgLayer5 = new Image();
bgLayer5.src = './Assets/layers/L-5.png';
const bgLayer6  = new Image();
bgLayer6.src = './Assets/layers/L-6.png';
const bgLayer7 = new Image();
bgLayer7.src = './Assets/layers/L-7.png';
const bgLayer8 = new Image();
bgLayer8.src = './Assets/layers/L-8.png';
const bgLayer9 = new Image();
bgLayer9.src = './Assets/layers/L-9.png';
const bgLayer10 = new Image();
bgLayer10.src = './Assets/layers/L-10.png';
const bgLayer11 = new Image();
bgLayer11.src = './Assets/layers/L-11.png';



//layer class
class Layer {
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 900;
        this.height = 693;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier; 
    }
    update(){
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        if (this.x2 <= -this.width){
            this.x2 = this.width + this.x - this.speed;
        }
        this.x2 = Math.floor(this.x2 - this.speed);
        
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height );
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height );
    }
}
const layer1 = new Layer(bgLayer1 , 0);
const layer2 = new Layer(bgLayer2 , 0.1);
const layer3 = new Layer(bgLayer3 , 0.2);
const layer4 = new Layer(bgLayer4 , 0.3);
const layer5 = new Layer(bgLayer5 , 0.35);
const layer6 = new Layer(bgLayer6 , 0.55);
const layer7 = new Layer(bgLayer7 , 0.7);
const layer8 = new Layer(bgLayer8 , 0.8);
const layer9 = new Layer(bgLayer9 , 0.8);
const layer10 = new Layer(bgLayer10 , 1);
const layer11 = new Layer(bgLayer11 , 1);

const bglayers = [layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8, layer9, layer10, layer11]
//handle enemies
enemies.push(new Enemy (canvas_width,canvas_height))
function handleEnemies(deltaTime){
    if (enemyTimer > enemyInterval + randomEnemyInterval){
        enemies.push(new Enemy (canvas_width,canvas_height));
        randomEnemyInterval = Math.random()* 1000 + 500;
        enemyTimer= 0;
    } else {
        enemyTimer += deltaTime;
    }
    enemies.forEach(enemy => {
        enemy.draw();
        enemy.update();
    })
}
//const enemy1 = new Enemy();
/*for (let i = 0; i<numberofenemies; i++){
    enemiesArray.push(new Enemy());
}*/
//console.log(enemiesArray)

let lastTime =0;
let enemyTimer = 0;
let enemyInterval =2000;
let randomEnemyInterval = Math.random()* 1000 + 500;

function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp
    ctx.clearRect(0,0,canvas_width, canvas_height);
    bglayers.forEach(object =>{
        object.update();
        object.draw();
    });
    
    //console.log(player.position.y)
    //console.log(player.staggeredframe);
    //console.log(gameSpeed);
    player.updatePlayer();
    handleEnemies(deltaTime);
    /*enemiesArray.forEach(enemy =>{
        enemy.draw();
        enemy.update();
    })*/
    requestAnimationFrame(animate);
}
animate(0);

//key controls
window.addEventListener('keydown', ({keyCode}) =>{
    console.log(keyCode)//<- getting kry code of input key
    switch (keyCode){
        
        case 87: //w
            if (player.position.y <588) break;
            player.velocity.y -=7
            break;
        case 83: //s
            if(player.position.y +player.height +player.velocity.y <= canvas.height -50)
                player.velocity.y +=7;
            break;
        case 65: //a
            if (player.staggeredframe<6 && player.staggeredframe>=3)player.staggeredframe++;
            if (gameSpeed >4) 

                gameSpeed -=4;
            else if (gameSpeed<=4)
                gameSpeed = 0;
            break;
        case 68: //d
            if (player.staggeredframe<=6 && player.staggeredframe>3)player.staggeredframe--;
            if (gameSpeed >15) break;
            
            gameSpeed +=2
            break;
        case 32: //space      
    }
})
