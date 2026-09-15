class Cell{
  constructor(x,y,w,state,type){
    this.x = x;
    this.y = y;
    this.w = w;
    this.state=state;
    this.type=type;
  }
  Render(){
    if(this.state===1){
      fill(0,0,100);
    }else fill (100);
    square (this.x,this.y,this.w);
  }
}