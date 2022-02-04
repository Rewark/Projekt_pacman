const MOVE_NORTH = 0;
const MOVE_EAST  = 1;
const MOVE_SOUTH = 2;
const MOVE_WEST  = 3;

var Field = function(id, grid){
    this.id = id;
    this.pos = grid.coordinateFromId(id);
    this.neighbors = [null, null, null, null];
    this.item = null;
    this.fielImage = null;

  
}
//field north mit field touth verbonden 
Field.prototype.setNorth = function(north){
    this.neighbors[0] = north;
   // north.neighbors[MOVE_SOUTH] = this;
}

Field.prototype.setEast = function(east){
    this.neighbors[1] = east;
    //east.neighbors[MOVE_WEST] = this;
}

Field.prototype.setSouth = function(south){
    this.neighbors[2] = south;
   // south.neighbors[MOVE_NORTH] = this;
}

Field.prototype.setWest = function(west){
    this.neighbors[3] = west;
    //west.neighborth[MOVE_EAST] = this;
}

Field.prototype.move = function(direction){
    return this.neighbors[direction];
}



Field.prototype.draw = function(grid){
    grid.ctx.fillRect(this.pos.x * grid.field_width +1
                   , this.pos.y * grid.field_height +1
                   , grid.field_width -2
                   ,grid.field_height -2);

    if(this.fieldImage){
        grid.ctx.drawImage(this.pos.x * grid.field_width
                        ,  this.pos.y * grid_field_height
                        ,   grid.field_width
                        ,   grid.field_height);
    }
}

Field.prototype.drawField = function(grid){
    grid.ctx.lineWidth = 1;
    if(!this.neighbors[0]){
        let border = grid.coordinateFromId(this.id);
        grid.ctx.beginPath();
        grid.ctx.moveTo(border.x * grid.field_width, border.y * grid.field_height);
        grid.ctx.lineTo((1 + border.x)* grid.field_width, border.y * grid.field_height);
        grid.ctx.stroke();
    }

    if(this.neighbors[1]){
        let border = grid.coordinateFromId(this.id);
        grid.ctx.beginPath();
        grid.ctx.moveTo((1 + border.x)* grid.field_width, border.y * grid.field_height);
        grid.ctx.lineTo((1 + border.x)* grid.field_width, (1 + border.y)* grid.field_height);
        grid.ctx.stroke();
    }

    if(this.neighbors[2]){
        let border = grid.coordinateFromId(this.id);
        grid.ctx.beginPath();
        grid.ctx.moveTo( border.x * grid.field_width, (1 + border.y)* grid.field_height);
        grid.ctx.lineTo((1 + border.x)* grid.field_width, (1 + border.y)* grid.field_height);
        grid.ctx.stroke();
    }

    if(this.neighbors[3]){
        let border = grid.coordinateFromId(this.id);
        grid.ctx.beginPath();
        grid.ctx.moveTo(border.x * grid.field_width, border.y * grid.field_height);
        grid.ctx.lineTo(border.x * grid.field_width, (1+ border)* grid.field_height);
        grid.ctx.stroke();
    }
}
