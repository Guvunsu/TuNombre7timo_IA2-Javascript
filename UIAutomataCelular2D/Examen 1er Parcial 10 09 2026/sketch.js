let grid = [];
let nextGen = [];
let gridSize = 10;
let totalSize;
let canvasSize = 300;
let cellSize;

let gameState = 0;
let creation = 0;
let simulation = 1;
let generation=0;//variable para guardar las generaciones

function setup() {
  let canvas = createCanvas(canvasSize, canvasSize);
  totalSize = gridSize * gridSize;
  cellSize = canvasSize / gridSize;
  
  CreateGrid();
  CreatedNeighborhood();
  gameState=creation;
  canvas.mouseClicked(EditAutomata);
}

function CustomSteps(){
  if (gameState != simulation){
    return;
  }
  for(let i=0;i<totalSize;i++){
   //calculo todas las celulas del grid i 
    nextGen[i] = GetNextGen(grid[i]);
  }for(let i=0;i<totalSize;i++){
    // las muestro
    grid[i].state = nextGen[i];
  }
  generation++;
}

function CreateGrid(){
    for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      let temp_cell = new Cell(x*cellSize, y*cellSize, cellSize, 0);
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

  //habia agregado un +1 en el for y el Left me falto un dato :/ por eso no jalaba
  //lateral izq 
  for(let i=gridSize;i<totalSize-gridSize;i+=gridSize){
    let l =grid[i+gridSize-1];
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
  if(gameState != creation ) return;
  
  for(let i=0;i<totalSize;i++){
    let temp_cell=grid[i];
    if(mouseX>temp_cell.x && mouseX<temp_cell.x + cellSize && mouseY>temp_cell.y && mouseY<temp_cell.y + cellSize){
     temp_cell.state = temp_cell.state === 0 ? 1: 0; // toggle 
     break;
    }
  }
}

function GetNextGen(central){
  let l=central.l;
  let r=central.r;
  let u=central.u;
  let d=central.d;
  
  // reglas de John von Neumann (escribo su nombre, porque se me olvidara) Conway's Game Of Life
  //-----------------------------------------0 puntos----------------------------------------------
  // apagados
  if (central.state===0 && l.state===0 && r.state===0 && u.state===0 && d.state===0) return 0;

  //-----------------------------------------1 punto-----------------------------------------------
  // central prendido
  else if (central.state===1 && l.state===0 && r.state===0 && u.state===0 && d.state===0) return 0;
  //izquierda prendido
  else if (central.state===0 && l.state===1 && r.state===0 && u.state===0 && d.state===0) return 0;
  //derecha prendido
  else if (central.state===0 && l.state===0 && r.state===1 && u.state===0 && d.state===0) return 0;
  //arriba prendido
  else if (central.state===0 && l.state===0 && r.state===0 && u.state===1 && d.state===0) return 0;
  //abajo prendido
  else if (central.state===0 && l.state===0 && r.state===0 && u.state===0 && d.state===1) return 0;

  //----------------------------------------2 puntos-----------------------------------------------
  //centro y izquierda prendido
  else if (central.state===1 && l.state===1 && r.state===0 && u.state===0 && d.state===0) return 0;
  //centro y derecha prendido
  else if (central.state===1 && l.state===0 && r.state===1 && u.state===0 && d.state===0) return 0;
  //centro y arriba prendido
  else if (central.state===1 && l.state===0 && r.state===0 && u.state===1 && d.state===0) return 0;
  //centro y abajo prendido
  else if (central.state===1 && l.state===0 && r.state===0 && u.state===0 && d.state===1) return 0;

  //izquierda y derecha prendido
  else if (central.state===0 && l.state===1 && r.state===1 && u.state===0 && d.state===0) return 0;
  //arriba y abajo prendido
  else if (central.state===0 && l.state===0 && r.state===0 && u.state===1 && d.state===1) return 0;

  //izquierda y abajo prendido
  else if (central.state===0 && l.state===1 && r.state===0 && u.state===0 && d.state===1) return 0;
  //derehca y abajo prendido
  else if (central.state===0 && l.state===0 && r.state===1 && u.state===0 && d.state===1) return 0;
  //izquierda y arriba prendido
  else if (central.state===0 && l.state===1 && r.state===0 && u.state===1 && d.state===0) return 0;
  //derecha y arriba prendido
  else if (central.state===0 && l.state===0 && r.state===1 && u.state===1 && d.state===0) return 0;

  //---------------------------------------3 puntos------------------------------------------------
  //arriba, abajo, y centro prendido
  else if (central.state===1 && l.state===0 && r.state===0 && u.state===1 && d.state===1) return 0;
  //izquierda, derecha, y centro prendido
  else if (central.state===1 && l.state===1 && r.state===1 && u.state===0 && d.state===0) return 0;
  
  //izquierda, centro, y abajo prendido
  else if (central.state===1 && l.state===1 && r.state===0 && u.state===0 && d.state===1) return 0;
  //izquierda, centro, y arriba prendido
  else if (central.state===1 && l.state===1 && r.state===0 && u.state===1 && d.state===0) return 0;
  //arriba, centro, y derecha prendido
  else if (central.state===1 && l.state===0 && r.state===1 && u.state===1 && d.state===0) return 0;
  //abajo, centro, y derecha prendido
  else if (central.state===1 && l.state===0 && r.state===1 && u.state===0 && d.state===1) return 0;

  //arriba, izquierda, y abajo prendido
  else if (central.state===0 && l.state===1 && r.state===0 && u.state===1 && d.state===1) return 0;
  //arriba, derecho, y abajo prendido
  else if (central.state===0 && l.state===0 && r.state===1 && u.state===1 && d.state===1) return 0;
  //izquierda, arriba, y derecha prendido
  else if (central.state===0 && l.state===1 && r.state===1 && u.state===1 && d.state===0) return 0;
  //izquierda, abajo, y derecha prendido
  else if (central.state===0 && l.state===1 && r.state===1 && u.state===0 && d.state===1) return 0;

  //---------------------------------------4 puntos------------------------------------------------
  //izquierda, arriba, abajo, y centro prendido
  else if (central.state===1 && l.state===1 && r.state===0 && u.state===1 && d.state===1) return 0;
  //derecha, arriba, abajo, y centro prendido
  else if (central.state===1 && l.state===0 && r.state===1 && u.state===1 && d.state===1) return 0;
  //izquierda, derecha, abajo, y centro prendido
  else if (central.state===1 && l.state===1 && r.state===1 && u.state===0 && d.state===1) return 0;
  //izquierda, derecha, arriba, y centro prendido
  else if (central.state===1 && l.state===1 && r.state===1 && u.state===1 && d.state===0) return 0;

  //arriba, abajo, derecha, e izquierda prendido
  else if (central.state===0 && l.state===1 && r.state===1 && u.state===1 && d.state===1) return 0;

  //--------------------------------------5 puntos-------------------------------------------------
  //arriba, abajo, derecha, izquierda, y centro prendidos
  else if (central.state===1 && l.state===1 && r.state===1 && u.state===1 && d.state===1) return 0;
}

function keyReleased(){
   if(key==='q'||key==='Q'){
    console.log("The 'q||Q' key was released.");
    CustomSteps();
     console.log("Generacion: " + generation);
  }else if (key==='s'||key==='S'){
     console.log("The 's||S' key was released.");
     console.log("simulation");
    if(gameState===creation){
      gameState=simulation;
      generation=0;
    }
  }else if (key==='c'||key==='C'){
     console.log("The 'c||C' key was released.");
     console.log("creation");
    if (gameState===simulation){   
        gameState=creation;
    }
  }
}

function draw() {
    background(220);
  for (let i=0; i<totalSize;i++){
    grid[i].Render();
    }
  }