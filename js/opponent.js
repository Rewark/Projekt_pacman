var Opponent = function (name, target_field, current_field ){
    this.name = name;
    this.target_field = target_field;
    this.opponentImage = null;
    this.current_field = current_field;
    
    this.init();
}

Opponent.prototype.init = function(){
    this.opponentImage = new Image();
    this.opponentImage.src ='images/scaredGhost.png';
    this.opponentImage.src ='images/scaredGhost2.png';
}

Opponent.prototype.drawOpponentPosition = function(grid){
    start_coord  = grid.coordinateFromId( this.target_field.id);
		
	
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
            if(this.current_field.neighbors[direction]=== null){
                console.log("Du kannst nicht nach Norden gehen!");
                moved = false;
            }
            break;
        case MOVE_EAST:
            if(this.current_field.neighbors[direction]=== null){
                console.log("Du kannst nicht nach Osten gehen!");
                moved = null;
            }
            break;
        case MOVE_SOUTH:
            if(this.current_field.neighbors[direction]=== null){
                console.log("Du kannst nicht nach Süden gehen!");
                moved = false;
            }
            break;
        case MOVE_WEST:
            if(this.current_field.neighbors[direction]=== null){
                console.log("Du kannst nicht nach Westen gehen!");
                 moved = false;
            }
            break;
            
    }

    if(moved){
       

        this.current_field.draw(grid);

        this.current_field = this.current_field.neighbors[direction];

        this.drawOpponentPosition(grid);
    }
}
