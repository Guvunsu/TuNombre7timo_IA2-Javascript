let mapSize=800;
let gridSize=40;
let cellSize;

let root;

function setup() {
  createCanvas(800, 800);
  cellSize=gridSize/cellSize;

  root=new BSPnode(0,0,mapSize,mapSize);
  root.AddBranches(4);
}

function draw() {
  background(10);
  root.Render();
}