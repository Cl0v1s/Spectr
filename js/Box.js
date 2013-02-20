function Box(xTemp,yTemp,wTemp,hTemp)
{
	this.x=xTemp;
	this.y=yTemp;
	this.width=wTemp;
	this.height=hTemp;
	this.validate=false;
}

/**
 * Check if any wall is in and draw the shape of the box
 **/
Box.prototype.update=function(others)
{
    surface.strokeStyle="rgb(255,255,255)";
	surface.strokeRect(this.x,this.y,this.width,this.height);
	for(p=0;p<others.length;p++)
	{
		other=others[p];
		if(other instanceof Wall)
		{
			if(other.x>this.x-5 && other.x+other.width<this.x+this.width+5 && other.y>this.y-5 && other.y+other.height<this.y+this.height+5)
			{
				if((other.width>=this.width-5 && other.width<=this.width+5) && (other.height>=this.height-5 && other.height<=this.height+5))
				{
					if(Scene.tutorialed==2)
						Scene.tutorialProgress(3);
					other.x=this.x;
					other.y=this.y;
					other.width=this.width;
					other.height=this.height;
					other.validate=true;
					this.validate=true;
				}
			}
			else if(other.x+other.width>this.x && other.x<this.x+this.width && other.y+other.height>this.y && other.y<this.y+this.height && Scene.tutorialed==1)
				Scene.tutorialProgress(2);
		}
	}
	return this.validate;
}