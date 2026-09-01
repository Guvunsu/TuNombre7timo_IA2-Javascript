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
}

function CreateGrid(){
    for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
//le puedo poner 1,2,3,4,5 para que sea aleatorio con respecto al Render() por mi cantidad de colores que tengo en mi condicionales, pero poner 6 para que salgan todos
//variable nueva 01 09 2026
      let randomState = int(random(6));
      let temp_cell = new Cell(x*cellSize, y*cellSize, cellSize, randomState);//quite el ,0 -> para colocar randomState
      grid.push(temp_cell);
    }
  }
}

function draw() {
    background(220);
  for (let g of grid) {
    g.Render();
  }
}

