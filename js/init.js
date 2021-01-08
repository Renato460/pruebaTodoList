
window.mostrar = function(respuesta){
//
//Esta funcion crea las celdas dependiendo de la cantidad de datos que trae desde la api
//
    for(let i =0 ; i< respuesta.length;++i){
        
        let todo = respuesta[i];
        let tableRef = document.querySelector('.cells');
        let newRow = tableRef.insertRow()
        let newCell1 = newRow.insertCell(0)
        let newCell2 = newRow.insertCell(1)
        let newCell3 = newRow.insertCell(2)
        let newTextNombre = document.createTextNode(todo.nombre)
        let newTextDesc = document.createTextNode(todo.descripcion)
        newCell1.appendChild(newTextNombre)
        newCell2.appendChild(newTextDesc)
        console.log(todo.estado)
        let boton = document.createElement('button')
       if(todo.estado){
            boton.type='button'
            boton.classList.add('btn','btn-primary','estado')
            boton.innerText= 'Terminar'
            //
            //Se agrega un evento a los botones de estado, para terminar o no una tarea
            //
            boton.addEventListener("click",(event)=>{
                let tr = event.target.parentNode.parentNode.children
                axios({
                    method:'PUT',
                    url:'http://127.0.0.1:8000/api/'+tr[0].innerText+'/',
                    data:{
                        nombre: tr[0].innerText,
                        estado: false,
                        descripcion: tr[1].innerText
                    }
                })
                location.reload();

            })
            newCell3.appendChild(boton)
        }
        else{
            boton.type='button'
            boton.classList.add('btn','btn-danger')
            boton.innerText= 'Terminado'
            boton.addEventListener("click",(event)=>{
                let tr = event.target.parentNode.parentNode.children
                axios({
                    method:'PUT',
                    url:'http://127.0.0.1:8000/api/'+tr[0].innerText+'/',
                    data:{
                        nombre: tr[0].innerText,
                        estado: true,
                        descripcion: tr[1].innerText
                    }
                })
                location.reload();
            })
            newCell3.appendChild(boton)
        }
    }
};



window.nuevoTodo = function(){
    //
    //Funcion que ingresa una nueva tarea por formulario y metodo POST
    //
    let formulario = document.forms['todoNew'];
    let nombreNuevo= formulario.nombre.value;
    let descripcionNueva = formulario.description.value;

    axios({
        method:'POST',
        url:'http://127.0.0.1:8000/api/',
        data:{
            nombre: nombreNuevo,
            estado: true,
            descripcion: descripcionNueva
        }
    }).then(res=> console.log(res.data))
    location.reload();
};


window.addEventListener('DOMContentLoaded', async ()=>{
    //
    //Trae todas las listas de tareas
    //
    let response = await axios.get("http://127.0.0.1:8000/api/");
    

    mostrar(response.data)
});