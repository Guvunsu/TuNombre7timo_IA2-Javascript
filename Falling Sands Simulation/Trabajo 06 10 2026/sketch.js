let grid=[];
let gridSize=20;
let totalSize;
let canvasSize=600;
let cellSize;
let cellType=0;

function setup() {
  let canvas = createCanvas(canvasSize,canvasSize);
  frameRate(4);
  totalSize=gridSize*gridSize;
  cellSize=canvasSize/gridSize;
  CreatedGrid();
  canvas.mousePressed(EditAutomata);//mouseMoved()
}

function CreatedGrid(){
  for(let y=0; y<gridSize; y++){
    for (let x=0; x<gridSize; x++){
      grid.push(new Cell(x*cellSize, y*cellSize,cellSize,0,"void"));
    }
  }
}

function draw() {
  background(220);

  for (let i=0;i<totalSize;i++) {
    let cell = grid[i];
    if(cell.visited)continue;

    //ver min 29
if(cell.type=="water"||cell.type=="rock"||cell.type=="steam"||cell.type=="fire"||cell.type=="grass")
      cell.Update(i,GetMooreFamily(i));
  }
  
  for (let i = 0; i < totalSize; i++) {
    grid[i].Render();
    grid[i].SetDirtFlag(false);
  }
}

/*
function GetFamily(i){
  let col=i%gridSize;

  let u = (i-gridSize >=0)?grid[i-gridSize]:null;
  let r = (col<gridSize-1)?grid[i+1]:null;
  let d = (i+gridSize<totalSize)?grid[i+gridSize]:null;
  let l = (col>0)?grid[i-1]:null;

  return[u,r,l,d];
}
*/

function GetMooreFamily(i){
  let col = i%gridSize;
  let row =floor(i/gridSize);

  let hasUp = row>0;
  let hasDown =row<gridSize-1;
  let hasLeft = col > 0;
  let hasRight = col < gridSize-1;

  //sentido de las manecillas del reloj
  let up,upRight,right,downRight,down,downLeft,left,upLeft;

    up = hasUp ? grid[i-gridSize] :null;
  upRight = (hasUp && hasRight) ? grid[i-gridSize+1] :null;
  right = hasRight ? grid[i+1] :null;
  downRight = (hasDown && hasRight) ? grid[i+gridSize+1] :null;
  down = hasDown ? grid[i+gridSize] :null;
  downLeft = (hasDown && hasLeft) ? grid[i+gridSize-1] :null;
  left = hasLeft ? grid[i-1] :null;
  upLeft = (hasUp && hasLeft) ? grid[i-gridSize-1] :null;

  return [up, upRight, right, downRight, down, downLeft, left, upLeft];
}

function ClearCell(i){
  grid[i] = new Cell(grid[i].x, grid[i].y, grid[i].w, 0, "void");
  //grid[i].SetDirtFlaf(true);
}

//ej:: Mover hacia abajo -> watersimulatrion (i,gridSize,d,1)
function WaterSimulation(i, place, neighbor, state){
  grid[i+place] = new Water(neighbor.x, neighbor.y, neighbor.w, grid[i].state);
  grid[i].SetDirtFlag(true);
  //marca la celda destino como ya movida este frame
  grid[i+place].SetDirtFlag(true);
  grid[i+place].SetDirection(grid[i].direction);
}

//ej:: Mover hacia arriba -> SteamSimulator (i,gridSize,u,-1)
function SteamSimulator(i,place,neighbor,state){
  grid[i-place]=new Steam(neighbor.x,neighbor.y,neighbor.w,state);
  grid[i].SetDirtFlag(true);

  grid[i-place].SetDirtFlag(true);
  grid[i-place].SetDirection(grid[i].direction);
}

function EditAutomata(){
  for(let i=0; i<totalSize; i++){
    let temp_cell = grid[i];
    if(isHovering(temp_cell)){

      if(cellType === 0){
        grid[i] = new Cell(temp_cell.x, temp_cell.y, temp_cell.w, 0, "void");
        break;
      }
      if(cellType === 1){
        // paso 1 .- agua ahora tiene estado 3 (es decir su densidad es de 3)
        grid[i] = new Water(temp_cell.x, temp_cell.y, temp_cell.w, 3);
        grid[i].SetDirection[1];
        break;
      }
      if(cellType === 2){
        grid[i] = new Rock(temp_cell.x, temp_cell.y, temp_cell.w, 1);
        break;
      }
      if(cellType === 3){
        grid[i] = new Fire(temp_cell.x, temp_cell.y, temp_cell.w, 1);
        break;
      }
      if(cellType === 4){
        grid[i] = new Grass(temp_cell.x, temp_cell.y, temp_cell.w, 1);
        break;
      }
        if(cellType === 5){
        grid[i] = new Sand(temp_cell.x, temp_cell.y, temp_cell.w, 1);
        break;
      }
    }
  }
}

function isHovering(temp_cell){
  if(mouseX>temp_cell.x&&mouseX<temp_cell.x+cellSize&&mouseY>temp_cell.y&&mouseY<temp_cell.y+cellSize) return true;
  else return false;
}

function AnalizeFamily(currentIndex){
  if(grid[currentIndex].type!="water") return;3
  
  for(let i=0;i<4;i++){2
    if(temp_family[i]!=null&&temp_family[i].type=="fire"){
      grid[currentIndex]=new Steam(grid[currentIndex].x,grid[currentIndex].y,grid[currentIndex].w,0);
      grid[currentIndex].SetDirtFlag(true); //lo tenia en false
      break;
    }
  }
}

function keyReleased(){
  if(key === '0') cellType = 0;      // vacío
  else if(key === '1') cellType = 1; // agua
  else if(key === '2') cellType = 2; // roca
  else if(key === '3') cellType = 3; // fuego
  else if(key === '4') cellType = 4; // pasto
  else if(key === '5') cellType = 5; // arena
}