class Fire extends Cell{
  constructor(x, y, w, state){
    super(x, y, w, state, "fire");
  }
  
  Render(){
    fill(250, 57, 70);
    square(this.x, this.y, this.w);
  }
  
  Update(i,family){
    let {up, upRight, right, downRight, down, downLeft, left, upLeft} = family;
    
    FireExpansion(i,1,right,1);
    FireExpansion(i,-1,left,1);
    FireExpansion(i,-gridSize,up,1);
    FireExpansion(i,gridSize,down,1);
  }
}