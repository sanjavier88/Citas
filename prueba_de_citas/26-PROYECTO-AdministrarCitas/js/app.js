const  mascotaInput = document.querySelector('#mascota')
const  propietarioInput = document.querySelector('#propietario')
const  telefonoInput = document.querySelector('#telefono')
const  fechaInput = document.querySelector('#fecha')
const  horaInput = document.querySelector('#hora')
const  sintomasInput = document.querySelector('#sintomas')

const formulario = document.querySelector('#nueva-cita');
const contenedorCita = document.querySelector('#citas')

let edicion;

class Cita {
    constructor(){
        this.citas = []
    }

    llenarArray(cita){
        this.citas = [...this.citas, cita]
        // console.log(this.citas)
    }
    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id)
        console.log(this.citas)
    }
    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita )

    }
   
}


class UI {
    mostrarAlertas(mensaje, tipo){

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('alert','text-center', 'd-block', 'col-12')
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger')
        }else{
            divMensaje.classList.add('alert-seccess')
        }
        divMensaje.textContent = mensaje;
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'))

        setTimeout(()=>{
            divMensaje.remove()
        },5000)
    }

    mostrarCita({citas}){

        this.limpiarHTML()

        citas.forEach(cita => {

            const {mascota, propietario, telefono,fecha, hora, sintomas, id} = cita

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3')
            divCita.dataset.id = id
            
            const mascotaParrafo = document.createElement('h2')
            mascotaParrafo.classList.add('card-title', 'font-weight-bold')
            mascotaParrafo.textContent = mascota

            const propietarioParrafo = document.createElement( 'p' )
            propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder"> Propietario: </span> ${propietario} 
            `
            const telefonoParrafo = document.createElement( 'p' )
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder"> Telefono: </span> ${telefono} 
            `
            const fechaParrafo = document.createElement( 'p' )
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder"> Fecha: </span> ${fecha} 
            `
            const horaParrafo = document.createElement( 'p' )
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder"> Hora: </span> ${hora} 
            `
            const sintomasParrafo = document.createElement( 'p' )
            sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder"> Sintomas: </span> ${sintomas} 
            `

            const btnEliminar = document.createElement('button')
            btnEliminar.classList.add('btn','btn-danger', 'mr-2')
            btnEliminar.textContent = 'Eliminar'

            btnEliminar.onclick = ()=>{
                eliminarCita(id)
            }

           

            const btnEditar = document.createElement('button')
            btnEditar.classList.add('btn','btn-info')
            btnEditar.textContent = 'Editar'

            btnEditar.onclick= () =>{
                editarCita(cita)
            }

            divCita.appendChild(mascotaParrafo)
            divCita.appendChild(propietarioParrafo)
            divCita.appendChild(telefonoParrafo)
            divCita.appendChild(fechaParrafo)
            divCita.appendChild(horaParrafo)
            divCita.appendChild(sintomasParrafo)
            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnEditar)
           
            
            

            contenedorCita.append(divCita);
            
        });
    }
    limpiarHTML(){
        while(contenedorCita.firstChild){
            contenedorCita.removeChild(contenedorCita.firstChild)
        
        }
    }
}


eventListener()
function eventListener(){
    
    mascotaInput.addEventListener('input', crearObjeto)
    propietarioInput.addEventListener('input', crearObjeto)
    telefonoInput.addEventListener('input', crearObjeto)
    fechaInput.addEventListener('input', crearObjeto)
    horaInput.addEventListener('input', crearObjeto)
    sintomasInput.addEventListener('input', crearObjeto)

    formulario.addEventListener('submit', cargarFormulario)
}



const citasObj = {
    mascota : '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

const asiganarCita = new Cita()
const ui = new UI()


function crearObjeto(e){

    citasObj[e.target.name] = e.target.value

   
}

function cargarFormulario(e){
    e.preventDefault()

    const {mascota, propietario, telefono, fecha, hora, sintomas, id} =  citasObj;

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
       ui.mostrarAlertas('Todos los campos deben ir diligenciados','error')
        return
    }

    if(edicion){
        
        asiganarCita.editarCita({...citasObj});


        ui.mostrarAlertas('Cita editada con exito')

        
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita' 

        edicion = false
    }else{
        
        citasObj.id = Date.now()
    
        asiganarCita.llenarArray({...citasObj})

        ui.mostrarAlertas('Cita cargada con exito')
    }
     
    ui.mostrarCita(asiganarCita)
   
    resestFormulario()

    formulario.reset()




}


function resestFormulario(){

    citasObj.mascota = '';
    citasObj.propietario = '';
    citasObj.telefono = '';
    citasObj.fecha = '';
    citasObj.hora = '';
    citasObj.sintomas = '';

}


function eliminarCita(cita){

    asiganarCita.eliminarCita(cita);

    ui.mostrarAlertas('La cita se elimino correctamente')

    ui.mostrarCita(asiganarCita)
}

function editarCita(cita){
   
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita

    mascotaInput.value = mascota
    propietarioInput.value = propietario
    telefonoInput.value = telefono
    fechaInput.value = fecha
    horaInput.value = hora
    sintomasInput.value = sintomas

    citasObj.mascota = mascota
    citasObj.propietario = propietario
    citasObj.telefono = telefono
    citasObj.fecha = fecha
    citasObj.hora = hora
    citasObj.sintomas = sintomas
    citasObj.id = id

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar Cita' 


    edicion = true
}