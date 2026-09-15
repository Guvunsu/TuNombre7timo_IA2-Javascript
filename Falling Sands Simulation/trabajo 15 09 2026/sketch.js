let grid=[];
let gridSize=20;
let totalSize;
let canvasSize=600;
let cellSize;
let cellType=0;

function setup() {
  createCanvas(400, 400);

  let canvas = createCanvas(canvasSize,canvasSize);
  totalSize=gridSize*gridSize;
  cellSize=canvasSize/gridSize;
  CreatedGrid();
  canvas.mousePressed(EditAutomata);//mouseMoved()
}

function CreatedGrid(){
  for(let y=0; y<gridSize; y++){
    for (let x=0; x<gridSize; x++){
      let temp_cell = new Cell(x*cellSize, y*cellSize,cellSize,0,"void");
      grid.push(temp_cell);
    }
  }
}

function draw() {
  background(220);
  for (let i = 0; i < grid.length; i++) {
    grid[i].Render();
    }
  }

function EditAutomata(){
  for(let i=0;i<totalSize;i++){
    let temp_cell=grid[i];
    if(isHovering(grid[i])){
      if(cellType===1){
        grid[i]=new Water(temp_cell.x,temp_cell.y,temp_cell.w,cellSize,1);
        break;
      }
    }
  }
}

function isHovering(temp_cell){
  if(mouseX>temp_cell.x&&mouseX<temp_cell.x+cellSize&&mouseY>temp_cell.y&&mouseY<temp_cell.y+cellSize) return true;
  else return false;
}

function keyReleased(){
  //vacio
  if(key==='0'){
    cellType=0;
  }
  //agua  
  else if(key==='1'){
    cellType=1;
  }
  //
}