fileLoaded=0;

function Loader()
{
	this.sources=new Array();
	this.images=undefined;
	//put all the files to load here
	this.sources[0]="graphics/hero/heroUp_1.png";	
	this.sources[1]="graphics/hero/heroUp_2.png";	
	this.sources[2]="graphics/hero/heroUp_3.png";	
	this.sources[3]="graphics/hero/heroDown_1.png";	
	this.sources[4]="graphics/hero/heroDown_2.png";	
	this.sources[5]="graphics/hero/heroDown_3.png";	
	this.sources[6]="graphics/hero/heroLeft_1.png";	
	this.sources[7]="graphics/hero/heroLeft_2.png";	
	this.sources[8]="graphics/hero/heroLeft_3.png";	
	this.sources[9]="graphics/hero/heroRight_1.png";	
	this.sources[10]="graphics/hero/heroRight_2.png";	
	this.sources[11]="graphics/hero/heroRight_3.png";

	this.sources[12]="graphics/fater/heroUp_1.png";	
	this.sources[13]="graphics/fater/heroUp_2.png";	
	this.sources[14]="graphics/fater/heroUp_3.png";	
	this.sources[15]="graphics/fater/heroDown_1.png";	
	this.sources[16]="graphics/fater/heroDown_2.png";	
	this.sources[17]="graphics/fater/heroDown_3.png";	
	this.sources[18]="graphics/fater/heroLeft_1.png";	
	this.sources[19]="graphics/fater/heroLeft_2.png";	
	this.sources[20]="graphics/fater/heroLeft_3.png";	
	this.sources[21]="graphics/fater/heroRight_1.png";	
	this.sources[22]="graphics/fater/heroRight_2.png";	
	this.sources[23]="graphics/fater/heroRight_3.png";	
	
	this.sources[24]="graphics/vice/heroUp_1.png";	
	this.sources[25]="graphics/vice/heroUp_2.png";	
	this.sources[26]="graphics/vice/heroUp_3.png";	
	this.sources[27]="graphics/vice/heroDown_1.png";	
	this.sources[28]="graphics/vice/heroDown_2.png";	
	this.sources[29]="graphics/vice/heroDown_3.png";	
	this.sources[30]="graphics/vice/heroLeft_1.png";	
	this.sources[31]="graphics/vice/heroLeft_2.png";	
	this.sources[32]="graphics/vice/heroLeft_3.png";	
	this.sources[33]="graphics/vice/heroRight_1.png";	
	this.sources[34]="graphics/vice/heroRight_2.png";	
	this.sources[35]="graphics/vice/heroRight_3.png";
	
	this.sources[36]="graphics/hangrer/heroUp_1.png";	
	this.sources[37]="graphics/hangrer/heroUp_2.png";	
	this.sources[38]="graphics/hangrer/heroUp_3.png";	
	this.sources[39]="graphics/hangrer/heroDown_1.png";	
	this.sources[40]="graphics/hangrer/heroDown_2.png";	
	this.sources[41]="graphics/hangrer/heroDown_3.png";	
	this.sources[42]="graphics/hangrer/heroLeft_1.png";	
	this.sources[43]="graphics/hangrer/heroLeft_2.png";	
	this.sources[44]="graphics/hangrer/heroLeft_3.png";	
	this.sources[45]="graphics/hangrer/heroRight_1.png";	
	this.sources[46]="graphics/hangrer/heroRight_2.png";	
	this.sources[47]="graphics/hangrer/heroRight_3.png";
	
	this.sources[48]="graphics/life.png";	
	this.sources[49]="graphics/Eat.png";	
	this.sources[50]="graphics/halo.png";	
	this.sources[51]="graphics/fire.png";	
	this.sources[52]="graphics/Push.png";	
	this.sources[53]="graphics/gameOverHalo.png";	
	this.sources[54]="graphics/Inflate.png";	
	this.sources[55]="graphics/littleBox.png";	
	this.sources[56]="graphics/normalBox.png";	
	this.sources[57]="graphics/ok.png";	
	this.sources[58]="graphics/title.png";
	this.sources[59]="graphics/Frame.png";	
	this.sources[60]="graphics/input.png";	

	this.sources[61]="music/Win.mp3";	
	this.sources[62]="music/Title.wav";
	this.sources[63]="music/Level.mp3";	
	
	this.sources[64]="sound/bounce.wav";	
	this.sources[65]="sound/hurt.wav";
	this.sources[66]="sound/bonus.wav";	
	this.sources[67]="sound/vice.wav";	
	this.sources[68]="sound/viceHurt.wav";
	this.sources[69]="sound/bip.wav";	
	this.sources[70]="sound/select.wav";	
	
	this.load();
}

/**
 * Load all the files
 **/
Loader.prototype.load=function()
{
	var images = {};
	var loadedImages = 0;
	var numImages = 0;
	test=function()
	{
		fileLoaded+=1;
	};
	for (var src in this.sources) 
	{
		numImages++;
	}
	for (var src in this.sources) 
	{
		if(this.sources[src].split(".")[1]==="png" || this.sources[src].split(".")[1]==="jpg")
		{	
			images[src] = new Image();
			images[src].onload = function()
			{
				fileLoaded+=1;
			}
			images[src].src = this.sources[src];
		}
		else
		{
			images[src] = new Audio();
			images[src].src = this.sources[src];
			images[src].canplaythrough= test();
		}
	}
}

/**
 * draw the loading on the screen
 **/
Loader.prototype.update=function()
{
	clean();
	surface.textAlign = 'center';		
	surface.font = "75px pixel";
	surface.fillStyle = "rgb(255,255,255)";
	surface.fillText("Chargement des fichiers...",800/2,700/2+75);
	surface.textAlign = 'start';	
	surface.fillStyle="rgb(150,150,150)";
	surface.fillRect(800/2-100,700/2-25/2,200,25);
	progress=(fileLoaded*100/this.sources.length)*2;
	surface.fillStyle="rgb(255,255,255)";
	surface.fillRect(800/2-100,700/2-25/2,progress,25);
	if(fileLoaded==this.sources.length)
	{
		Scene=new Menu();
		if(Ready)
			Scene.login();
	}
	
}
