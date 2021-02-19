$('#formLogin').submit(function(e){
   e.preventDefault();
   var usuario = $.trim($("#usuario").val());    
   var password =$.trim($("#password").val());    
    
   if(usuario.length == "" || password == ""){
      Swal.fire({
          type:'warning',
          title:'Debe ingresar un usuario y/o password',
      });
      return false; 
    }else{
        $.ajax({
           url:"bd/login.php",
           type:"POST",
           datatype: "json",
           data: {usuario:usuario, password:password}, 
           success:function(data){               
               if(data == "null"){
                Swal.fire({
                    icon:'error',
                    title:'Usuario y/o contraseña incorrecta',
                    confirmButtonColor:'#3085d6',
                    showConfirmButton: false,
                    timer: 2500
                })
               }else{
                   Swal.fire({
                       icon:'success',
                       title:'Conexión exitosa',
                       confirmButtonColor:'#3085d6',
                       showConfirmButton: false,
                       timer: 1000
                   })
                   
                    setTimeout(() => {
                        window.location.href = "dashboard/index.php";
                    }, 1100);   
               }
           }    
        });
    }     
});