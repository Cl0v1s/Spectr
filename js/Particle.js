function Particle(xTemp,yTemp,dirTemp)
{
	this.x=xTemp;
	this.y=yTemp;
	this.dir=dirTemp;
	this.width=Math.floor(Math.random()*5)+1;
	this.height=Math.floor(Math.random()*5)+1;
	this.velocity=Math.floor(Math.random()*5)+1;
	this.derivation=Math.floor(Math.random()*5)+1;
	if(Math.floor(Math.random()*2)+1==1)
		this.derivation=this.derivation*-1;
	this.flashFrame=255;
}

/**
 * Draw and move the particle on the screen
 **/
Particle.prototype.update=function()
{
	if(this.flashFrame>0)
	{
		if(this.dir=="Right")
		{
			this.x=this.x+this.velocity;
			this.y=this.y+this.derivation;
		}
		else if(this.dir=="Left")
		{
			this.x=this.x-this.velocity;
			this.y=this.y+this.derivation;		
		}
		else if(this.dir=="Up")
		{
			this.x=this.x+this.derivation;
			this.y=this.y-this.velocity;		
		}
		else if(this.dir=="Down")
		{
			this.x=this.x+this.derivation;
			this.y=this.y+this.velocity;		
		}
		this.flashFrame-=1;
		surface.fillStyle="rgb("+this.flashFrame+","+this.flashFrame+","+this.flashFrame+")";
		surface.fillRect(this.x,this.y,this.width,this.height);
		return this;
	}
	else 
		return undefined;
}