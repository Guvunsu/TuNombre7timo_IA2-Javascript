class Lava extends Cell{
  constructor(x, y, w, state){
    super(x, y, w, state, "lava");
  }
  Render(){
    fill(207, 16, 32);
    square(this.x, this.y, this.w);
  }
 Update(i,family){
    //0. si toca agua, se convierte en roca
    if(this.TouchWater(i,family)) return;

    //0.1 si toca pasto o madera, los prende
    if(this.Ignite(i,family)) return;

    //0.2 si toca roca, la derrite (la quita)
    if(this.MeltRock(i,family)) return;

    //1. aplico caida
    if(family.down == null) return;

    //2. caida recta
    if(this.CanEnter(family.down)){
      this.MoveTo(i,i+gridSize);
      return;
    }

    //3. si no se pudo la caida recta, entonces, diagonal
    let t_dr = (family.downRight != null) ? family.downRight : null;
    let t_dl = (family.downLeft != null) ? family.downLeft : null;

    let options = [];
    if(this.CanEnter(t_dr))options.push(i+gridSize+1);
    if(this.CanEnter(t_dl))options.push(i+gridSize-1);

    if(options.length>0){
      this.MoveTo(i,random(options));
    }
}

  Ignite(i,family){
    let before = [grid[i+gridSize], grid[i+1], grid[i-1], grid[i-gridSize]];

    FireExpansion(i, gridSize, family.down, 1);
    FireExpansion(i, 1, family.right, 1);
    FireExpansion(i, -1, family.left, 1);
    FireExpansion(i, -gridSize, family.up, 1);

    let after = [grid[i+gridSize], grid[i+1], grid[i-1], grid[i-gridSize]];
    return before.some((cell,idx)=>cell!==after[idx]);
}

  TouchWater(i,family){
    let orthogonal = [family.up,family.right,family.down,family.left];
    if(orthogonal.some(c=>c!=null && c.type=="water")){
      grid[i] = new Rock(this.x,this.y,this.w,1);
      grid[i].SetDirtFlag(true);
      return true;
    }
    return false;
  }

  MeltRock(i,family){
    if(family.down!=null && family.down.type=="rock"){
      grid[i+gridSize] = new Cell(family.down.x,family.down.y,family.down.w,0,"void");
      grid[i+gridSize].SetDirtFlag(true);
      return true;
    }
    if(family.right!=null && family.right.type=="rock"){
      grid[i+1] = new Cell(family.right.x,family.right.y,family.right.w,0,"void");
      grid[i+1].SetDirtFlag(true);
      return true;
    }
    if(family.left!=null && family.left.type=="rock"){
      grid[i-1] = new Cell(family.left.x,family.left.y,family.left.w,0,"void");
      grid[i-1].SetDirtFlag(true);
      return true;
    }
    if(family.up!=null && family.up.type=="rock"){
      grid[i-gridSize] = new Cell(family.up.x,family.up.y,family.up.w,0,"void");
      grid[i-gridSize].SetDirtFlag(true);
      return true;
    }
    return false;
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
    
  CanEnter(cell){
    return cell != null && cell.type=="void";
  }
}