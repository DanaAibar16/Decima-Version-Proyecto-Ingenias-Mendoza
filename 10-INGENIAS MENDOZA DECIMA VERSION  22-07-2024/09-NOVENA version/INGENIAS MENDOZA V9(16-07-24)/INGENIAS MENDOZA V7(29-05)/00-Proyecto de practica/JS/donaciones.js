document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('donation-form');
    const listaDonaciones = document.getElementById('donaciones-lista');

    function leerDatos() {
        let datos = localStorage.getItem('donaciones');
        return datos ? JSON.parse(datos) : { donaciones: [] };
    }

    function guardarDatos(datos) {
        localStorage.setItem('donaciones', JSON.stringify(datos));
    }

    function agregarElemento(donacion) {
        let datos = leerDatos();
        datos.donaciones.push(donacion);
        guardarDatos(datos);
    }

    function mostrarDatos() {
        let datos = leerDatos();
        listaDonaciones.innerHTML = '';
        datos.donaciones.forEach(donacion => {
            let item = document.createElement('div');
            item.textContent = `Nombre: ${donacion.name}, Email: ${donacion.email}, Número: ${donacion.phone}, Monto: ${donacion.amount}, Mensaje: ${donacion.message}`;
            listaDonaciones.appendChild(item);
        });
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (form.checkValidity()) {
            let donacion = {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                amount: form.amount.value,
                message: form.message.value
            };
            agregarElemento(donacion);
            mostrarDatos();
            document.getElementById('form-container').classList.add('hidden');
            document.getElementById('success-message').classList.remove('hidden');
        } else {
            form.reportValidity();
        }
    });
    // Mostrar datos al cargar la página
    mostrarDatos();
});
