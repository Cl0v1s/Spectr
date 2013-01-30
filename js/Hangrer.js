function Hangrer(xTemp,yTemp,dirTemp)
{
	this.x=xTemp;
	this.y=yTemp;
	this.velocity=0;
	this.frame=10;
	this.width=75;
	this.height=75;
	this.sprite=new Image();
	if(dirTemp == undefined)
		this.dir="Up";
	else
		this.dir=dirTemp;
	this.prevDir=this.dir;
	this.dead=false;
	
	this.fatMax=Math.floor(Math.random()*100);
	this.fat=0;
	this.strong=1.25;
}


Hangrer.prototype.back=function()
{
	if(this.dir=="Right")
		this.dir="Left";
	else if(this.dir=="Left")
		this.dir="Right";
	else if(this.dir=="Down")
		this.dir="Up";
	else
		this.dir="Down";
	
}

/**
 * Draw and animate the Hangrer on the screen
 **/ 
Hangrer.prototype.update=function(others)
{
	this.frame+=1;
	if(this.frame>=40)
		this.frame=10;
	this.updatePos(others);
	this.move(this.dir);
	this.sprite.src="graphics/hangrer/hero"+this.dir+"_"+Math.floor(this.frame/10)+".png";	
	surface.drawImage(this.sprite,this.x,this.y);
	if(this.x<this.width*-1 || this.x>800+this.width || this.y<this.height*-1 || this.y>700+this.height || this.dead)
		return undefined;
	else
		return this;
}

/**
 * Update the position of the Hangrer
 **/
Hangrer.prototype.updatePos=function(others)
{
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
 * set the direction of the Hangrer
 **/
Hangrer.prototype.move=function(dirTemp)
{
	this.prevDir=this.dir;
	if(dirTemp != undefined)
		this.dir=dirTemp;
	this.velocity+=1;

}

/**
 * Stop the Hangrer
 **/
Hangrer.prototype.stop=function()
{
	this.velocity=0;
}

/**
 * Allow the Hangrer to eat the walls and gain fat
 **/
Hangrer.prototype.eat=function(other)
{
	if(this.fat<this.fatMax-this.strong*(this.velocity/2))
	{
		if(this.dir=="Left" && other.width>=other.widthMin+this.strong*(this.velocity/2))
		{
			Scene.addParticle(new Particle(this.x,this.y+this.height/2,"Right"));
			other.width-=this.strong*(this.velocity/2);
		}
		else if(this.dir=="Right" && other.width>=other.widthMin+this.strong*(this.velocity/2))
		{
			Scene.addParticle(new Particle(this.x+this.width,this.y+this.height/2,"Left"));
			other.width-=this.strong*(this.velocity/2);
			other.x+=this.strong*(this.velocity/2);
		}
		else if(this.dir=="Up" && other.height>=other.heightMin+this.strong*(this.velocity/2))
		{
			Scene.addParticle(new Particle(this.x+this.width/2,this.y,"Down"));
			other.height-=this.strong*(this.velocity/2);
		}
		else if(other.height>=other.heightMin+this.strong*(this.velocity/2))
		{
			Scene.addParticle(new Particle(this.x+this.width/2,this.y+this.height,"Up"));
			other.height-=this.strong*(this.velocity/2);
			other.y+=this.strong*(this.velocity/2);
		}
		else 
			return false;
		
		this.fat+=this.strong*(this.velocity/2);
		return true;
	}
	else
		return false;
}

/**
 * Search for collision
 **/
Hangrer.prototype.box=function(dirTemp,others)
{
	for(o=0;o<others.length;o++)
	{
		if(others[o] != this && others[o] !=undefined)
		{
			other=others[o];
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
Hangrer.prototype.colidWith=function(other,others)
{
	if(other instanceof Wall && other.width>other.widthMin && this.fat<=this.fatMax-1 && !other.validate)
		this.eat(other);
	else
		this.back();

}