class Cell{
  constructor(x, y, w, state, type){
    this.x = x;
    this.y = y;
    this.w = w;
    this.state = state;
    this.type = type;
    this.visited = false;
    this.direction = null;
  }
Render(){
    if(this.state===1){
      fill(0,0,100);
    }else fill (100);
    square (this.x,this.y,this.w);
  }
  SetDirtFlag(flag){
    this.visited = flag;
  }
  SetDirection(direction){
    this.direction = direction;
  }
}