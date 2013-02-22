function Menu()
{
	this.tutorialed=-1;
	
	this.player=new Player(800/2-75/2,0,"Up");
	this.player.y=500;
	this.player.x=800/2-75/2;
	this.entities=new Array();
	this.entities[0]=this.player;
	this.play=new Wall(this.entities,100,700/2-25);this.play.width=150;this.play.height=75;this.play.x=100;this.play.y=700/2-75/2;this.entities[1]=this.play;
	this.score=new Wall(this.entities,100,700/2-25);this.score.width=150;this.score.height=75;this.score.x=800-250;this.score.y=700/2-75/2;this.entities[2]=this.score;
	this.box=new Box(800/2-150/2,700/2-75/2,150,75);
	this.halo=new Halo(-150,-150,100,0.01);
	this.haloX=1;
	this.haloY=1;
	this.halo.flashing=true;


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
	this.play.blocked=false;
	this.score.blocked=false;
	this.inputUpdate();
	result=this.box.update(this.entities);
	for(i=0;i<this.entities.length;i++)
		this.entities[i].update(this.entities);
	if(result)
	{
		if(this.play.validate)
			Scene=new Game();
		else if(this.score.validate)
			Scene=new Score();
	}
	
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
	
	if(this.play.x<80)
		this.play.x=80;
	else if(this.play.x>800-80-150)
		this.play.x=800-80-150;
	if(this.play.y<80)
		this.play.y=80;
	else if(this.play.y>700-80-75)
		this.play.y=700-80-75;
		
	if(this.score.x<80)
		this.score.x=80;
	else if(this.score.x>800-80-150)
		this.score.x=800-80-150;
	if(this.score.y<80)
		this.score.y=80;
	else if(this.score.y>700-80-75)
		this.score.y=700-80-75;
		
	this.halo.x+=this.haloX;
	this.halo.y+=this.haloY;
	surface.textAlign = 'center';		
	surface.font = "75px pixel";
	surface.fillStyle = "rgb(0,0,0)";
	surface.fillText("Play !",this.play.x+this.play.width/2,this.play.y+this.play.height/1.5);
	surface.fillText("Score",this.score.x+this.score.width/2,this.score.y+this.score.height/1.5);
	surface.font = "30px pixel";
	surface.textAlign = 'start';
	surface.fillText("Poussez le bloc de votre choix",400,600);
	surface.fillText("dans l'emplacement vide",425,630);

}

/**
 * Scan the keyboard
 **/
Menu.prototype.inputUpdate=function()
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
}