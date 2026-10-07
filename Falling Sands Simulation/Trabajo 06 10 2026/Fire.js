class Fire extends Cell{
  constructor(x, y, w, state){
    super(x, y, w, state, "fire");
  }
  Render(){
    fill(235,161,52);
    square(this.x, this.y, this.w);
  }
}