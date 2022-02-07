function cereateMaze( grid ) {
	//debugger;


	let visited_fields = [];
	let stack = [];
	
	let total_fields = grid.number_of_fields**2; 
	
	let current_field = parseInt( Math.random() * total_fields );
	
	let xpos = parseInt( current_field % grid.number_of_fields) * grid.field_width;
	let ypos = parseInt( current_field / grid.number_of_fields )* grid.field_height;

	let field_array = new Array( grid.number_of_fields ).fill(0).map( a => new Array( grid.number_of_fields ).fill(0) );
	
	
	// Aufruf der Funktion getCoordinateFromId, übergebe die Werte grid und current_field
	let current_coord = grid.coordinateFromId( current_field);
	
	
	
	// Zugriff auf das mehrdimensionale Array mit den Koordinaten aus current_coord
	// Erzeugt in dem gewählten Feld ein Objekt vom Typ Field
	
	field_array[current_coord.y][current_coord.x] = new Field( current_field, grid );
	
	let start_field = field_array[current_coord.y][current_coord.x]; 
	
	

	// Zeichne das Startfeld

	start_field.draw(grid);
	
	visited_fields.push( current_field );
	stack.push( current_field );
	
	
	
	// Backtrack - Algorithmus 
	while( stack.length > 0 ){
		
		let possible_direction = getDirections( grid, current_field, visited_fields);
		if( possible_direction.every( item => item === false ) ) {
			current_field = stack.pop();
			console.log(`keine Richtung möglich-gehe zurück zu Feld ${current_field}`);
			continue;
		}
		

		let target_field = false;
		let direction = -1;
		
		while( target_field === false) {
			direction =  parseInt( Math.random() * possible_direction.length);
			target_field = possible_direction[ direction ];
		}
		
		// An dieser Stelle haben wir die neue Feldposition
		current_coord = grid.coordinateFromId( current_field);
		target_coord  = grid.coordinateFromId( target_field);
		
		field_array[target_coord.y][target_coord.x] = new Field( target_field, grid );
		
		
		switch(direction) {
				case MOVE_NORTH:
				field_array[current_coord.y][current_coord.x].setNorth( field_array[target_coord.y][target_coord.x] );
				break;
				
				case MOVE_EAST:
				field_array[current_coord.y][current_coord.x].setEast( field_array[target_coord.y][target_coord.x] );
				break;
				
				
				case MOVE_SOUTH:
				field_array[current_coord.y][current_coord.x].setSouth( field_array[target_coord.y][target_coord.x] );
				break;
				
				case MOVE_WEST:
				field_array[current_coord.y][current_coord.x].setWest( field_array[target_coord.y][target_coord.x] );
				break;
					
		}
		
		let start_x = Math.min( current_coord.x, target_coord.x ) ;
		let start_y = Math.min( current_coord.y, target_coord.y ) ;
		
		let target_x = Math.max( current_coord.x, target_coord.x );
		let target_y = Math.max( current_coord.y, target_coord.y );
		
		grid.ctx.fillStyle=backgroundColor;
		
		// Überzeichnet die Rechtecke und stellt grafisch die Verbindungen der einzelnen Felder dar
		grid.ctx.fillRect( 	start_x * grid.field_width + 1
						,  	start_y * grid.field_height + 1
						,   grid.field_width  * (start_x != target_x ? 2 : 1) - 2
						,   grid.field_height * (start_y != target_y ? 2 : 1) - 2);


		
		visited_fields.push( target_field);
		stack.push( target_field );
		if(this.debug){
			console.log( `gehe zu Feld: ${target_field}` );
		}
		current_field = target_field;
		

		

		
	}


				
	return field_array; // Gibt das Feld zurück, welches zuerst erstellt wurde
}





// Funktion zur Ausgabe aller möglichen FeldId-Nachbarn, welche noch nicht besucht wurden
// Der Parameter STACK wird entfernt, da dieser nicht genutzt wird.
function getDirections ( grid, current_field, visited_fields ) {
	
	let directions = [false,false,false,false];
	let temp_field = 0;
	let total_fields = grid.number_of_fields**2; 

	// North
	if( current_field  >= grid.number_of_fields ) {
		temp_field = current_field - grid.number_of_fields;
		if( !visited_fields.includes(temp_field) ) {
			directions[0] = temp_field;
		}
	}
	
	// South
	if( current_field + grid.number_of_fields < total_fields ) {
		temp_field = current_field + grid.number_of_fields;
		if( !visited_fields.includes(temp_field) ) {
			directions[2] = temp_field;
		}		
	}
	
	// East 
	if( parseInt( current_field % grid.number_of_fields) < grid.number_of_fields-1 ) {
		temp_field = current_field + 1;
		if( !visited_fields.includes(temp_field) ) {
			directions[1] = temp_field;
		}		
	}

	// West
	if( parseInt( current_field % grid.number_of_fields)  > 0 )  {
		temp_field = current_field - 1;
		if( !visited_fields.includes(temp_field) ) {
			directions[3] = temp_field;
		}
	}

	return directions;
	
}

function getRandomField(grid, field_array){
	let total_fields = grid.number_of_fields **2;
	let random_field = parseInt(Math.random()* total_fields);
	let coord = grid.coordinateFromId(random_field);
	
	var field = field_array[coord.x][coord.y];
	return field;
	
}

function getField_id( grid, field_array ,id) {
	let coord = grid.coordinateFromId( id ) ;

	var field = field_array[ coord.y ][ coord.x ];	
	
	return field;
	
}



