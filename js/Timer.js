function Timer(xTemp,yTemp)
{
	this.frame=0;
	this.sec=0;
	this.min=0;
	this.x=xTemp;
	this.y=yTemp;
}


/**
 * Reset the time
 **/
Timer.prototype.reset=function()
{
	this.frame=0;
	this.sec=0;
	this.min=0;
}


/**
 * Updatethe time and draw the clock on the screen
 **/
Timer.prototype.update=function()
{
	this.frame+=1;
	if(this.frame>=50)
	{
		this.sec+=1;
		this.frame=0;
	}
	if(this.sec>=60)
	{
		this.min+=1;
		this.sec=0;
	}
	surface.font = "50px pixel";
	surface.fillStyle = "rgb(255,255,255)";
	surface.fillText(this.min+":"+this.sec+":"+this.frame*2,this.x,this.y);	
}