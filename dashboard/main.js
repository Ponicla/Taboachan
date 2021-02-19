$(document).ready(function(){
    tablaPersonas = $("#tablaPersonas").DataTable({
       "columnDefs":[{
           "targets": -1,
           "data":null,
           "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditar'>Editar</button><button class='btn btn-danger btnBorrar'>Borrar</button></div></div>",  
        },
        {
            "visible": false, "aTargets": [ 4 ],
        }],
        
    "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        },
    
    });
    
    function cargar_paises(){
        var pais = $("#pais_2");
        $.ajax({
            url: "bd/consultas/paises.php",
            type: "GET",
            dataType: "json", 
            success: function(data){ 
              pais.append('<option value="">' + 'Seleccione una opción' + '</option>');
              $(data).each(function(i, v){ 
                pais.append('<option value="' + v.id + '">' + v.pais + '</option>');
              })
            }
        }) 
    }
    cargar_paises();

    //capturar la fila para editar o borrar el registro
    var fila; 

    //click BOTONO NUEVO
    $("#btnNuevo").click(function(){
        $("#formPersonas").trigger("reset");
        $("#modalCRUD .modal-header").css("background-color", "#1cc88a");
        $("#modalCRUD .modal-header").css("color", "white");
        $("#modalCRUD .modal-title").text("Nueva Persona");            
        $("#modalCRUD").modal("show");        
        id=null;
        opcion = 1; //alta
    });    
        
    //botón EDITAR    
    $(document).on("click", ".btnEditar", function(){
        fila = $(this).closest("tr");
        id = parseInt(fila.find('td:eq(0)').text());
        nombre = fila.find('td:eq(1)').text();
        edad = parseInt(fila.find('td:eq(2)').text());
        var index = $("#tablaPersonas").DataTable().cell($(this).closest("td, li")).index();
        pais = (tablaPersonas.cells({ row: index.row, column: 4 }).data()[0]);

        $("#nombre").val(nombre);
        $("#edad").val(edad);
        $("#pais_2").val(pais);
        opcion = 2; //editar
        
        $("#modalCRUD .modal-header").css("background-color", "#4e73df");
        $("#modalCRUD .modal-header").css("color", "white");
        $("#modalCRUD .modal-title").text("Editar Persona");            
        $("#modalCRUD").modal("show"); 
        
    });

    //botón BORRAR
    $(document).on("click", ".btnBorrar", function(){    
        fila = $(this);
        id = parseInt($(this).closest("tr").find('td:eq(0)').text());
        nombre = $(this).closest("tr").find('td:eq(1)').text();
        opcion = 3 //borrar
        Swal.fire({
            title: 'Esta seguro?',
            html: "Esta eliminando a "+nombre,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Volver'
          }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "bd/crud.php",
                    type: "POST",
                    dataType: "json",
                    data: {opcion:opcion, id:id},
                    success: function(data){ 
                        tablaPersonas.row(fila.parents('tr')).remove().draw();
                        Toast.fire({
                            icon: 'success',
                            title: 'Eliminado'
                        })
                    }
                })
            }
          })
    });
        
    //enviar FORMULARIO
    $("#formPersonas").submit(function(e){
        e.preventDefault();    
        nombre = $.trim($("#nombre").val());
        pais = $.trim($("#pais").val());
        edad = $.trim($("#edad").val());
        fk_pais = $("#pais_2").val();   
        $.ajax({
            url: "bd/crud.php",
            type: "POST",
            dataType: "json",
            data: {nombre:nombre, pais:pais, edad:edad, id:id, opcion:opcion, fk_pais:fk_pais},
            success: function(data){   
                id = data[0].id;            
                nombre = data[0].nombre;
                pais = data[0].pais;
                edad = data[0].edad;
                id_pais = data[0].id_pais;
                if(opcion == 1){
                    tablaPersonas.row.add([id,nombre,edad,pais,id_pais]).draw();
                    Toast.fire({
                        icon: 'success',
                        title: 'Nueva persona agregada'
                    })
                }
                else{
                    tablaPersonas.row(fila).data([id,nombre,edad,pais,id_pais]).draw();
                    Toast.fire({
                        icon: 'success',
                        title: 'Persona editada'
                    })
                }           
            }        
        });
        $("#modalCRUD").modal("hide");    
        
    });    

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    $('#logoutModal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
    });
});