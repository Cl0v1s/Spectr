function Sound(elementTemp)
{
	this.element=elementTemp;
}

Sound.prototype.play=function(soundTemp,volTemp)
{
	this.element.src="sound/"+soundTemp;
	if(volTemp != undefined)
		this.element.volume=volTemp;
	this.element.play();
}