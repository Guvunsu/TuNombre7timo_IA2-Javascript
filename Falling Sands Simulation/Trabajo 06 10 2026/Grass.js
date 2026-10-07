class Grass extends Cell{
  constructor(x, y, w, state){
    super(x, y, w, state, "grass");
  }
  Render(){
    fill(63, 155, 11);
    square(this.x, this.y, this.w);
  }
  Update(i,family){
    let [r,l,u,d] = family;

    
  }
}