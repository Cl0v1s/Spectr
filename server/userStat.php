<?php
	header('Access-Control-Allow-Origin:*');
	include('./cnx.php');
	$found=false;
	$user=$_GET['user'];
	$password=$_GET['password'];
	$op=$_GET['op'];
	$args=$_GET['args'];
	$o="Spectr_user";
	if($op=="tutorial")
		$sql="UPDATE Spectr_user SET tutorial='true' WHERE user='$user' AND password='$password'";
	else if($op=="level")
		$sql="UPDATE Spectr_user SET level='$args' WHERE user='$user' AND password='$password'";
	else if($op=="register")
	{
		$sql="SELECT * FROM Spectr_user";
		$found=false;
		$result=mysqli_query($connexion,$sql);
		while ($row = mysqli_fetch_array($result, MYSQL_BOTH))
		{
				if($row['user']===$user)
					$found=true;
		}
		if($found)
			echo "ALREADY";
		else
		{
			$sql="INSERT INTO Spectr_user(user,password,tutorial,level) VALUES ('$user','$password','false','0')";
			$result=mysqli_query($connexion,$sql);
			echo $result;	
		}
	}
	else if($op=="login")
	{
		$found=false;
		$sql="SELECT * FROM Spectr_user";
		$result=mysqli_query($connexion,$sql);
		while ($row = mysqli_fetch_array($result, MYSQL_BOTH))
		{
				if($row['user']===$user && $row['password']===$password)
					$found=true;
		}
		if($found)
			echo "OK";
		else
			echo "FAIL";

	}
	else if($op=="tutorialdone")
	{
		$sql="SELECT * FROM Spectr_user";
		$found="";
		$result=mysqli_query($connexion,$sql);
		while ($row = mysqli_fetch_array($result, MYSQL_BOTH))
		{
				if($row['user']==$user && $row['password']==$password)
				{
					$found=$row['tutorial'];
					break;
				}
				else 
					$found="not found";
		}
		echo $found;
	}
	else if($op=="leveldone")
	{
		$sql="SELECT * FROM Spectr_user";
		$found="";
		$result=mysqli_query($connexion,$sql);
		while ($row = mysqli_fetch_array($result, MYSQL_BOTH))
		{
				if($row['user']==$user && $row['password']==$password)
				{
					$found=$row['level'];
					break;
				}
				else 
					$found="not found";
		}
		echo $found;
	}

	if($op != "login" && $op !="tutorialdone" && $op !="register" && $op!="leveldone")
	{
		$result=mysqli_query($connexion,$sql);
		echo $result;
	}
?>
