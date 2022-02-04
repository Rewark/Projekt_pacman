var start_time = new Date().getTime();
var current_time = new Date().getTime();
var backgroundColor = "#000000";

function displayHeader(ctx, player1){
    ctx.save();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    current_time = new Date().getTime();

    let delta_t = parseInt((current_time - start_time) /1000);
    let delta_m = parseInt(delta_t / 60);
    let delta_s = delta_t % 60;
    delta_m = delta_m < 10 ? ("0"+delta_m) : delta_m;
    delta_s = delta_s < 10 ? ("0"+delta_s) : delta_s;

    let zeittext = `Zeit ${delta_m} : ${delta_s} `;
    ctx.font = '24px Arial';
    ctx.fiellStyle = '#ff0000';
    ctx.fillText(zeittext, 5, 30);
}
var backgroundColor = "#000000";
function keyDown(evt){
    let defined_key = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
    console.log(evt.key);
    if(defined_key.includes(evt.key)){
        let direction = defined_key.indexOf(evt.key);
        
        if(this.moveInterval){
            clearInterval(this.moveInterval);
            this.moveInterval = null;

        }
        this.moveInterval =setInterval( () =>{
                this.player1.move(this.grid, direction)
                //this.opponent1.move(this.grid, direction)
            },200);
       // player1.move(grid, direction);
        evt.preventDefault();
    }

}




function redrawMaze( maze, grid ) {
    for( let y = 0; y < maze.length; y++){
        for( let x = 0; x < maze[0].length; x++ ) {
            maze[y][x].draw( grid );
        }
    }
}


function mouseMove(evt){
    let x = evt.offsetX;
    let y = evt.offsetY;

    let xpos = parseInt(x / game.grid.field_width);
    let ypos = parseInt(y / game.grid.field_height);

    let fieldNumber = ypos * game.grid.number_of_fields + xpos;
    document.title = xpos + ":" + ypos + ":" + fieldNumber;
}


