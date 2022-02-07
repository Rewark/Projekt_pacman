const MOVE_NORTH = 0;
const MOVE_EAST  = 1;
const MOVE_SOUTH = 2;
const MOVE_WEST  = 3;

const FIELD_TYPE_UNKNOWN = 0;
const FIELD_TYPE_TRAP = 3;

var Field = function(id, grid){
    this.id = id;
    this.type = FIELD_TYPE_UNKNOWN;
    this.pos = grid.coordinateFromId(id);
    this.neighbors = [null, null, null, null];
    this.item = null;
	
	this.requiredItem = null;
    //new 
    this.id_opponent = [];
    this.id_player = null;
    this.requiredItem_new = grid.numper_of_field **2;

  
}
//field north mit field touth verbonden 

Field.prototype.setNorth = function(north){
    this.neighbors[0] = north;
    north.neighbors[MOVE_SOUTH] = this;
}

Field.prototype.setEast = function(east){
    this.neighbors[1] = east;
    east.neighbors[MOVE_WEST] = this;
}

Field.prototype.setSouth = function(south){
    this.neighbors[2] = south;
    south.neighbors[MOVE_NORTH] = this;
}

Field.prototype.setWest = function(west){
    this.neighbors[3] = west;
    west.neighbors[MOVE_EAST] = this;
}

Field.prototype.move = function(direction){
    return this.neighbors[direction];
}



Field.prototype.draw = function(grid){
    grid.ctx.fillRect(this.pos.x * grid.field_width +1
                   , this.pos.y * grid.field_height +1
                   , grid.field_width -2
                   , grid.field_height -2);

    if(this.item){
        grid.ctx.drawImage(this.item.img
            ,              this.pos.x * grid.field_width 
            ,              this.pos.y *grid.field_height +4
            ,              grid.field_width / 2
            ,              grid.field_height / 2);
    }
}


Field.prototype.new_id = function(player_opponent,x,y){
	
	if(x == 1 && y==0){this.id_player=player_opponent.id;}
	else if(y == 1 && x==0){this.id_opponent.push(player_opponent.id);}
	if(this.id_player !== null && this.id_opponent.length != 0 && this.id_player == this.id_opponent[0])
	{alert("game over");}this.id_opponent.shift();
	
	
	
	
}

Field.prototype.all_item = function(player){
    if(player.item && player.item.length == this.reguierdItem_new){
        
        alert('WIN');
    
    }
}
