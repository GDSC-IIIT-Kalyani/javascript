const canvas = document.getElementById('canvasbg');
const ctx = canvas.getContext('2d');
const canvas_width = canvas.width = 800;
const canvas_height = canvas.height = 690;
let gameSpeed = 0;

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

function animate(){
    ctx.clearRect(0,0,canvas_width, canvas_height);
    bglayers.forEach(object =>{
        object.update();
        object.draw();
    });
    requestAnimationFrame(animate);
}
animate();
