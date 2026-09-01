let cells=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//ponerles ceros o unos para cambiar el patron
let nextGen=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let w=40;
let y=0;
let length = 0;
let on_color;
let off_color;

function setup() {
  createCanvas(800, 800);
  
  on_color=color(0,250,217);
  off_color=color(255,191,248);
  length = cells.length;
}

function draw() {
// quitar el comentado de Background si no lo quiero fijo
//  background(220);

  for(let i =0; i<20;i++){
    if(cells[i] ==1){
//quitar el on_ u off_ para agregar y poner datos entre el parentesis,si no, quitar los parentesis
      fill(color(20*i,100*i,100));//on_color
    }else{
      fill(color(30*i,75*i,200));//off_color
    }
    square (i*w,y*40,w);
    //modificar el valor numerico para variar
  }
  for (let i=0; i<20;i++){
    let l_cell = cells[(i-1+length)%length];
    let c_cell = cells[i];
    let r_cell = cells[(i+1+length)%length];
//hacer el de la derecha 

    nextGen[i]=GetNextGeneration(l_cell,c_cell,r_cell);
  }
  // puede ser new Array
// cells = nextGen;
  
  //agregado extra
  for (let i=0; i<20;i++){
    cells[i] = nextGen[i];
  }
  nextGen.fill(0);
  y++;
}

function GetNextGeneration(l,c,r){
//modificar los returns para que sean reglas diferentes
    if ( l==0 && c==0 && r==0)
    {
      return 1;
    }
    if ( l==1 && c==0 && r==0)
    {
      return 0;
    }
    if ( l==0 && c==1 && r==0)     {
      return 0;
    }
    if ( l==0 && c==0 && r==1)     {
      return 0;
    }
    if ( l==1 && c==1 && r==0)     {
      return 0;
    }
    if ( l==0 && c==1 && r==1)     {
      return 0;
    }
    if ( l==1 && c==0 && r==1)     {
      return 0;
    }
    if ( l==1 && c==1 && r==1)     {
      return 0;
    }
}