class Steam extends Cell{
  constructor(x, y, w, state){
    super(x, y, w, state, "steam");
  }
  Render(){
    fill(255, 255, 255);
    square(this.x, this.y, this.w);
  }

  Update(i,family){
    //1. aplico ascenso
    if(family.up == null) return;

    //2. ascenso recto
    if(this.CanEnter(family.up)){
      this.MoveTo(i,i-gridSize);
      return;
    }

    //3. si no se pudo el ascenso recto, entonces, diagonal
    let t_ur = family.upRight;
    let t_ul = family.upLeft;

    let options = [];
    if(this.CanEnter(t_ur))options.push(i-gridSize+1);
    if(this.CanEnter(t_ul))options.push(i-gridSize-1);

    if(options.length>0){
      this.MoveTo(i,random(options));
    }

    //4. de lo contrario se queda ahi.
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
