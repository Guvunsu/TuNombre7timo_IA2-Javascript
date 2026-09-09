let grid = [];
let nextGen = [];
let gridSize = 10;
let totalSize;
let canvasSize = 300;
let cellSize;

let gameState = 0;
let creation = 0;
let simulation = 1;

function setup() {
  let canvas = createCanvas(canvasSize, canvasSize);
  totalSize = gridSize * gridSize;
  cellSize = canvasSize / gridSize;
  
  CreateGrid();
  CreatedNeighborhood();
  gameState=creation;
  canvas.mouseClicked(EditAutomata);
  keyRealeased();//tal vez 
}

function CreateGrid(){
    for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      
//le puedo poner 1,2,3,4,5 para que sea aleatorio con respecto al Render() por mi cantidad de colores que tengo en mi condicionales, pero poner 6 para que salgan todos
//variable nueva 01 09 2026
      
     // let randomState = int(random(6));
      let temp_cell = new Cell(x*cellSize, y*cellSize, cellSize, 0/*randomState*/);//quite el ,0 -> para colocar randomState
      grid.push(temp_cell);
    }
  }
}

function CreatedNeighborhood(){
  
  //en medio 
  for(let i=gridSize+1;i<totalSize -gridSize-1;i++){
    let l=grid[i-1];
    let r=grid[i+1]
    let u=grid[i-gridSize];
    let d=grid[i+gridSize];

    grid[i].SetNeighborhood(l,r,u,d);
  }
  
  //esquina superior izq.
  
  let l_sl=grid[gridSize-1]
  let r_sl=grid[1];
  let u_sl=grid[totalSize-gridSize];
  let d_sl=grid[gridSize];

  grid[0].SetNeighborhood(l_sl,r_sl,u_sl,d_sl);

  //esquina superior derecha
  
  let l_sr=grid[gridSize-2]
  let r_sr=grid[0];
  let u_sr=grid[totalSize-1];
  let d_sr=grid[(2*gridSize)-1];

  grid[gridSize-1].SetNeighborhood(l_sr,r_sr,u_sr,d_sr);

  //esquina inferior izquierda
  
  let l_il=grid[totalSize-1]
  let r_il=grid[totalSize-gridSize+1];
  let u_il=grid[totalSize-(2*gridSize)];
  let d_il=grid[0];

  grid[totalSize-gridSize].SetNeighborhood(l_il,r_il,u_il,d_il);

  //esquina inferior derecha
  
  let l_ir=grid[totalSize-2]
  let r_ir=grid[totalSize-gridSize];
  let u_ir=grid[totalSize-gridSize-1];
  let d_ir=grid[gridSize-1];

  grid[totalSize-1].SetNeighborhood(l_ir,r_ir,u_ir,d_ir);

  //lateral izq
  
  for(let i=gridSize;i<totalSize-gridSize+1;i+=gridSize){
    let l =grid[i-1];
    let r =grid[i+1];
    let u = grid[i-gridSize];
    let d =grid[i+gridSize];

    grid[i].SetNeighborhood(l,r,u,d);
    
  }

  //lateral derecha
  for(let i=2*gridSize-1;i<totalSize-gridSize;i+=gridSize){
    let l = grid[i-1];
    let r = grid[i-gridSize+1];
    let u = grid[i-gridSize];
    let d = grid[i+gridSize];

    grid[i].SetNeighborhood(l,r,u,d);
  }

  //superior
  for (let i=1;i<gridSize-1;i++){
    let l = grid[i-1];
    let r = grid[i+1];
    let u = grid[totalSize-gridSize+i];
    let d = grid[i+gridSize];
    
    grid[i].SetNeighborhood(l,r,u,d);
  }

  //inferior 
  for(let i=totalSize-gridSize+1;i<totalSize-1;i++){
    let l = grid[i-1];
    let r = grid[i+1];
    let u = grid[i-gridSize];
    let d = grid[i-totalSize+gridSize];

    grid[i].SetNeighborhood(l,r,u,d);
  }
}

function EditAutomata(){
  
  if(gameState != creation ){
    return;
  }
  for(let i=0;i<totalSize;i++){
    let temp_cell=grid[i];
    if(mouseX>temp_cell.x && mouseX<temp_cell.x + cellSize && mouseY>temp_cell.y && mouseY<temp_cell.y + cellSize  ){
      temp_cell.state=1;
      break;
    }
  }
}

function GetNextGen(central){
  let l=central.l;
  let r=central.r;
  let u=central.u;
  let d=central.d;

  //1=prendido y 0=apagado 
  //modificar para ver como vive mi celula
  
  // apagado
  if (central.state===0 && l.state===0 && r.state===0 && u.state===0 && d.state===0){
    return 0;
  //central prendida
  }else if (central.state===1 && l.state===0 && r.state===0 && u.state===0 && d.state===0 ){
    return 1;
  // izquierdo prendido
  }else if (central.state===0 && l.state===1 && r.state===0 && u.state===0 && d.state===0){
    return 1;
  //  central prendido y izq prendido
  }else if (central.state===1 && l.state===1 && r.state===0 && u.state===0 && d.state===0){
    return 1;
    // arriba prendido
  }else if (central.state===0 && l.state===0 && r.state===0 && u.state===1 && d.state===0){
    return 1;
    //arriba prendido y centro 
  }else if (central.state===1 && l.state===0 && r.state===0 && u.state===1 && d.state===0){
    return 1;
    // derecha prendido
  }else if (central.state===0 && l.state===0 && r.state===1 && u.state===0 && d.state===0){
    return 1;
    // derecha y centro prendido
  }else if (central.state===1 && l.state===0 && r.state===1 && u.state===0 && d.state===0){
    return 1;
    //abajo prendido 
  }else if (central.state===0 && l.state===0 && r.state===0 && u.state===0 && d.state===1){
    return 1;
    // abajo y centro prendido
  }else if (central.state===1 && l.state===0 && r.state===0 && u.state===0 && d.state===1){
    return 1;
    //centro, derecha, y abajo prendido
  }else if (central.state===1 && l.state===0 && r.state===1 && u.state===0 && d.state===1){
    return 1;
    //centro, izquierda,abajo prendido
  }else if (central.state===1 && l.state===1 && r.state===0 && u.state===0 && d.state===1){
    return 1;
    //centro,izq, arriba prendido
  }else if (central.state===1 && l.state===1 && r.state===0 && u.state===1 && d.state===0){
    return 1;
    //centro,derecha, arriba prendido
  }else if (central.state===1 && l.state===0 && r.state===1 && u.state===1 && d.state===0){
    return 1;
    //centro , arriba,derecha,abajo,izquierda prendido
  }else if (central.state===1 && l.state===1 && r.state===1 && u.state===1 && d.state===1){
    return 1;
    // arriba, abajo, dere, izq prendido
  }else if (central.state===0 && l.state===0 && r.state===0 && u.state===0 && d.state===0){
    return 1;
    //centro, arriba,derecha, izquierda prendido
  }else if (central.state===1 && l.state===1 && r.state===1 && u.state===1 && d.state===0){
    return 1;
    //centro,derecha, izquierda, abajo prendido
  }else if (central.state===1 && l.state===1 && r.state===1 && u.state===0 && d.state===1){
    // centro , derecha, arriba, abajo prendido
  }else if (central.state===1 && l.state===0 && r.state===1 && u.state===1 && d.state===1){
    return 1;
    // centro, arriba,abajo, izq prendido
  }else if (central.state===1 && l.state===1 && r.state===0 && u.state===1 && d.state===1){
    return 1;
    //arriba, abajo prendido
  }else if (central.state===0 && l.state===0 && r.state===0 && u.state===1 && d.state===1){
    return 1;
    //derecha e izquierda prendido
  }else if (central.state===0 && l.state===1 && r.state===1 && u.state===0 && d.state===0){
    return 1;
    //izquierda y abajo
  }else if (central.state===0 && l.state===1 && r.state===0 && u.state===0 && d.state===1){
    return 1;
    //abajo derecha prendido
  }else if (central.state===0 && l.state===0 && r.state===1 && u.state===0 && d.state===1){
    return 1;
    // arriba, derecha prendido
  }else if (central.state===0 && l.state===0 && r.state===1 && u.state===1 && d.state===0){
    return 1;
    //arriba, izq prendido
  }else if (central.state===0 && l.state===1 && r.state===0 && u.state===1 && d.state===0){
    return 1;
    //arriba,abajo, derecha
  }else if (central.state===0 && l.state===0 && r.state===1 && u.state===1 && d.state===1){
    return 1;
    // arriba, abajo, izq
  }else if (central.state==0 && l.state===1 && r.state===0 && u.state===1 && d.state===1){
    return 1;
    //abajo derecha , e izq prendidos
  }else if (central.state===0 && l.state===1 && r.state===1 && u.state===0 && d.state===1){
    return 1;
    //arriba, derecha, izq
  }else if (central.state===0 && l.state===1 && r.state===1 && u.state===1 && d.state===0){
    return 1;
    //srriba, centro, derecha, izq prendidos
  }else if (central.state===1 && l.state===1 && r.state===1 && u.state===1 && d.state===0){
    return 1;
    // arriba, centro, abajo
  }else if (central.state===1 && l.state===0 && r.state===0 && u.state===1 && d.state===1){
    return 1;
    // centro, derecha, izq
}else if (central.state===1 && l.state===1 && r.state===1 && u.state===0 && d.state===0){
  return 1
  }
}

function keyRealeased(){
  if(key==='g' || key==='G'){
    gameState=simulation;
  }
}

function draw() {
    background(220);

  if(gameState===simulation){
    for(let i=0;i<totalSize;i++){
    nextGen[i] = GetNextGen(grid[i]);
    }
  }
  for (let i=0; i<totalSize;i++){
    grid[i].Render();
    }
  }