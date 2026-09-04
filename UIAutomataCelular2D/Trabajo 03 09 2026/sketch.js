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
  
  for(let i=gridSize;i<totalSize-gridSize;i+=gridSize){
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

function draw() {
    background(220);
  for (let i=0; i<totalSize;i++){
    grid[i].Render();
  }
 /* for (let g of grid) {
    g.Render();
  }*/
}

