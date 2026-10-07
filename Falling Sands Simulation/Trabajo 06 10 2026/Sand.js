class Sand extends Cell{
  constructor(x, y, w, state){
    super(x, y, w, state, "grass");
  }
  Render(){
    fill(203, 189, 147);
    square(this.x, this.y, this.w);
  }
  Update(i,family){
    let [r,l,u,d] = family;

    //1. aplico caida
    if(family.down == null) return;

    //2. caida recta
    if(this.CanEnter(family.down)){
      MoveTo(i,i+gridSize);
      return;
    }

    //3. si no se pudo la caida recta, entonces, diagonal
    //3.1 definimos nuestras opciones
    //opcion A = down right

    let t_dr = (family.downRight != null)?grid[i+gridSize+1]:null;

    let t_dl = (family.downLeft!=null)?grid[i+gridSize-1]:null;

    let options = [];
    if(this.CanEnter(t_dr))options.push(i+gridSize+1);
    if(this.CanEnter(t_dl))options.push(i+gridSize-1);

    if(options.length>0){
      this.MoveTo(i,random(options));
    }

    //3. de los contrario me acumulo.
    
    /*if(family.downRight!=null){
      //porque esta en corchetes y no en parentesis (examen) es porque es una variable local y esta limitado en este 
      let t_downRight = grid[i+gridSize+1];
    }*/
  }
  
    MoveTo(from,to){
    let target = grid[to];
    let old_x=this.x;
    let old_y=this.y;

    target.x=old_x;
    target.y=old_y;

    grid[to]=this;
    grid[from]=target;

    this.SetDirtFlag(true);
  }
    
  CanEnter(cell){
    return cell != null && cell.type=="void";
  }
}