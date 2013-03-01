<?php
	header('Access-Control-Allow-Origin:*');
	include("./cnx.php");
	$return="";
	$level=$_GET['level'];
	$sql="SELECT * FROM Spectr_score WHERE level='$level' ORDER BY score DESC";
	$result=mysqli_query($connexion,$sql);
	while ($row = mysqli_fetch_array($result, MYSQL_BOTH))
	{
		$return=$return.$row['user']."//".$row['score']."///";
	}
	echo $return;
?>
