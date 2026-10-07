class Steam extends Cell{
  constructor(x, y, w, state){
    super(x, y, w, state, "steam");
  }
  Render(){
    fill(255, 255, 255);
    square(this.x, this.y, this.w);
  }
}