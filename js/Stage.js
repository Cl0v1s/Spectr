function Stage(levelTemp)
{
	this.level=levelTemp;
	this.boxes=new Array();
	for(o=1;o<this.level.length;o++)
		this.boxes.push(this.level[o]);
}

/**
 * Draw the boxes on the screen
 **/
Stage.prototype.update=function(others)
{
	validated=0;
	for(o=0;o<this.boxes.length;o++)
		if(this.boxes[o].update(others))
			validated+=1;
	
	if(validated>=this.boxes.length)
		return true;
	else
		return false;
}