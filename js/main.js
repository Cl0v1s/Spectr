var Start;
var Scene;
var prevScene;
var SoundEfx;
var Input;

window.onload = function() {
	canvas=document.getElementById('canvas');
	login=document.getElementById('login');
	canvas.style.opacity=0;
	surface = document.getElementById('canvas').getContext('2d');
	Scene=new Loader();
	prevScene=Scene;
	SoundEfx=new Sound(new Audio());
	Input=new Input();
	Interval=setInterval(function() {
		if(prevScene != Scene)
		{
			prevScene=Scene;
			return;
		}
		Scene.update();
	}, 20);
}

function start()
{
	Start=setInterval(function() {
		if(canvas.style.opacity==0.0)
		{
			canvas.style.opacity=0.2;
			login.style.opacity=0.8;
		}
		else if(canvas.style.opacity==0.2)
		{
			canvas.style.opacity=0.3;
			login.style.opacity=0.7;
		}
		else if(canvas.style.opacity==0.3)
		{
			canvas.style.opacity=0.4;
			login.style.opacity=0.6;
		}
		else if(canvas.style.opacity==0.4)
		{
			canvas.style.opacity=0.5;
			login.style.opacity=0.5;
		}
		else if(canvas.style.opacity==0.5)
		{
			canvas.style.opacity=0.6;
			login.style.opacity=0.4;
		}
		else if(canvas.style.opacity==0.6)
		{
			canvas.style.opacity=0.7;
			login.style.opacity=0.3;
		}
		else if(canvas.style.opacity==0.7)
		{
			canvas.style.opacity=0.8;
			login.style.opacity=0.2;
		}
		else if(canvas.style.opacity==0.8)
		{
			canvas.style.opacity=0.9;
			login.style.opacity=0.1;
		}
		else if(canvas.style.opacity==0.9)
		{
			canvas.style.opacity=1;
			login.style.opacity=0;
			login.style.left=-8000;
		}
		else
			clearInterval(Start);

		
	},20);
}



function clean()
{
	surface.fillStyle="rgb(0,0,0)";
	surface.fillRect (0, 0,document.getElementById('canvas').width,document.getElementById('canvas').height);
}

function exit()
{
	clearInterval(Interval);
}

// Permet de faire une rotation d'un élément pour un angle donné.
// Exemple : DIV à 45 degré.
//			 Prend le DIV dans son angle original (0) et fait une
//			 rotation de 45 degré.
// Note : Ce script ne fonctionne pas sous IE

function rotateElement(element, angle) {
    var properties = ['transform', 'WebkitTransform', 'MozTransform'];
    var p = null;
    var result = null;
    
    while (p = properties.shift()) {
        if (typeof element.style[p] != 'undefined') {
            result = p;
        }
    }
    
    if (result != null) {
    	element.style[result] = 'rotate(' + angle + 'deg)';
	}
}

// L'angle 0 correspond au nord (vers le haut)
// Exemple : getElementAngle(posElementX, posElementY, posSourisX, posSourisY)
//			 Ceci retournera l'angle de l'élément par rapport à la position de la souris
function getElementAngle(x1, y1, x2, y2) {
	var adj = x2 - x1;
	var opp = y2 - y1;
	
	var angle = Math.abs(Math.atan(opp/adj) * 180/Math.PI);
	
	if (adj > 0 && opp < 0 ) {
		angle = 90 - angle;
	}
	else if (adj >= 0 && opp >= 0) {
		angle += 90;
	}
	else if (adj < 0 && opp >= 0) {
		angle = 180 + (90 - angle);
	}
	else {
		angle += 270;
	}
	
	return angle;
}
