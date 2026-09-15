class Water extends Cell{
  //Los estados del agua:
  //1. Caida por gravedad
  //2. Colisiones
  //3. Expansion (dispersion)
  //4. Acumulacion

  constructor(x,y,w,state){
    super(x,y,w,state,"agua");
  }
  Render(){
    fill(0,0,255);
    square(this.x,this.y,this.w);
  }
}