var Game = function (){
    this.grid = null;
    this.player1 = null;
    this.opponent2 = null;
    this.opponent1 = null; 
     
}

Game.prototype.init = function(){
   var title = document.getElementById('title');
   var titlectx = title.getContext('2d');


    
    var canvas =  document.getElementById('canvas');
    canvas.onmousemove = mouseMove;
    canvas.onkeydown = keyDown;
    document.body.onkeydown = keyDown.bind(this);
    
  
    this.grid = new Grid(canvas, 10);
    this.grid.drawGrid();

    var maze = cereateMaze(this.grid);
    var start_field = getRandomField(this.grid, maze);
    var target_field = null;
  
        target_field = getRandomField(this.grid, maze);
        start_field = getField_id(this.grid, maze, 0);
        opponent_field = getField_id(this.grid, maze, parseInt((2*(this.grid.number_of_fields**2)/3)));
        opponent_field2 = getField_id(this.grid, maze, parseInt((2*(this.grid.number_of_fields**2)/3)+1));

        var item = new Item("yelloDot", ITEM_TYPE_YELLODOT , "img/yellowDot.png");

        var itemFeld = Array((this.grid.number_of_fields**2));
	
        for(let i=0,y=0 ; i< itemFeld.length;i++,y++){
            if(start_field.id  != i &&  opponent_field.id != i){
                //arr_new.push(i);
                itemFeld.id=i;
                itemFeld[y]= getField_id( this.grid, maze ,i);
                itemFeld[y].item = item ; 
                
            }else{y--;}
        }
        
    this.opponent1 = new Opponent("gegner1",opponent_field);
    this.opponent1.drawOpponentPosition(this.grid, 1);
    
    this.opponent1.opponentImage.onload = () =>{
        this.opponent1.drawOpponentPosition(this.grid, 1);
    }

    //Das ist Gegner 2 funktionirt auch 
    //
    this.opponent2 = new Opponent("gegner2", opponent_field2);
    this.opponent2.drawOpponentPosition(this.grid, 2);
    
    this.opponent2.opponentImage.onload = () =>{
        this.opponent2.drawOpponentPosition(this.grid, 2);
    }

    setInterval( () => {

		let x = 4;
		this.opponent1.move( this.grid, parseInt( Math.random() * x ));
       // this.opponent2.move( this.grid, parseInt( Math.random() * x ));
	},  300 );
    
    this.player1 = new Player("Spieler 1", start_field, "#000000");

    setInterval(displayHeader, 100, titlectx );
    //start_field.draw(grid);
    //target_field.draw(grid);

    redrawMaze( maze, this.grid ) ;

    this.player1.drawPlayerPosition(this.grid);

    this.player1.playerImage.onload = () =>{
        this.player1.drawPlayerPosition(this.grid);
    }
     

}