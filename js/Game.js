function Game()
{
	this.level=-1;
	this.spawnInterval=0;
	this.spawnIntervalLimit=Math.floor((Math.random()*500));
	this.walls=new Array();
	this.savedWalls=new Array();
	this.entities=new Array();
	this.particles=new Array();
	this.player=new Player(0,0,"Down");
	this.stage=undefined;
	this.timer=new Timer(20,40);
	this.newLevel();
	this.frame=0;
	this.paused=false;
	this.sender=new XMLHttpRequest();

	
	this.gameOverFire=new Image();
	this.gameOverFire.src="graphics/fire.png";
	this.gameOverHalo=new Image();
	this.gameOverHalo.src="graphics/gameOverHalo.png";
	this.playerMode=new Image();
	this.boxMode=new Image();
	this.boxMode.src="graphics/littleBox.png";
	this.life=new Image();
	this.life.src="graphics/life.png";
}

/**
 * Update the game, draw the screen
 **/
Game.prototype.update=function()
{
	if(this.paused)
	{
		this.pause();
		return;
	}
	
	clean();
	
	if(this.stage.update(this.entities))
	{
		this.gameWin();
		return;
	}
	
	
	if(!this.player.dead)
		this.player.update(this.entities);
	else
	{
		this.gameOver();
		return;
	}
	
	
	this.inputUpdate();
	
	this.monsterUpdate();
	
	for(i=0;i<this.walls.length;i++)
	{
		if(this.walls[i] != undefined && this.walls[i] instanceof Wall)
			this.walls[i].update(this.entities);
	}
	for(i=0;i<this.particles.length;i++)
	{
		if(this.particles[i] != undefined)
			this.particles[i]=this.particles[i].update();
	}
	
	this.hudUpdate();
}

/**
 * Manage the monsters and bonus
 **/
Game.prototype.monsterUpdate=function()
{
	//spawn Monsters
	this.spawnInterval+=1;
	if(this.spawnInterval>=this.spawnIntervalLimit)
	{
		this.spawnIntervalLimit=Math.floor((Math.random()*10000)/(this.level+1));
		this.spawnInterval=0;
		type=Math.floor(Math.random()*3)+1;
		if(type==1)
			type=Fater;
		else if(type==2)
			type=Hangrer;
		else if(type==3)
			type=Vice;
		//others type can be placed here
		
		object=new type(0,0);
		side=Math.floor(Math.random()*4)+1;
		xTemp=undefined;
		yTemp=undefined;
		if(side==1)
		{
			xTemp=object.width*-1;
			dirTemp="Right";
		}
		else if(side==2)
		{
			yTemp=object.width*-1;
			dirTemp="Down";
		}
		else if(side==3)
		{
			xTemp=800;
			dirTemp="Left";
		}
		else 
		{
			yTemp=700;
			dirTemp="Up";
		}
		if(yTemp==undefined)
			yTemp=Math.floor(Math.random()*(700-object.height));
		if(xTemp==undefined)
			xTemp=Math.floor(Math.random()*(800-object.width));
			
		object.x=xTemp;
		object.y=yTemp;
		object.dir=dirTemp;
		object.velocity=1;
		this.addEntity(object);
	}
	//spawn bonus
	if(this.timer.sec==5 && this.timer.frame==0)
	{
		object=new Bonus(Math.floor(Math.random()*800-20)+1,Math.floor(Math.random()*700-20)+1);
		this.addEntity(object);
	}
	for(o=0;o<this.entities.length;o++)
	{
		if(this.entities[o] != undefined && !(this.entities[o] instanceof Wall) && !(this.entities[o] instanceof Player))
		{
			this.entities[o]=this.entities[o].update(this.entities);
		}
	}
}

/**
 * Adds an entity to the list
 **/
Game.prototype.addEntity=function(object)
{
		validated=false;
		for(o=0;o<this.entities.length;o++)
		{
			if(this.entities[o] == undefined)
			{
				this.entities[o]=object;
				validated=true;
			}
		}
		if(!validated)
			this.entities.push(object);
}

/**
 * Scan the keyboard
 **/
Game.prototype.inputUpdate=function()
{
	if(Input.equals(39))
		this.player.move("Right");
	else if(Input.equals(37))
		this.player.move("Left");
	else if(Input.equals(40))
		this.player.move("Down");	
	else if(Input.equals(38))
		this.player.move("Up");
	else if(Input.equals(32))
		this.player.discharge();
	else if(Input.equals(66))
		this.player.changeMode();
	else if(Input.equals(27))
		this.paused=true;
	else if(Input.equals(78))
		this.reload();
}

/**
 * Update the IG interface
 **/
Game.prototype.hudUpdate=function()
{
	//timer
	this.timer.update();
	//energy
	energy=this.player.energy;
	surface.fillStyle="rgb(255,255,255)";
	if(energy<=10)
		surface.fillRect(720,690,10,energy*-1);
	else
		surface.fillRect(720,690,10,-10);
	if(energy<=20)
		surface.fillRect(740,690,10,energy*-1);
	else
		surface.fillRect(740,690,10,-20);
	if(energy<=30)
		surface.fillRect(760,690,10,energy*-1);
	else
		surface.fillRect(760,690,10,-30);
	//fat
	fat=this.player.fat;
	fatMax=this.player.fatMax;
	surface.fillStyle="rgb(150,150,150)";
	surface.fillRect(20,700-20,100,10);
	if(fat*100/fatMax>=20)
		surface.fillStyle="rgb(255,255,255)";
	else
		surface.fillStyle="rgb(255,0,0)";
	surface.fillRect(20,700-20,fat*100/fatMax,10);
	//playerMode
	surface.drawImage(this.boxMode,725,0);
	this.playerMode.src="graphics/"+this.player.mode+".png";
	surface.drawImage(this.playerMode,739,15);
	//life
	for(o=0;o<this.player.life;o++)
	{
		surface.drawImage(this.life,739,100+o*60);
	}
}

/**
 * Generate a new Level
 **/
Game.prototype.newLevel=function()
{
	this.timer.reset();
	this.level+=1;
	nb=Levels[this.level][0];
	for(i=0;i<nb;i++)
	{
		this.walls[i]=new Wall(this.entities);
		this.savedWalls[i]=new Array(this.walls[i].x,this.walls[i].y,this.walls[i].width,this.walls[i].height);
	}
	this.entities=this.walls;
	this.entities.push(this.player);
	this.stage=new Stage(Levels[this.level]);
}

/**
 * Reload the level with the origin position of the walls
 **/
Game.prototype.reload=function()
{
	for(i=0;i<this.walls.length;i++)
	{
		if(this.walls[i] != undefined && this.savedWalls[i] != undefined)
		{
			this.walls[i].x=this.savedWalls[i][0];
			this.walls[i].y=this.savedWalls[i][1];
			this.walls[i].width=this.savedWalls[i][2];
			this.walls[i].height=this.savedWalls[i][3];
			this.walls[i].validate=false;
		}
	}
	this.player.x=0;
	this.player.y=0;
}

/**
 * Show the gameOver screen 
 **/
Game.prototype.gameOver=function()
{
	if(this.frame==0 && this.player.y <800)
		this.player.y=this.player.height*-1;
	this.frame+=1;
	if(this.frame>1280-900)
		this.frame=0;
		
	surface.globalAlpha = (Math.floor(Math.random()*5)+5)/10;
	surface.drawImage(this.gameOverHalo,0,372);
	surface.globalAlpha = 1;
	this.player.x=800/2-this.player.width/2;
	this.player.velocity=15;
	this.player.dir="Down";
	if(this.player.y<615)
		this.player.update();
	else
		this.player.y=800;
	surface.drawImage(this.gameOverFire,0-this.frame,629);
	surface.font = "80px pixel";
	surface.fillStyle = "rgb(255,255,255)";
	surface.fillText("Game Over",800/2-140,300);
	surface.font = "25px pixel";
	surface.fillText("-Push Space-",800/2-60,352);
	if(Input.equals(32))
		Scene=new Game();
		
}

/**
 * Pause the game
 **/
Game.prototype.pause=function()
{
	if(Input.equals(27) || Input.equals(13))
		this.paused=false;
	else if(Input.equals(78))
	{
		this.level-=1;
		this.newLevel();
		this.paused=false;
		this.player.fat=25;
	}
		
	surface.font = "80px pixel";
	surface.fillStyle = "rgb(255,255,255)";
	surface.fillText("Game Paused",800/2-150,300);
	surface.font = "25px pixel";
	surface.fillText("-Push Escape to Continue or N to retry this level-",800/2-170,352);

}

/**
 * Show the congratulations screen and calculate the score
 **/
Game.prototype.gameWin=function()
{

}

/**
 * Add a particle to the list to be able to show it
 **/
Game.prototype.addParticle=function(object)
{
	for(o=0;o<this.particles.length;o++)
	{
		if(this.particles[o] == undefined)
		{
			this.particles[o]=object;
			return;
		}
	}
	this.particles.push(object);
}

/**
 * Send the score online
 **/
Game.prototype.sendScore=function(userTemp,scoreTemp)
{
	this.sender.open('POST','Score.php',true);
	this.sender.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	this.sender.send("user="+userTemp+"&score="+scoreTemp);
}


