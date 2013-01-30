LastKey=0;

window.onkeydown = function(event) {
	var e = event || window.event;
	var key = e.which || e.keyCode;
	LastKey=key;
	//console.log(key);
}

window.onkeyup = function(event) {
	LastKey=0;
}


function Input()
{
}

/**
 * Checks if the last key equals the specified value
 */
Input.prototype.equals=function(value)
{
		if(LastKey==value)
		{
			LastKey=0;
			return true;
		}
		else
		{
			return false;
		}
}

/**
 * Shows an elert with the last key id
 **/
Input.prototype.show=function()
{
	console.log(LastKey);
}



/**
 * Returns the last pressed key
 */
Input.prototype.getLastKey=function()
{
	return LastKey;
}
