<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();
// Recepción de los datos enviados mediante POST desde el JS   

$nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
$pais = (isset($_POST['pais'])) ? $_POST['pais'] : '';
$edad = (isset($_POST['edad'])) ? $_POST['edad'] : '';
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$id = (isset($_POST['id'])) ? $_POST['id'] : '';
$fk_pais = (isset($_POST['fk_pais'])) ? $_POST['fk_pais'] : '';
$nombre_formatead = strtolower($nombre);
$nombre_formateado = ucwords($nombre_formatead);


switch($opcion){
    case 1: //alta
        $consulta = "INSERT INTO personas (nombre, fk_pais, edad) VALUES ('$nombre_formateado', '$fk_pais', '$edad')";	 	
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();

        $id_get_insert = $conexion->lastInsertId();
        $consulta = "SELECT personas.id, personas.nombre , personas.edad, pais.id AS id_pais, pais.pais AS pais
                     FROM personas 
                        LEFT JOIN pais ON personas.fk_pais = pais.id
                     WHERE personas.id = '$id_get_insert'"; 	 	
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 2: //modificación
        $consulta = "UPDATE personas SET nombre='$nombre_formateado', fk_pais='$fk_pais', edad='$edad' WHERE id='$id' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT personas.id, personas.nombre , personas.edad, pais.id AS id_pais, pais.pais AS pais
                     FROM personas 
                        LEFT JOIN pais ON personas.fk_pais = pais.id
                     WHERE personas.id = '$id'"; 	 	
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;       
    case 3://baja
        $consulta = "SELECT personas.id, personas.nombre , personas.edad, pais.id AS id_pais, pais.pais AS pais
                     FROM personas 
                        LEFT JOIN pais ON personas.fk_pais = pais.id
                     WHERE personas.id = '$id'";      
        $resultado1 = $conexion->prepare($consulta);
        $resultado1->execute();
        // $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        $data= $id;
        

        $consulta = "DELETE FROM personas WHERE id='$id' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;        
}

print json_encode($data, JSON_UNESCAPED_UNICODE); //enviar el array final en formato json a JS
$conexion = NULL;
