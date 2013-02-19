function Stage(levelTemp)
{
	this.level=levelTemp;
	this.boxes=new Array();
	for(o=2;o<this.level.length;o++)
		this.boxes.push(this.level[o]);
}

/**
 * Draw the boxes on the screen
 **/
Stage.prototype.update=function(others)
{
	validated=0;
	blocked=0;
	walls=0;
	for(o=0;o<this.boxes.length;o++)
		if(this.boxes[o].update(others))
			validated+=1;
	for(o=0;o<others.length;o++)
	{
		if(others[o] instanceof Wall)
		{
			walls+=1;
			if(others[o].blocked)
				blocked+=1;
		}
			
	}
			
	if(this.boxes.length>walls-blocked)
		return "Game Over";
	
	if(validated>=this.boxes.length)
		return true;
	else
		return false;
}