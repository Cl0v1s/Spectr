function Halo(xTemp,yTemp,ownerTemp)
{
	this.x=xTemp;
	this.y=yTemp;
	this.width=450;
	this.height=450;
	this.sprite=new Image();
	this.sprite.src="graphics/halo.png";
	this.opacity=0;
	this.flashing=false;
	if(ownerTemp instanceof Player)
		this.ratioOpacity=ownerTemp.durationEnergy;
	else
		this.ratioOpacity=ownerTemp
}

/**
 * Place the halo at the specified position
 **/
Halo.prototype.setPos=function(xTemp,yTemp)
{
	this.x=xTemp;
	this.y=yTemp;
}

/**
 * Calculate the halo opacity on flashing and draw the halo on the screen
 **/
Halo.prototype.update=function()
{
	if(this.flashing)
		this.opacity+=this.ratioOpacity*10;
	else if(this.opacity>0)
		this.opacity-=this.ratioOpacity;
	if(this.opacity>=1)
		this.flashing=false;
	if(this.opacity>0)	
	{
		surface.globalAlpha = this.opacity;
		surface.drawImage(this.sprite,this.x,this.y);
		surface.globalAlpha = 1;
	}
}

/**
 * Start the flash
 **/
Halo.prototype.flash=function()
{
	this.flashing=true;
}