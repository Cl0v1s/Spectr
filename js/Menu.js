function Menu()
{
	this.user="";
	this.password="";
	this.tutorialed=-1;
	this.title=new Image();
	this.title.src="./graphics/title.png";
	this.player=new Player(800/2-75/2,0,"Up");
	this.player.y=500;
	this.player.x=800/2-75/2;
	this.halo=new Halo(-150,-150,100,0.01);
	this.haloX=1;
	this.haloY=1;
	this.halo.flashing=true;
	this.notif=new Image();
	this.notif.src="./graphics/normalBox.png";
	this.notification=false;
	this.oldnotif="";
	this.notificationFrame=0;
	SoundEfx.playMusic("Title.wav",0.3);
	this.index=0;
	this.spawnInterval=0;
	this.spawnIntervalLimit=0;
	this.entities=new Array();
	this.connected=false;

}

/**
 * Useless , correct a bug
 **/
Menu.prototype.tutorialProgress=function(stat)
{}


/**
 * Update the menu, draw the screen
 **/
Menu.prototype.update=function()
{
	clean();
	SoundEfx.playMusic("Win.mp3",0.3);
	this.inputUpdate();
	if(this.index==0)
	{
		this.player.y=305;
		this.player.x=170;
	}
	else
	{
		this.player.y=340;
		this.player.x=30;
	}
	this.player.dir="Right";

	this.player.update();
	
	if(this.halo.opacity>=1)
		this.halo.flashing=true;
	this.halo.update();
	if(this.halo.x<-150 || this.halo.y<-150 || this.halo.x>800-150 || this.halo.y>700-150)
	{
		if(Math.floor(Math.random()*2)+1==1)
			this.haloX=Math.random()*-1;
		else
			this.haloX=Math.random();
		if(Math.floor(Math.random()*2)+1==1)
			this.haloY=Math.random()*-1;
		else
			this.haloY=Math.random();
	}
	
		
	this.halo.x+=this.haloX;
	this.halo.y+=this.haloY;
	this.index=0;
	surface.textAlign = 'center';		
	surface.font = "75px pixel";
	surface.fillStyle = "rgb(255,255,255)";
	surface.fillText("Let's Play !",400,365);	
	surface.font = "30px pixel";
	surface.textAlign = 'start';
	surface.fillText("Ou l'histoire d'une ame perdue.",35,130);
	surface.drawImage(this.title,30,20);
	
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
 * Check if the player have an account or no. 
 **/
Menu.prototype.login=function()
{
	user=document.getElementById('user').value;
	password=document.getElementById('password').value;
	this.user=user;
	this.password=password;
	Sender.open('GET',Server+"userStat.php?user="+user+"&password="+password+"&op=login",true);
	Sender.send(null);
	Sender.onreadystatechange=function()
	{
					if (Sender.readyState==4 && (Sender.status==200 || Sender.status==0))
					{
						if(Sender.responseText==="FAIL")	
							Scene.register(user,password);
						else if(Sender.responseText==="OK")
						{
							Scene.notify("You are logged.");
							Online=true;
						}
						else
							Scene.notify("Failed to login.");
						Scene.connected=true;
					}						
	}
}


/**
 * Create an account
 **/
Menu.prototype.register=function(userTemp,passTemp)
{
	Sender.open('GET',Server+"userStat.php?user="+user+"&password="+password+"&op=register",true);
	Sender.send(null);
	Sender.onreadystatechange=function()
	{
					if (Sender.readyState==4 && (Sender.status==200 || Sender.status==0))
					{
						if(Sender.responseText==="1")	
						{
							Scene.notify("Account created.");
							Online=true;	
						}
						else if(Sender.responseText==="ALREADY")
							Scene.notify("Account exists. Play offline.");
						else
							Scene.notify("Can't reach servers.");						
					}						
	}
}

/**
 * Manage the monsters and bonus
 **/
Menu.prototype.monsterUpdate=function()
{
	//spawn Monsters
	this.spawnInterval+=1;
	if(this.spawnInterval>=this.spawnIntervalLimit)
	{
		this.spawnIntervalLimit=Math.floor(8);
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

}

/**
 * Adds an entity to the list
 **/
Menu.prototype.addEntity=function(object)
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
 * show a notification
 **/
Menu.prototype.notify=function(senTemp)
{
	this.notification=senTemp;
}

/**
 * Check the selected option
 **/
Menu.prototype.select=function()
{
	if(this.index==0 && this.connected)
		Scene=new Game(this.user,this.password);
	else
		this.notify("Wait.Try to login.");
}

/**
 * Scan the keyboard
 **/
Menu.prototype.inputUpdate=function()
{
	if(Input.equals(40))
		this.index=1;	
	else if(Input.equals(38))
		this.index=0;
	else if(Input.equals(13))
		this.select();
}