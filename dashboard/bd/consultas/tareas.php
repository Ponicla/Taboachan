<?php
include_once '../../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();


// function consulta(){
    $consulta = "SELECT * FROM tarea";			
    $resultado = $conexion->prepare($consulta);
    $resultado->execute(); 
    $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data, JSON_UNESCAPED_UNICODE); 
    $conexion = NULL; 
// }

// consulta();   