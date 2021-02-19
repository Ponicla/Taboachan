let $carta = document.querySelector("#carta");

$(document).ready(function () {
    var ruta = "/corona/dashboard/";

    if (window.location.pathname == ruta + "cards.php") {

        function cargar_tareas(){
            $.ajax({
                url: "bd/consultas/tareas.php",
                type: "GET",
                dataType: "json", 
                success: function(data){ 
                    var tareas = data;
                    var template = ``;
                    tareas.forEach(tarea => {
                        template += `
                        
                        <div class="card border-primary mb-3 mr-4" style="max-width: 18rem;">
                            <div class="card-header">Tarea N° ${tarea.id}</div>
                            <div class="card-body text-primary">
                                <h5 class="card-title">${tarea.tarea}</h5>
                                <p class="card-text">${tarea.detalle}</p>
                            </div>
                            <div class="card-footer" >
                                <a type="button" style="color: #0A77F1" onclick="carta_clic(${tarea.id}, '${tarea.tarea}')"> <i class="fas fa-inbox fa-sm"></i> Test</a>
                            </div>
                        </div>`;
                    });
                    $carta.innerHTML = template;
                }
            }) 
        }
        cargar_tareas();

        
    }

    
})

function carta_clic(id, nombre){
    Swal.fire({ 
        html: 'Tarea N° '+ id+' - '+nombre,
        timer: 2000,
        showConfirmButton: false
    })
}