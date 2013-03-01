<?php
	header('Access-Control-Allow-Origin:*');
	$user=$_GET['user'];
	$level=$_GET['level'];
	$score=$_GET['score'];
	include("./cnx.php");
	$sql="INSERT INTO Spectr_score(user,level,score) VALUES ('$user','$level','$score')";
    $result=mysqli_query($connexion,$sql);
?>
