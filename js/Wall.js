function Wall(others,xTemp,yTemp)
{
	this.x=xTemp;
	this.y=yTemp;
	this.lastX=this.x;
	this.lastY=this.y;
	this.widthMin=20;
	this.heightMin=20;
	this.velocity=0;
	this.dir="Up";
	
	this.placed=false;
	this.place(others);
	this.validate=false;
	
	this.flashing=false;
	this.flashRate=Math.floor(Math.random()*10)+1;
	this.flashFrame=255;
	this.blocked=false;
}

/**
 * Test for collision and draw the Wall and the screen
 **/
Wall.prototype.update=function(others)
{
	if(this.flashing)
	{
		if(this.flashFrame<255)
			this.flashFrame+=Math.floor(Math.random()*this.flashRate)+1;
		else
			this.flashing=false;
	}
	else if(this.flashFrame>0)
		this.flashFrame-=Math.floor(Math.random()*this.flashRate)+1;
	else
		this.flashing=true;
	
	if(this.box(others))
	{
		if(this.dir=="Left" && this.x>this.velocity)
		{
			this.x-=this.velocity;
		}
		else if(this.dir=="Right" && this.x+this.width<800-this.velocity)
		{
			this.x+=this.velocity;
		}
		else if(this.dir == "Up" && this.y>this.velocity)
		{
			this.y-=this.velocity;
		}
		else if(this.dir == "Down" && this.y+this.height<700-this.velocity)
		{
			this.y+=this.velocity;
		}
		else
			this.stop();
	}
	else 
		this.stop();
		
	if(this.x<76 || this.y<76 || this.x+this.width>800-76 || this.y+this.height>700-76)
		this.blocked=true;
		
	this.velocity-=0.30;
	if(this.velocity<0)
		this.velocity=0;
	
	if(!this.validate)
		v=0;
	else
		v=150;
		
	if(!this.blocked)
		r=0;
	else
		r=150;
	surface.fillStyle="rgb("+(this.flashFrame-v+r)+","+(this.flashFrame+v-r)+","+(this.flashFrame-v-r)+")";
	surface.fillRect(this.x,this.y,this.width,this.height);
}


/**
 * Search for collision
 **/
Wall.prototype.box=function(others)
{
	for(o=0;o<others.length;o++)
	{
		if(others[o] != this && others[o] != undefined)
		{
			other=others[o];
			if(other.x+other.width>this.x && other.x<this.x+this.width && other.y+other.height>this.y && other.y<this.y+this.height)
			{
				this.stop();
				xtCenter=this.x+this.width/2;
				ytCenter=this.y+this.height/2;
				xoCenter=other.x+other.width/2;
				yoCenter=other.y+other.height/2;
				other.colidWith(this);
				this.colidWith(other);
				angle1=getElementAngle(xtCenter,ytCenter,(other.x+other.width),(other.y+other.height));
				angle2=getElementAngle(xtCenter,ytCenter,other.x,(other.y+other.height));
				if(other.y+other.height/2-ytCenter<0 && ((other.x+other.width-xtCenter<0 && angle1>315)||(other.x+other.width-xtCenter>=0 && angle1>=0)) && ((other.x-xtCenter>=0 && angle2<45) || (other.x-xtCenter<0 && angle2<360)))
				{
					if(!other.validate)
						other.y=this.y-other.height;
					return false;
				}
				angle1=getElementAngle(xtCenter,ytCenter,other.x,(other.y+other.height));
				angle2=getElementAngle(xtCenter,ytCenter,other.x,other.y);
				if(angle1>=45 && angle2<=135)
				{
					if(!other.validate)
						other.x=this.x+this.width;
					return false;
				}
				angle1=getElementAngle(xtCenter,ytCenter,(other.x+other.width),other.y);
				angle2=getElementAngle(xtCenter,ytCenter,other.x,other.y);
				if(angle1<=225 && angle2>135)
				{
					if(!other.validate)
						other.y=this.y+this.height;
					return false;
				}
				angle1=getElementAngle(xtCenter,ytCenter,(other.x+other.width),other.y);
				angle2=getElementAngle(xtCenter,ytCenter,(other.x+other.width),(other.y+other.height));
				if(angle1>225 && angle2<=315)
				{
					if(!other.validate)
						other.x=this.x-other.width;
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
Wall.prototype.colidWith=function(other,others)
{
				if(other instanceof Player && !this.validate)
				{
					player=other;
					if(player.x+player.width>this.x+this.width/2 && player.dir=="Left")
					{
						if(player.mode=="Eat" && this.width>this.widthMin )
						{
							if(player.eat())
							{
								this.width-=player.strong*(player.velocity/2);
								player.x=this.x+this.width;
							}
						}
						else if(player.mode=="Push")
						{
							this.velocity=player.velocity;
							this.dir=player.dir;
						}
						else if(player.mode=="Inflate")
						{
							if(player.inflate())
							{
								this.inflate(player);
								player.x=this.x+this.width;
							}
						}
					}
					else if(player.x+player.width<this.x+this.width/2 && player.dir=="Right")
					{
						if(player.mode=="Eat" && this.width>this.widthMin )
						{
							if(player.eat())
							{
								this.x+=player.strong*(player.velocity/2);
								this.width-=player.strong*(player.velocity/2);
								player.x=this.x-player.width;
							}
						}
						else if(player.mode=="Push")
						{
							this.velocity=player.velocity;
							this.dir=player.dir;
						}
						else if(player.mode=="Inflate")
						{
							if(player.inflate())
							{
								this.inflate(player);
								player.x=this.x-player.width;
							}
						}
					}
					if(player.y+player.height>this.y+this.height/2 && player.dir=="Up")
					{
						if(player.mode=="Eat" && this.height>this.heightMin )
						{
							if(player.eat())
							{
								this.height-=player.strong*(player.velocity/2);
								player.y=this.y+this.height;
							}
						}
						else if(player.mode=="Push")
						{
							this.velocity=player.velocity;
							this.dir=player.dir;
						}
						else if(player.mode=="Inflate")
						{
							if(player.inflate())
							{
								this.inflate(player);
								player.y=this.y+this.height;
							}
						}
					}
					else if(player.y+player.height<this.y+this.height/2 && player.dir=="Down")
					{
						if(player.mode=="Eat" && this.height>this.heightMin)
						{
							if(player.eat())
							{
								this.y+=player.strong*(player.velocity/2);
								this.height-=player.strong*(player.velocity/2);
								player.y=this.y-player.height;
							}
						}
						else if(player.mode=="Push")
						{
							this.velocity=player.velocity;
							this.dir=player.dir;
						}
						else if(player.mode=="Inflate")
						{
							if(player.inflate())
							{
								this.inflate(player);
								player.y=this.y-player.height;
							}
						}
					}
					player.stop();	
					this.flash();
				}
}


Wall.prototype.savePos=function()
{
	this.lastX=this.x;
	this.lastY=this.y;
}

Wall.prototype.resetPos=function()
{
	this.stop();
	this.x=this.lastX;
	this.y=this.lastY;
}



/**
 * Inflate the wall
 **/
Wall.prototype.inflate=function(other)
{
		this.x-=other.strong*(other.velocity/2)/2/2;
		this.width+=other.strong*(other.velocity/2)/2;
		this.y-=other.strong*(other.velocity/2)/2/2;
		this.height+=other.strong*(other.velocity/2)/2;	
}


/**
 * Stop the wall
 **/
Wall.prototype.stop=function()
{
	this.velocity=0;
}

/**
 * Choose good coords to place the wall
 **/
Wall.prototype.place=function(others)
{
	this.width=Math.floor(Math.random()*(100)+50);
	this.height=Math.floor(Math.random()*(100)+50);	
	if((this.x == undefined || this.y == undefined) || !this.placed)
	{
		this.x=Math.floor(Math.random()*(800-this.width-160)+80);
		this.y=Math.floor(Math.random()*(700-this.height-160)+80);
	}
	
	if(this.x<80 || this.x+this.width>720 || this.y<80 || this.y+this.height>720)
		this.place(others);

	
	for(o=0;o<others.length;o++)
	{
		other=others[o];
		if(other.x+other.width>this.x && other.x<this.x+this.width && other.y+other.height>this.y && other.y<this.y+this.height)
		{
			this.place(others);
			return;
		}
	}
	
}


/**
 * Start the flash
 **/
Wall.prototype.flash=function()
{
	this.flashing=true;
}