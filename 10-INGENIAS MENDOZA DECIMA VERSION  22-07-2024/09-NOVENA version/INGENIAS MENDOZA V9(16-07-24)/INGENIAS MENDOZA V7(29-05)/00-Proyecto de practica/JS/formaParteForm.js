//Creamos las funciones y eventos para cargar y mostrar datos
//de los voluntarios

document.addEventListener('DOMContentLoaded', function(){

    const form = document.getElementById('contact-form');
    const listaVoluntarios = document.getElementById('voluntarios-lista');

    function leerDatos(){
        let datos = localStorage.getItem('voluntarios');
        return datos ? JSON.parse(datos): {voluntarios: []};
    }

    function guardarDatos(datos){
        localStorage.setItem('voluntarios', JSON.stringify(datos));
    }

    function agregarElemento(voluntario){
        let datos = leerDatos();
        datos.voluntarios.push(voluntario);
        guardarDatos(datos);
    }

    function mostrarDatos(){
        let datos = leerDatos();
        listaVoluntarios.innerHTML = '';
        
        datos.voluntarios.forEach(voluntario =>{
            let item = document.createElement('div');
            item.textContent = 'Nombre: ${voluntario.name}, Email: ${voluntario.email}, Numero: ${voluntario.phone}, Mensaje: ${voluntario.message}';
            listaVoluntarios.appendChild(item);
            
        });
    }

    form.addEventListener('submit', function(event){
        event.preventDefault();
        if(form.checkValidity()){
            let voluntario = {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                message: form.message.value
            };

            agregarElemento(voluntario);
            mostrarDatos();

            document.getElementById('form-container').classList.add('hidden');
            document.getElementById('success-message').classList.remove('hidden');
        }else{
            form.reportValidity();
        }
    });
    //Mostrar los datos al cargar la pagina
    mostrarDatos();
});


