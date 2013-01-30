function Vice(xTemp,yTemp,dirTemp)
{
	SoundEfx.play("vice.wav",0.6);
	this.x=xTemp;
	this.y=yTemp;
	this.velocity=0;
	this.frame=10;
	this.width=75;
	this.height=75;
	this.eye=0;
	this.fear=false;
	this.sprite=new Image();
	if(dirTemp == undefined)
		this.dir="Up";
	else
		this.dir=dirTemp;
	this.prevDir=this.dir;
	this.dead=false;
}


Vice.prototype.turn=function()
{
	dirTemp=this.dir;
	
	while(dirTemp==this.dir)
	{
		dirTemp=Math.floor(Math.random()*4)+1;
		if(dirTemp==1)
			dirTemp="Up";
		else if(dirTemp==2)
			dirTemp="Down";
		else if(dirTemp==3)
			dirTemp="Right";
		else 
			dirTemp="Left";
	}
	this.dir=dirTemp;
}

/**
 * Draw and animate the Vice on the screen
 **/ 
Vice.prototype.update=function(others)
{
	this.frame+=1;
	if(this.frame>=40)
		this.frame=10;
	this.updatePos(others);
	this.move(this.dir);
	this.sprite.src="graphics/vice/hero"+this.dir+"_"+Math.floor(this.frame/10)+".png";	
	
	if(Math.floor(Math.random()*50)+1==1 && this.eye<=0)
		this.eye=255;
		
	if(this.eye>0)
		this.eye-=1;
	
	surface.fillStyle="rgb("+this.eye+",0,0)";
	if(this.dir=="Left")
	{
		surface.fillRect(this.x+3,this.y+28,12,20);
	}	
	else if(this.dir=="Right")
	{
		surface.fillRect(this.x+this.width-15,this.y+28,12,20);
	}
	else if(this.dir=="Down")
	{
		surface.fillRect(this.x+28,this.y+this.height-15,20,12);	
	}
	else
	{
		surface.fillRect(this.x+28,this.y+3,20,12);
	}
	
	
	surface.drawImage(this.sprite,this.x,this.y);
	if(this.x<this.width*-1 || this.x>800+this.width || this.y<this.height*-1 || this.y>700+this.height || this.dead)
		return undefined;
	else
		return this;
}

/**
 * Update the position of the Vice
 **/
Vice.prototype.updatePos=function(others)
{
	if(this.velocity>3 && this.fear==false)
		this.velocity=3;

	if(this.fear != false)
	{
		other=this.fear;
		if(other.x>this.x)
			this.dir="Left";
		else if(other.x<this.y)
			this.dir="Right";
		else if(other.y<this.y)
			this.dir="Down";
		else 
			this.dir="Up";
	}

	if(this.velocity>=0.15)
		this.velocity-=0.15;
	if(this.prevDir != this.dir)
		this.velocity=Math.round(this.velocity/1.5);
	if(this.dir=="Left"  && this.box("Left",others))
		this.x-=this.velocity;
	else if(this.dir=="Right" && this.box("Right",others))
		this.x+=this.velocity;
	else if(this.dir == "Up" && this.box("Up",others))
		this.y-=this.velocity;
	else if(this.dir == "Down" && this.box("Down",others))
		this.y+=this.velocity;
	else
		this.stop();
}

/**
 * set the direction of the Vice
 **/
Vice.prototype.move=function(dirTemp)
{
	this.prevDir=this.dir;
	if(dirTemp != undefined)
		this.dir=dirTemp;
	this.velocity+=0.5;

}

/**
 * Stop the Vice
 **/
Vice.prototype.stop=function()
{
	this.velocity=0;
}

/**
 * Search for collision
 **/
Vice.prototype.box=function(dirTemp,others)
{
	for(o=0;o<others.length;o++)
	{
		if(others[o] != this && others[o] !=undefined)
		{
			other=others[o];
			if(other instanceof Player)
			{
				halo=other.halo;
				if(halo.flashing && this.x>halo.x && this.x<halo.x+halo.height && this.y>halo.y && this.y<halo.y+halo.height)
				{
					this.fear=other;
					SoundEfx.play("viceHurt.wav",0.6);	
				}
			}
			if(dirTemp=="Right")
			{
				if(other.x+other.width>this.x+this.velocity && other.x<this.x+this.width+this.velocity && other.y+other.height>this.y && other.y<this.y+this.height)
				{
					this.colidWith(other);
					this.x=other.x-this.width;
					return false;	
				}
			}
			else if(dirTemp=="Left")
			{
				if(other.x+other.width>this.x-this.velocity && other.x<this.x+this.width-this.velocity && other.y+other.height>this.y && other.y<this.y+this.height)
				{
					this.colidWith(other);
					this.x=other.x+other.width;
					return false;	
				}
			}
			else if(dirTemp=="Up")
			{
				if(other.x+other.width>this.x && other.x<this.x+this.width && other.y+other.height>this.y-this.velocity && other.y<this.y+this.height-this.velocity)
				{
					this.colidWith(other);
					this.y=other.y+other.height;
					return false;	
				}
			}
			else if(dirTemp=="Down")
			{
				if(other.x+other.width>this.x && other.x<this.x+this.width && other.y+other.height>this.y+this.velocity && other.y<this.y+this.height+this.velocity)
				{
					this.colidWith(other);
					this.y=other.y-this.height;
					return false;	
				}
			}
		
		}
	}
	
	return true;
}


/**
 * set the comportement to follow when collid other entity
 **/
Vice.prototype.colidWith=function(other,others)
{
	if(other instanceof Player)
	{
		other.life-=1;
		SoundEfx.play("hurt.wav",0.6);	
	}
	this.turn();
}