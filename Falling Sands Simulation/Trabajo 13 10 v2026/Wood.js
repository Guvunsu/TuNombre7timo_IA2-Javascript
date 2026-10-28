class Wood extends Cell{
  constructor(x, y, w, state){
    super(x, y, w, state, "wood");
  }
  Render(){
    fill(121, 85, 58);
    square(this.x, this.y, this.w);
  }
  Update(i,family){
  }
}