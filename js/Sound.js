function Sound()
{
	this.timer=0;
	this.element=new Audio();
	this.music=new Audio();
	this.prev=undefined;
	this.prevMusic=undefined;
}

/**
 * Play a sound effect
 **/
Sound.prototype.play=function(soundTemp,volTemp,secur)
{
	if((secur==undefined && (this.prev != soundTemp) || (this.prev==soundTemp && this.timer<=0)) || secur==false)
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
 * Play music
 **/
Sound.prototype.playMusic=function(soundTemp,volTemp)
{
	if(this.prevMusic != soundTemp)
	{
		this.music.src="music/"+soundTemp;
		if(volTemp != undefined)
			this.music.volume=volTemp;
		this.music.play();
		this.prevMusic=soundTemp;
	}
}

/**
 * Stop music
 **/
Sound.prototype.stopMusic=function()
{
		this.music.pause();
}

/**
 * Update the timer
 **/
Sound.prototype.update=function()
{
	if(this.timer>0)
		this.timer-=1;
	if(this.music.currentTime>=this.music.duration)
	{
		this.music.currentTime=0;
		this.music.play();
	}
}