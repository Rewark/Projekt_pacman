
var Player = function(name, current_field, color){
    this.name = name;
    this.current_field = current_field;
    this.color = color;
    this.punkte = 0;
    this.playerImage = null;
    this.init();
}

Player.prototype.init = function(){
    this.playerImage = new Image();
    this.playerImage.src = 'images/pac1.png';

}

Player.prototype.drawPlayerPosition = function(grid){
    var start_coord = grid.coordinateFromId(this.current_field.id);
    let target_width = 0;
    let target_height = 0;
    let target_x = start_coord.x * grid.field_width +1;
    let target_y = start_coord.y * grid.field_height +1;
    let ratio = 0;

    if(grid.field_width > grid.field_height){
        ratio = this.playerImage.width / this.playerImage.height;
        target_height = (grid.field_height -2) / 2;
        target_width = target_height * ratio;
       // target_x += (grid.field_width / 2) - (target_width / 2);
        //target_y += (grid.field_height /2) - (target_height /2);
    }else{
        ratio = this.playerImage.height / this.playerImage.width;
        target_width = (grid.field_width -2) / 2;
        target_height = target_width * ratio;

    }
    target_x += (grid.field_width / 2) - (target_width / 2);
    target_y += (grid.field_height /2) - (target_height /2);
    grid.ctx.beginPath();
    grid.ctx.fillStyle = this.color;
    grid.ctx.drawImage(this.playerImage
             ,         target_x
             ,         target_y
             ,         target_width
             ,         target_height);

    grid.ctx.fill();
}

Player.prototype.move = function(grid, direction){
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
        this.punkte++;

        this.current_field.draw(grid);

        this.current_field = this.current_field.neighbors[direction];

        this.drawPlayerPosition(grid);
    }
}
