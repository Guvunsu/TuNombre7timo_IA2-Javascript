//Los estados del agua:
//1. Caida por gravedad
//2. Colisiones
//3. Expansion (dispersion)
//4. Acumulacion

//pregunta de examen ¿que nombre recibe la clase super ?clase padre, super clase, clase base

//que el steam se mueva hacia arriba y respetando los solidos 

class Water extends Cell{
 constructor(x, y, w, state){
    super(x, y, w, state, "water");
   // this.direction = 1;
   //this.visited = false;
  }
  
    Render(){
    //paso 2 .- asigno un color por estado
   if(this.state===3) fill(0, 100, 255);
   if(this.state===2) fill(33, 118, 255);
   if(this.state===1) fill(113, 179, 255);
   // noStroke();
    square(this.x, this.y, this.w);
  }
  
  //aqui es el comportamiento principal del agua. Lo llamamos 1 vez por frame
  Update(i,family){
    // up[0]  right[1] down [2] left[3] 
    //1. discrimino solo las celulas que si necesito (von neuman)
    let orthogonal = [family.up,family.right,family.down,family.left];

     if(this.GrowGrass(i,family)) return;
    
    //2. corroborar si toca el fuego 
    if(this.TouchFire(orthogonal)){
      grid[i]= new Steam(this.x,this.y,this.w,0);
      grid[i].SetDirtFlag(true);
      return;
    }

    //1.- aplicamos gravedad, 
    if(this.isVoid(family.down)){
      this.MoveTo(i,i+gridSize);
      return;
    }
    //2.- separamos la gota
    if(this.state > 1){
      this.Split(i,family.right,family.left);
      return;
    }
    //3.- flujo
    this.Flow(i,family.right,family.left);
  }

  isVoid(cell){
    return cell != null && cell.type=="void";
  }

  TouchFire(family){
    //c es una celula en la familia 
    return family.some(c=>c != null && c.type=="fire");
  }
 MoveTo(from,to){
    let target = grid[to];
    let old_x=this.x;
    let old_y=this.y;
    let target_x=target.x;
    let target_y=target.y;

    target.x=old_x;
    target.y=old_y;

    this.x=target_x;
    this.y=target_y;

    grid[to]=this;
    grid[from]=target;
    this.SetDirtFlag(true);
}

  Flow(i,r,l){
    //derecha
    if(this.direction ==1){
      if(this.isVoid(r)){
        this.MoveTo(i,i+1);
        return;
      }
      this.SetDirection(-1);
    }
      //izquierda
    if(this.direction ==-1){
      if(this.isVoid(l)){
        this.MoveTo(i,i-1);
        return;
      }
      this.SetDirection(1);
    }
  }

  Split(i,r,l){
    if(this.isVoid(r) && this.state >1)
      this.SpawnDrop(i+1,r,1);
      if(this.isVoid(l) && this.state>1)
        this.SpawnDrop(i-1,l,-1);
  }

  SpawnDrop(index,cell,dir){
    let drop = new Water(cell.x,cell.y,cell.w,1);
    drop.SetDirection(dir);
    drop.SetDirtFlag(true);
    grid[index]=drop;
    this.state--;
  }

  GrowGrass(i,family){
    let orthogonal = [family.up,family.right,family.down,family.left];
    if(orthogonal.some(c=>c!=null && c.type=="grass")){
      //nace pasto nuevo en la direccion que caia el agua (abajo)
      let fallCell = family.down;
      if(fallCell!=null && fallCell.type=="void"){
        grid[i+gridSize] = new Grass(fallCell.x,fallCell.y,fallCell.w,1);
        grid[i+gridSize].SetDirtFlag(true);
      }
      //el agua desaparece
      grid[i] = new Cell(this.x,this.y,this.w,0,"void");
      grid[i].SetDirtFlag(true);
      return true;
    }
    return false;
}
}