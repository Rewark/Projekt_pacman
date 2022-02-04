var Game = function (){
    this.grid = null;
    this.player1 = null;
    this.opponent1 = null;
    this.debug = false;

}

Game.prototype.init = function(){
   var title = document.getElementById('title');
   var titlectx = title.getContext('2d');


    
    var canvas =  document.getElementById('canvas');
    canvas.onmousemove = mouseMove;
    canvas.onkeydown = keyDown;
    document.body.onkeydown = keyDown.bind(this);



   
    
  
    this.grid = new Grid( canvas, 10);
    this.grid.drawGrid();
    
    var maze = cereateMaze(this.grid);
    var start_field = getRandomField(this.grid, maze);
    var target_field = null;
    

    do{
        target_field = getRandomField(this.grid, maze);
    }while(start_field.id == target_field.id);

    this.opponent1 = new Opponent("gegner1",target_field, "#00000");
    
    
    this.opponent1.drawOpponentPosition(this.grid);
    
    this.opponent1.opponentImage.onload = () =>{
        this.opponent1.drawOpponentPosition(this.grid);
    }
    
    this.player1 = new Player("Spieler 1", start_field, "#000000");

    setInterval(displayHeader, 100, titlectx);
    //start_field.draw(grid);
    //target_field.draw(grid);

    redrawMaze( maze, this.grid ) ;

    this.player1.drawPlayerPosition(this.grid);

    this.player1.playerImage.onload = () =>{
        this.player1.drawPlayerPosition(this.grid);
    }

  // if(this.debug){
    console.log(start_field);
   //}
}