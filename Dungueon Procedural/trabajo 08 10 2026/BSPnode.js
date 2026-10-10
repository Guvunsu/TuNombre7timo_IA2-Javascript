class BSPnode {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.p_node = null;
    this.l_node = null;
    this.r_node = null;
  }

  AddBranches(depth) {
    // Caso base
    if (depth <= 1) return;
    /*let l_w;
    let l_h;
    let r_w;
    let r_h;*/
    // Elegimos automáticamente cómo dividir, 
    //si es mas ancho, division vertical
    //si es mas alto, division horizontal
    if (this.w >= this.h) {
      let temp_W = this.w * 0.5;

      this.l_node = new BSPnode(this.x, this.y, temp_W, this.h);
      this.r_node = new BSPnode(this.x + temp_W, this.y, temp_W, this.h);
    } else{     
      let temp_H = this.h * 0.5;
      
      this.l_node = new BSPnode(this.x, this.y, this.w, temp_H);
      this.r_node = new BSPnode(this.x, this.y + temp_H, this.w, temp_H);
}
    // Padres L y R
    this.l_node.p_node = this;
    this.r_node.p_node = this;

    // Recursividad
    let left = Math.floor(depth / 2);
    let right = depth - left;

    this.l_node.AddBranches(left);
    this.r_node.AddBranches(right);
  }

  Render() {
    if (this.l_node == null && this.r_node == null) {
      fill(random(255), random(255), random(255));
      rect(this.x,this.y,this.w,this.h);
      return;
    }
    // HIJO IZQUIERDO
    if (this.l_node != null) {
      this.l_node.Render();
    }
    // HIJO DERECHO
    if (this.r_node != null) {
      this.r_node.Render();
    }
  }
}