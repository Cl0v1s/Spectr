
function Game(userTemp)
{
	this.level=-1;
	this.started=false;
	this.spawnInterval=0;
	this.spawnIntervalLimit=Math.floor((Math.random()*500));
	this.walls=new Array();
	this.savedWalls=new Array();
	this.entities=new Array();
	this.particles=new Array();
	this.player=new Player(0,0,"Right");
	this.stage=undefined;
	this.timer=new Timer(20,40);
	this.newLevel();
	this.frame=0;
	this.paused=false;
	this.textSpeed=0.3;
	this.user=userTemp;
	this.scored=false;
	
	this.tutorialed=0;
	this.tutorialStep=0;
	this.tutorialFrame=0;
	this.tutorialOpacity=1,
	this.tutorialText=new Array();
	this.tutorialText[0]=new Array();
	this.tutorialText[1]=new Array();
	this.tutorialText[2]=new Array();
	this.tutorialText[3]=new Array();
	//                       |                                  |                                  |                                  |                                  |                                  |                                  |                                  |                                  |
	this.tutorialText[0][0]="Bon.. Et Bien je vais aller vite,  je n'ai pas que ça à faire...      Bref...                            Tu es mort.";
	this.tutorialText[0][1]="Et tant qu'à faire,                le paradis existe...               Mais vois tu,                      je m'ennuie un peu moi...          Le jugement dernier...             Tout ça tout ça... ";
	this.tutorialText[0][2]="C'est drole que cinq minutes...    La compétition c'est plus sympa.   C'est pourquoi j'ai monté un petit jeu assez intéressant...           Et... Que tu sois joueur ou pas... Tu vas devoir y participer.         Bref, on va innover... Il va te    falloir te gagner ta place...";
	this.tutorialText[0][3]="Les règles sont simples...         Il te suffit de pousser les blocs  d'énergie vitale...                Dans les emplacements qui          apparaissent dans les limbes.      Et ceci le plus rapidement         possible...";
	this.tutorialText[0][4]="Vas y, essaie...                   Fonce comme une brute              dans un bloc pour le pousser       hors des limites rouges...";
	
	this.tutorialText[1][0]="Bravo...                           Bien comme tu as pu le             remarquer, si tu pousses le bloc   hors de la limite rouge...";
	this.tutorialText[1][1]="Celui-ci devient lui-meme écarlate.Ce changement de couleur signifie  que tu as trop fait devier la      précieuse énergie... Et que tu ne  peux donc plus l'utiliser... ";
	this.tutorialText[1][2]="Si tu pousses trop de blocs hors   des limites et que tu n'en possède plus assez pour remplir les        emplacements...";
	this.tutorialText[1][3]="Alors...                           Tu seras condamné à errer          en enfer...";
	this.tutorialText[1][4]="Bien pousse maintenant un bloc dansl'emplacement...";
	
	this.tutorialText[2][0]="Décidement...Tu es une fleche...   Malheureusement pousser l'energie  dans un emplacement ne suffit pas. En effet, il faut que l'énergie    offerte soit à la mesure de son    receptacle...";
	this.tutorialText[2][1]="Je n'ai pas envie de me retrouver  avec encore plus de suicides sur   les bras...";
	this.tutorialText[2][2]="Bref.                              Je compte bien t'expliquer         comment tailler l'energie vitale   sur-mesure...";
	this.tutorialText[2][3]="Pour cela... Appuie sur 'B'...     Cette action aura pour effet de    'changer' ton mode opératoire...   Comme tu peux le voir... Tu        disposes de trois 'modes'...";
	this.tutorialText[2][4]="Celui avec le muffin te permet de  ronger les blocs d'energie         tandis que celui avec l'entonnoire  te permet de les regonfler...      Enfin celui avec la fleche te      permet de pousser les blocs...";
	this.tutorialText[2][5]="Lorsque tu rognes un bloc          l'énergie que tu retires du bloc   se retrouve dans ton ame...        Tu peux connaitre la quantité      d'énergie dont tu disposes en      jetant un coup d'oeil à la jauge   en bas à gauche de l'écran.";
	this.tutorialText[2][6]="Cette jauge diminue lorsque tu     redistribue l'énergie vitale dans  un bloc...De plus comme celle-ci   n'est pas tienne, elle diminue     régulièrement au cours du temps... Si tu déverse toute l'énergie      vitale que tu as emprunté...       Alors tu perdras une vie...";
	this.tutorialText[2][7]="En jouant avec le bouton 'B'...    Arrange toi pour que le bloc       corresponde parfaitement à son     emplacement...";

	this.tutorialText[3][0]="Bien... C'est presque terminé...   Enfin...";
	this.tutorialText[3][1]="Durant la précdente partie tu as   du remarquer un petit carré de     couleur clignotant... Il s'agit    d'un bonus...En passant dessus     tu profiteras de divers            améliorations qui te faciliteront  la vie... ou plutot la mort...";
	this.tutorialText[3][2]="...";
	this.tutorialText[3][3]="...";
	this.tutorialText[3][4]="Ah oui... Une dernière chose...    Les places pour le paradis sont    limitées...Aussi tu subiras la     visite de certains de tes camaradesqui risqueront de gacher ton beau  travail...";
	this.tutorialText[3][5]="Tes congénères bleus viennent      'gonfler' tes blocs d'énergie      vitale tandis que les rouges       viennent les ronger...             Enfin les noirs, viscieux ne sont  visibles que par intermitances      et viendront te voler de la vie... ";
	this.tutorialText[3][6]="Tu pourras faire fuir ces derniers en appuyant sur la touche 'espace' ...Ce qui aura pour effet d'emmetreun rayon lumineux qui fera paniquernos chers amis pervers...";
	this.tutorialText[3][7]="Voilà... Je te laisse te           débrouiller... Et ne cherche pas   à appeler à l'aide...              Je n'ai pas que ça à faire...";

	this.gameOverFire=new Image();
	this.gameOverFire.src="graphics/fire.png";
	this.gameOverHalo=new Image();
	this.gameOverHalo.src="graphics/gameOverHalo.png";
	this.playerMode=new Image();
	this.boxMode=new Image();
	this.boxMode.src="graphics/littleBox.png";
	this.boxInfo=new Image();
	this.boxInfo.src="graphics/normalBox.png";
	this.life=new Image();
	this.life.src="graphics/life.png";
	this.frontierFlashing=false;
	this.frontierFlash=100;
	
	this.notif=new Image();
	this.notif.src="./graphics/normalBox.png";
	this.notification=false;
	this.oldnotif="";
	this.notificationFrame=0;

}

/**
 * show a notification
 **/
Game.prototype.notify=function(senTemp)
{
	this.notification=senTemp;
}


/**
 * Update the game, draw the screen
 **/
Game.prototype.update=function()
{
	SoundEfx.update();
	if(!this.started)
	{
		this.start();
		return;
	}
	
	if(this.paused)
	{
		this.pause();
		return;
	}
	
	clean();
	
	stageRes=this.stage.update(this.entities);
	if(stageRes==true)
	{
		this.gameWin();
		return;
	}
	else if(stageRes=="Game Over")
	{
		clean();
		this.gameOver("You have blocked too much blocks !");
		return;
	}
	
	if(!this.player.dead)
	{
		//frontier
		if(this.frontierFlashing)
		{
			if(this.frontierFlash<100)
				this.frontierFlash+=Math.floor(Math.random()*1.5)+1;
			else
				this.frontierFlashing=false;
		}
		else if(this.frontierFlash>0)
			this.frontierFlash-=Math.floor(Math.random()*1.5)+1;
		else
			this.frontierFlashing=true;
		surface.strokeStyle="rgb("+this.frontierFlash+",0,0)";
		surface.strokeRect(76,76,800-76*2,700-76*2);
		this.player.update(this.entities);
	}
	else
	{
		this.gameOver("You have lose all your lives !");
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
	if(this.tutorialed != "validated")
		this.tutorial();
	
	
}

/**
 * Show the level and invite the player to press space
 **/
Game.prototype.start=function()
{
	clean();
	surface.textAlign = 'center';		
	surface.font = "75px pixel";
	surface.fillStyle = "rgb(255,255,255)";
	surface.fillText("Level "+this.level,800/2,700/2-75);
	if(this.level==0 || this.level==1)
	{
		surface.font = "60px pixel";
		surface.fillStyle = "rgb(150,150,150)";
		surface.fillText("Tutorial",800/2,700/2+55-75);	
	}
	surface.fillStyle = "rgb(255,255,255)";	
	surface.font = "35px pixel";
	surface.fillText("-press space to start-",800/2,700/2+100-75);	
	if(Input.equals(32))
	{
		this.started=true;
		SoundEfx.play("select.wav",0.2,false);	
	}
	surface.textAlign = 'start';	
}

/**
 * Allow the player to progress in the tutorial
 **/
Game.prototype.tutorialProgress=function(stat)
{
	if(this.tutorialStep==this.tutorialText[this.tutorialed].length-1)
	{
		this.tutorialed=stat;
		this.tutorialFrame=0;
		this.tutorialStep=0;
	}
}

/**
 * Learn the player how to play
 **/
Game.prototype.tutorial=function()
{
	txt=new Array("","","","","","","","");
	line=0;
	this.tutorialFrame+=this.textSpeed;
	if((this.tutorialStep<this.tutorialText[this.tutorialed].length-1 && this.tutorialFrame<=this.tutorialText[this.tutorialed][this.tutorialStep].length))
	{
		this.tutorialOpacity=1;
		for(i=0;i<this.tutorialFrame;i++)
		{
			if(txt[line].length>=35)
				line+=1;
			txt[line]=txt[line]+this.tutorialText[this.tutorialed][this.tutorialStep].charAt(i);
			if(Input.equals(13))
				this.tutorialFrame=this.tutorialText[this.tutorialed][this.tutorialStep].length;
		}
	}
	else if(this.tutorialStep<this.tutorialText[this.tutorialed].length-1)
	{
		for(i=0;i<this.tutorialFrame;i++)
		{
			if(txt[line].length>=35)
				line+=1;
			txt[line]=txt[line]+this.tutorialText[this.tutorialed][this.tutorialStep].charAt(i);
			
		}	
		if(Input.equals(13))
		{
			this.tutorialStep+=1;
			this.tutorialFrame=0;
		}
	}
	if(this.tutorialStep<this.tutorialText[this.tutorialed].length-1)
	{
		surface.drawImage(this.boxInfo,400,0);
		surface.textAlign = 'start';
		surface.font = "24px pixel";
		surface.fillStyle="rgb(255,255,255)";
		for(i=0;i<=line;i++)
			surface.fillText(txt[i],410,60+20*i);
	}
	else
	{
		if(this.tutorialOpacity>0.21 || this.tutorialed==3)
			this.tutorialOpacity-=0.0005;
		surface.globalAlpha=this.tutorialOpacity;
		surface.drawImage(this.boxInfo,400,0);
		for(i=0;i<this.tutorialFrame;i++)
		{
			if(txt[line].length>=35)
				line+=1;
			txt[line]=txt[line]+this.tutorialText[this.tutorialed][this.tutorialStep].charAt(i);
			
		}	
		surface.textAlign = 'start';
		surface.font = "24px pixel";
		surface.fillStyle="rgb(255,255,255)";
		for(i=0;i<=line;i++)
			surface.fillText(txt[i],410,60+20*i);
		surface.globalAlpha=1;
		if(this.tutorialOpacity<=0)
			this.tutorialed="validated";

	}
	
}



/**
 * Manage the monsters and bonus
 **/
Game.prototype.monsterUpdate=function()
{
	//spawn Monsters
	this.spawnInterval+=1;
	if(this.spawnInterval>=this.spawnIntervalLimit && this.level>0)
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
	{
		this.paused=true;
		SoundEfx.play("bip.wav",0.2,false);	
	}
	else if(Input.equals(78))
	{
		this.reload();	
		SoundEfx.play("select.wav",0.2,false);
	}		
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
	//notification
	if(this.notification != false)
	{
		this.oldnotif=this.notification;
			this.notificationFrame+=1;
		if(this.notificationFrame>=80)
		{
			this.notification=false;
		}
	}
	else if(this.notificationFrame>0)
		this.notificationFrame-=1;
		
	surface.textAlign = 'center';	
	surface.fillStyle = "rgb(50,50,50)";
	surface.font = "30px pixel";
	if(this.notificationFrame<40)
	{
		surface.drawImage(this.notif,400,-230+this.notificationFrame*1.5);
		surface.fillText(this.oldnotif,400+300/2,this.notificationFrame*1.5-20);
	}
	else 
	{
		surface.drawImage(this.notif,400,-230+40*1.5);
		surface.fillText(this.oldnotif,400+300/2,40*1.5-20);
	}
		
	surface.textAlign = 'start';
}

/**
 * Generate a new Level
 **/
Game.prototype.newLevel=function()
{
	clean();
	Response=undefined;
	this.scored=false;
	this.started=false;
	this.timer.reset();
	this.player.reset();
	this.level+=1;
	nb=Levels[this.level][1];
	this.walls=new Array();
	this.savedWalls=new Array();
	this.entities=this.walls;
	this.stage=new Stage(Levels[this.level]);
	for(i=0;i<nb;i++)
	{
		this.walls[i]=new Wall(this.entities);
		this.savedWalls[i]=new Array(this.walls[i].x,this.walls[i].y,this.walls[i].width,this.walls[i].height);
		this.entities=this.walls;
		this.walls[i].update(this.entities);
		if(this.walls[i].blocked)
			i=i-1;
	}
	this.entities.push(this.player);
	clean();
	if(this.stage.update(this.entities))
	{
		this.level-=1;
		this.newLevel();
	}
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
	this.player.reset();
}

/**
 * Show the gameOver screen 
 **/
Game.prototype.gameOver=function(cause)
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
	surface.textAlign = 'center';
	surface.font = "80px pixel";
	surface.fillStyle = "rgb(255,255,255)";
	surface.fillText("Game Over",800/2,300);
	surface.font = "35px pixel";
	surface.fillText(cause,800/2,352);
	surface.font = "25px pixel";
	surface.fillText("-Push Space-",800/2,400);
	surface.textAlign = 'start';
	
	
	
	if(Input.equals(32))
		Scene=new Game();
		
}

/**
 * Pause the game
 **/
Game.prototype.pause=function()
{
	if(Input.equals(27) || Input.equals(13))
	{
		this.paused=false;
		SoundEfx.play("bip.wav",0.2,false);		
	}
	else if(Input.equals(78))
	{
		SoundEfx.play("select.wav",0.2,false);
		this.level-=1;
		this.newLevel();
		this.paused=false;
		this.player.fat=25;
	}
	surface.textAlign = 'center';		
	surface.font = "80px pixel";
	surface.fillStyle = "rgb(255,255,255)";
	surface.fillText("Game Paused",800/2,300);
	surface.font = "25px pixel";
	surface.fillText("-Push Escape to Continue or N to retry this level-",800/2,352);
	surface.textAlign = 'start';

}

/**
 * Show the congratulations screen and calculate the score
 **/
Game.prototype.gameWin=function()
{
	time=this.timer.min*60+this.timer.sec;
	score=Math.round((100-(time*100)/Levels[this.level][0])*this.player.life);
	surface.font = "80px pixel";
	surface.fillStyle = "rgb(255,255,255)";
	surface.textAlign = 'center';
	surface.fillText("Finished with "+score+" points !",800/2,300);
	surface.font = "25px pixel";
	surface.fillText("-Push Space to Continue-",800/2,352);
	surface.fillText("-Your score has been sent-",800/2,372);
	if(this.scored==false)
	{
		this.showScore(this.level);
		this.scored=true;
	}
	if(Response != undefined && Response != "")
	{
	    surface.drawImage(this.boxInfo,800/2-300,392);
		data=Response.split("///");
		for(i=0;i<5;i++)
		{
			if(data[i] != undefined)
			{
				value=data[i].split("//");
				surface.fillText(value[0]+"  :  "+value[1],800/2-300+300/2,450+i*20);
			}
		}
		surface.font = "40px pixel";
		surface.fillStyle = "rgb(0,255,0)";
		surface.fillText(this.user+"  :  "+score,800/2-300+300/2,450+6*20)
	}
	surface.textAlign = 'start';
	if(Input.equals(32))
	{
		this.sendScore(this.user,score);
		SoundEfx.play("select.wav",0.2,false);
		this.newLevel();	
	}
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
	Sender.open('GET',"http://minequest.servegame.com/Spectr/sendScore.php?user="+userTemp+"&level="+this.level+"&score="+scoreTemp,true);
	Sender.send(null);
	Sender.onreadystatechange=function(){}
}

/**
 * Send the high scores for the secified level
 **/
Game.prototype.showScore=function(levelTemp)
{
	Sender.open('GET',"http://minequest.servegame.com/Spectr/showScore.php?level="+levelTemp,true);
	Sender.send(null);
	Sender.onreadystatechange=function()
	{
					if (Sender.readyState==4 && (Sender.status==200 || Sender.status==0))
						Response=Sender.responseText;				
	}
}


