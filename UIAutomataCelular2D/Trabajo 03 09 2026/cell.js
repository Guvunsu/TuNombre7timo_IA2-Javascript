class Cell {
  constructor(x, y, w, state) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.state = state;
  }

  Render() {
    // Colores según el estado
    if (this.state === 0) {
      fill(0,100,100); 
    } else if (this.state === 1) {
      fill(100,0,100);
    }
    
    /*else if (this.state === 2) {
      fill(0, 250, 0); // verde
    } else if (this.state === 3) {
      fill(0, 0, 250); // azul
    } else {
      fill(200, 200, 0); // amarillo
    }*/

    //stroke(100);
    square(this.x, this.y, this.w);
  }

  SetNeighborhood(l, r, u, d) {
    this.l = l;
    this.r = r;
    this.u = u;
    this.d = d;
  }
}