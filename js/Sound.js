function Sound(elementTemp)
{
	this.timer=0;
	this.element=elementTemp;
	this.prev=undefined;
}

/**
 * Play a sound effect
 **/
Sound.prototype.play=function(soundTemp,volTemp)
{
	if((this.prev != soundTemp) || (this.prev==soundTemp && this.timer<=0))
	{
		this.element.src="sound/"+soundTemp;
		if(volTemp != undefined)
			this.element.volume=volTemp;
		this.element.play();
		this.prev=soundTemp;
		this.timer=20;
	}
}

/**
 * Update the timer
 **/
Sound.prototype.update=function()
{
	if(this.timer>0)
		this.timer-=1;
}