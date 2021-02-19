<?php require_once "vistas/parte_superior.php"?>

<!--INICIO del cont principal-->
<div class="container-fluid">
    <h1>Home</h1>



    <?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$consulta = "SELECT personas.*, pais.id AS id_pais, pais.pais AS pais FROM personas LEFT JOIN pais ON personas.fk_pais = pais.id";
$resultado = $conexion->prepare($consulta);
$resultado->execute();
$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
?>


    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <button id="btnNuevo" type="button" class="btn btn-success" data-toggle="modal">Nuevo</button>
            </div>
        </div>
    </div>
    <br>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="table-responsive">
                    <table id="tablaPersonas" class="table table-striped table-bordered table-condensed"
                        style="width:100%">
                        <thead class="text-center">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Edad</th>
                                <th>País</th>
                                <th>Id país</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php                            
                            foreach($data as $dat) {                                                        
                            ?>
                            <tr>
                                <td><?php echo $dat['id'] ?></td>
                                <td><?php echo $dat['nombre'] ?></td>
                                <td><?php echo $dat['edad'] ?></td>
                                <td><?php echo $dat['pais'] ?></td>
                                <td><?php echo $dat['id_pais'] ?></td>
                                <td></td>
                            </tr>
                            <?php
                                }
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!--Modal para CRUD-->
    <div class="modal fade" id="modalCRUD" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="formPersonas">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="nombre" class="col-form-label">Nombre:</label>
                            <input type="text" class="form-control" required id="nombre" placeholder="Nombre"
                            pattern="[A-Za-z]{4,25}"
                            title="Tamaño máximo 4, máximo 50">
                        </div>
                        <!-- <div class="form-group">
                            <label for="pais" class="col-formk-label">País:</label>
                            <input type="text" class="form-control" id="pais">
                        </div> -->

                       

                        <div class="form-group">
                            <label for="edad" class="col-form-label">Edad:</label>
                            <input type="number" class="form-control" required id="edad" placeholder="Edad"
                            pattern="[0-9]{1,3}"
                            min="0" max="100"
                            title="De 0 a 100">
                        </div>

                        <div class="form-group">
                            <label for="pais_2">Pais:</label>
                            <select class="form-control"  id="pais_2" required></select>
                        </div>


                         <!-- <div class="form-group">
                            <label for="pais_2" class="col-form-label">Pais (select):</label>
                            <select class="form-control" id="pais_2">
                        </div>  -->
                    
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-dismiss="modal">Cancelar</button>
                        <button type="submit" id="btnGuardar" class="btn btn-dark">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>



</div>
<!--FIN del cont principal-->
<?php require_once "vistas/parte_inferior.php"?>