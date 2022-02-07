var Opponent = function (name, opponent_field ){
    this.name = name;
    this.opponentImage = null;
    this.opponent_field = opponent_field;
    
    this.init();
}

Opponent.prototype.init = function(){
    this.opponentImage = new Image();
    if(this.name == "gegner1"){
    this.opponentImage.src ='img/scaredGhost.png';
    }else if(this.name == "gegner2"){
    
    this.opponentImage.src ='img/scaredGhost2.png';
    }
}

Opponent.prototype.drawOpponentPosition = function(grid, x){
    start_coord  = grid.coordinateFromId( this.opponent_field.id);
		
	
    let target_width = 0;
    let target_height = 0;
    let target_x = start_coord.x * grid.field_width +1;
    let target_y = start_coord.y * grid.field_height +1;
    let ratio = 0;
    if(grid.field_width > grid.field_height){
         ratio = this.opponentImage.width / this.opponentImage.height;
        target_height = (grid.field_height -2) / 2;
        target_width = target_height * ratio;

    }else{
         ratio = this.opponentImage.height / this.opponentImage.width;
        target_width = (grid.field_width -2) / 2;
        target_height = target_width * ratio;

    }
    target_x += (grid.field_width / 2) - (target_width / 2);
    target_y += (grid.field_height /2) - (target_height /2);
    grid.ctx.beginPath();
    grid.ctx.drawImage(this.opponentImage
             ,         target_x
             ,         target_y
             ,         target_width
             ,         target_height);
}

Opponent.prototype.move = function(grid, direction){
    let moved = true;

    switch(direction){
        case MOVE_NORTH:
            if(this.opponent_field.neighbors[direction]=== null){
                moved = false;
            }
            break;
        case MOVE_EAST:
            if(this.opponent_field.neighbors[direction]=== null){
                moved = false;
            }
            break;
        case MOVE_SOUTH:
            if(this.opponent_field.neighbors[direction]=== null){
                moved = false;
            }
            break;
        case MOVE_WEST:
            if(this.opponent_field.neighbors[direction]=== null){
                 moved = false;
            }
            break;
            
    }

    if(moved){
       

        this.opponent_field.draw(grid);

        this.opponent_field = this.opponent_field.neighbors[direction];

        this.drawOpponentPosition(grid);

        this.opponent_field.new_id(this, 0, 1);
      
    }
}
