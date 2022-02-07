var Grid = function(canvas, number_of_fields){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.number_of_fields = number_of_fields;
    

    this.field_width = this.canvas.width / number_of_fields;
    this.field_height = this.canvas.height / number_of_fields;
}

Grid.prototype.coordinateFromId = function(field_id){
    return{
        x: field_id % this.number_of_fields,
        y: parseInt(field_id / this.number_of_fields),
    };
}


Grid.prototype.drawGrid = function(number_of_fields){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    

    for(let y = 0; y <= this.canvas.height; y += this.field_height){
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(this.canvas.width, y);
    }

    for(let x = 0; x <= this.canvas.width; x +=this.field_width ){
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, this.canvas.height);
    }

    this.ctx.stroke();
}

Grid.prototype.drawFieldNumbers = function(){
    this.ctx.font = "10px Arial";
debugger;
    for(let y = 0; y <= this.canvas.height; y += this.field_height){
        for(let x = 0; x <= this.canvas.width; x += this.field_width){

            let fieldnumber = ((parseInt(y / this.field_height ) * this.number_of_fields) + parseInt(x / this.field_width));
            let measure = this.ctx.measureText(fieldnumber);

            let text_width = measure.width;
            this.ctx.fillText(fieldnumber, x + (this.field_width/2) - (text_width/2),  y + 10 );



        }
    }
}