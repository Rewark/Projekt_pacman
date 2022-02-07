const ITEM_TYPE_YELLODOT = 1;
const ITEM_TYPE_PENCIL = 2;
const ITEM_TYPE_WHATEVER = 3;


var Item = function( name, type, image_src ) {
	this.name = name;
	this.type = type; // wir ignorieren ersteinmal den Gegenstandstyp, wird später wieder aufgegriffen
	this.img = new Image();
	this.img.src = image_src;
}