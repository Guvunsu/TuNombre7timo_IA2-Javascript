let grid=[];
let gridSize=20;
let totalSize;
let canvasSize=600;
let cellSize;
let cellType=0;
let temp_family=[];

function setup() {
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
  frameRate(4);

  for (let i=0;i<totalSize;i++) {
    let d=grid[i+gridSize];
    temp_family.push(d);
    let u=grid[i-gridSize];
    temp_family.push(u);
    let r=grid[i+1];
    temp_family.push(r);
    let l=grid[i-1];
    temp_family.push(l);

    AnalizeFamily(i);
    
    //agua zone--------------------
      if(grid[i].type=="water"&&!grid[i].visited){
        /*if(u.tupe=="fire"||d.tupe=="fire"||r.tupe=="fire"||l.tupe=="fire"){
          grid[i]=new Steam(grid[i].x,grid[i].y,0);*/
        //}
        //este es el movimiento hacia abajo
        if(d!=null&&d.type=="void"){
          WaterSimulation(i,gridSize,d,1);
          ClearCell(i);
        }else{
          if(grid[i].direction==1){
            if(r!= null&&r.type=="void"){
              WaterSimulation(i, 1, r, 1);
              ClearCell(i);
            }else grid[i].SetDirection(-1);
        }
         if(grid[i].direction==-1){
           if(l!= null&&l.type=="void"){
             WaterSimulation(i,-1,l,1);
             ClearCell(i);
           }else grid[i].SetDirection(1);
         }
       } 
     }
    //agua zone--------------------------

      // fire zone -------------------------
        if(grid[i].type=="fire"&&!grid[i].visited){
          
        }
        temp_family=[];
  }   // cierra el for
  for (let i = 0; i < totalSize; i++) {
    grid[i].Render();
    grid[i].SetDirtFlag(false);
  }
}

function ClearCell(i){
  grid[i] = new Cell(grid[i].x, grid[i].y, grid[i].w, 0, "void");
  //grid[i].SetDirtFlaf(true);
}

//ej:: Mover hacia abajo -> watersimulatrion (i,gridSize,d,1)
function WaterSimulation(i, place, neighbor, state){
  grid[i+place] = new Water(neighbor.x, neighbor.y, neighbor.w, state);
  grid[i].SetDirtFlag(true);
  //marca la celda destino como ya movida este frame
  grid[i+place].SetDirtFlag(true);
  grid[i+place].SetDirection(grid[i].direction);
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
        grid[i] = new Water(temp_cell.x, temp_cell.y, temp_cell.w, 1);
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
    }
  }
}

function isHovering(temp_cell){
  if(mouseX>temp_cell.x&&mouseX<temp_cell.x+cellSize&&mouseY>temp_cell.y&&mouseY<temp_cell.y+cellSize) return true;
  else return false;
}

function AnalizeFamily(currentIndex){
  if(grid[currentIndex].type!="water") return;
  
  for(let i=0;i<4;i++){
    if(temp_family[i]!=null&&temp_family[i].type=="fire"){
      grid[currentIndex]=new Steam(grid[currentIndex].x,grid[currentIndex].y,cellSize,0);
      grid[currentIndex].SetDirtFlag(false);
      break;
    }
  }
}

function keyReleased(){
  if(key === '0') cellType = 0;      // vacío
  else if(key === '1') cellType = 1; // agua
  else if(key === '2') cellType = 2; // roca
  else if(key === '3') cellType = 3; // fuego
}