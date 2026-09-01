let cells=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let nextGen=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let w=20;
let y=0;
let on_color;
let off_color;

function setup() {
  createCanvas(400, 400);
  on_color=color(0,250,217);
  off_color=color(255,191,248);
}

function draw() {
  background(220);

  for(let i =0; i<20;i++){
    if(cells[i] ==1){
      fill(on_color);
    }else{
      fill(off_color);
    }
    square (i*w,y*20,w);
  }
}