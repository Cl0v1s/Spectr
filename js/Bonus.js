function Bonus(xTemp,yTemp,typeTemp)
{
	this.x=xTemp;
	this.y=yTemp;
	this.width=20;
	this.height=20;
	if(typeTemp==undefined)
	{
		type=Math.floor(Math.random()*1)+1;
		if(type==1)
			typeTemp="Fat";
		/* Insert other type here */
	}
	this.type=typeTemp;
	this.amount=10;
	this.dead=false;
}

/**
 * Draw the bonus on the screen
 **/
Bonus.prototype.update=function(others)
{	
	flash=Math.floor(Math.random()*100)+1;
	if(this.type=="Fat")
		surface.fillStyle="rgb("+(flash)+","+(flash+100)+","+(flash)+")";	
	/* Insert other type colors here */

	surface.fillRect(this.x,this.y,this.width,this.height);
	if(this.dead)
		return undefined;
	else
		return this;
}

Bonus.prototype.use=function(other)
{
	if(this.type=="Fat")
		other.fat+=this.amount;
	/* Insert other types here */
	
	this.dead=true;
}

/**
 * Destroy the bloc on collid
 **/
Bonus.prototype.colidWith=function()
{
	this.dead=true;
}
