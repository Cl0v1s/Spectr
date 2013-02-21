function Player(xTemp,yTemp,dirTemp)
{
	this.x=xTemp;
	this.y=700/2-this.height/2;
	this.velocity=0;
	this.frame=10;
	this.width=75;
	this.height=75;
	this.sprite=new Image();
	if(dirTemp == undefined)
		this.dir="Right";
	else
		this.dir=dirTemp;
	this.prevDir=this.dir;
	this.energy=30;
	
	this.fat=25;
	this.life=3;
	
	this.fatMax=50;
	this.lifeMax=3;
	this.ratioEnergy=0.05;
	this.durationEnergy=0.01;
	this.strong=1.5;
	this.meters=1;
	
	this.mode="Push";
	this.dead=false;
	this.halo=new Halo(0,0,this);
}


/**
 * Replace the player at his origin
 **/
Player.prototype.reset=function()
{
	this.x=0;
	this.y=700/2-this.height/2;
	this.fat=25;	
}

/**
 * Draw and animate the player on the screen
 **/ 
Player.prototype.update=function(others)
{
	this.frame+=1;
	if(this.frame>=40)
		this.frame=10;
	this.updatePos(others);
	this.sprite.src="graphics/hero/hero"+this.dir+"_"+Math.floor(this.frame/10)+".png";	
	this.halo.update();
	surface.drawImage(this.sprite,this.x,this.y);
	
	if(this.energy<=30)
		this.energy+=this.ratioEnergy;
	if(Scene.tutorialed >=2 || Scene.tutorialed=="validated")	
	{
		if(this.fat>this.fatMax)
			this.fat=this.fatMax;
		if(this.fat>=0.02)
			this.fat-=0.02;
		else
		{
			this.life-=1;
			this.fat+=Math.floor(Math.random()*(this.fatMax-25))+25;
			SoundEfx.play("hurt.wav",0.6);
		}
		if(this.life<=0)
			this.dead=true;
	}
}

/**
 * Update the position of the player
 **/
Player.prototype.updatePos=function(others)
{
	if(this.velocity>=0.15)
		this.velocity-=0.15;
	if(this.prevDir != this.dir)
		this.velocity=Math.round(this.velocity/1.5);
	if(this.dir=="Left" && this.x>this.velocity && this.box("Left",others))
		this.x-=this.velocity;
	else if(this.dir=="Right" && this.x+this.width<800-this.velocity && this.box("Right",others))
		this.x+=this.velocity;
	else if(this.dir == "Up" && this.y>this.velocity && this.box("Up",others))
		this.y-=this.velocity;
	else if(this.dir == "Down" && this.y+this.height<700-this.velocity && this.box("Down",others))
		this.y+=this.velocity;
	else
		this.stop();
		
	this.halo.setPos(this.x+Math.round(75/2)-Math.round(450/2)-17,this.y+Math.round(75/2)-Math.round(450/2));
}

/**
 * set the direction of the player
 **/
Player.prototype.move=function(dirTemp)
{
	this.prevDir=this.dir;
	if(dirTemp != undefined)
		this.dir=dirTemp;
	this.velocity+=this.meters;

}

/**
 * Stop the player
 **/
Player.prototype.stop=function()
{
	this.velocity=0;
}

/**
 * Empty the battery of the player and flash the halo
 **/
Player.prototype.discharge=function()
{
	if(this.energy>=30)
	{
		this.halo.flash();
		this.energy=0;
	}
}


/**
 * Change the action when collid with a wall
 **/
Player.prototype.changeMode=function()
{
	if(this.mode=="Push")
		this.mode="Eat";
	else if(this.mode=="Eat")
		this.mode="Inflate";
	else
		this.mode="Push";
}


/**
 * Allow the player to eat the walls and gain fat
 **/
Player.prototype.eat=function()
{
	if(this.fat<this.fatMax-this.strong*(this.velocity/2))
	{
		if(this.dir=="Left")
			Scene.addParticle(new Particle(player.x,player.y+player.height/2,"Right"));
		else if(this.dir=="Right")
			Scene.addParticle(new Particle(player.x+player.width,player.y+player.height/2,"Left"));
		else if(this.dir=="Up")
			Scene.addParticle(new Particle(player.x+player.width/2,player.y,"Down"));
		else
			Scene.addParticle(new Particle(player.x+player.width/2,player.y+player.height,"Up"));
		
		this.fat+=this.strong*(this.velocity/2);
		return true;
	}
	else
		return false;
}

/**
 * Allow the player to inflate the walls
 **/
Player.prototype.inflate=function()
{	
	if(this.fat>=(this.strong*(this.velocity/2))/1.5)
	{
		this.fat-=(this.strong*(this.velocity/2))/1.5;
		return true;
	}
	else 
		return false;
}


/**
 * Search for collision
 **/
Player.prototype.box=function(dirTemp,others)
{
	if(others != undefined)
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
						other.colidWith(this);
						this.colidWith(other);
						return false;	
					}
				}
				else if(dirTemp=="Left")
				{
					if(other.x+other.width>this.x-this.velocity && other.x<this.x+this.width-this.velocity && other.y+other.height>this.y && other.y<this.y+this.height)
					{
						other.colidWith(this);
						this.colidWith(other);
						return false;	
					}
				}
				else if(dirTemp=="Up")
				{
					if(other.x+other.width>this.x && other.x<this.x+this.width && other.y+other.height>this.y-this.velocity && other.y<this.y+this.height-this.velocity)
					{
						other.colidWith(this);
						this.colidWith(other);
						return false;	
					}
				}
				else if(dirTemp=="Down")
				{
					if(other.x+other.width>this.x && other.x<this.x+this.width && other.y+other.height>this.y+this.velocity && other.y<this.y+this.height+this.velocity)
					{
						other.colidWith(this);
						this.colidWith(other);
						return false;	
					}
				}
			
			}
		}
		return true;
	}
	return true;
}

/**
 * set the comportement to follow when collid other entity
 **/
Player.prototype.colidWith=function(other,others)
{
	if((other instanceof Wall && this.mode=="Push")|| other instanceof Fater || other instanceof Hangrer)
		SoundEfx.play("bounce.wav",0.2);

	if(other instanceof Bonus)
	{
		other.use(this);
		SoundEfx.play("bonus.wav",0.4);	
	}
	else
	{
		if(this.dir=="Right")
			this.x=other.x-this.width;
		else if(this.dir=="Left")
			this.x=other.x+other.width;
		else if(this.dir=="Up")
			this.y=other.y+other.height;
		else
			this.y=other.y-this.height;
	}
	
	
	
}