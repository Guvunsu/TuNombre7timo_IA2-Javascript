//Los estados del agua:
//1. Caida por gravedad
//2. Colisiones
//3. Expansion (dispersion)
//4. Acumulacion
class Water extends Cell{
 constructor(x, y, w, state){
    super(x, y, w, state, "water");
    this.direction = 1;
    this.visited = false;
  }
  Render(){
    fill(0, 100, 255);
   // noStroke();
    square(this.x, this.y, this.w);
  }
}