class Rock extends Cell{
  constructor(x, y, w, state){
    super(x, y, w, state, "rock");
  }
  Render(){
    fill(90, 70, 50);
    square(this.x, this.y, this.w);
  }
   Update(i,family){
  }
}