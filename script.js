let carruselIntervalo; // Hacemos el intervalo global para poder reiniciarlo

document.addEventListener('DOMContentLoaded', function() {
    const carrusel = document.querySelector('.Carrusel-contenedor');
    if (carrusel) {
        const imagenes = carrusel.querySelectorAll('img');
        let indice = 0;

        function mostrarImagen(indiceActual) {
            imagenes.forEach((img, i) => {
                img.style.display = i === indiceActual ? 'block' : 'none';
            });
        }

        // Hacemos esta función global para que los botones la puedan usar
        window.cambiarImagen = function(n) {
            indice += n;
            if (indice >= imagenes.length) { indice = 0; }
            if (indice < 0) { indice = imagenes.length - 1; }
            mostrarImagen(indice);

            // Reiniciar el intervalo para que el usuario tenga tiempo antes del cambio automático
            clearInterval(carruselIntervalo);
            carruselIntervalo = setInterval(() => cambiarImagen(1), 3500);
        }

        // Iniciar el carrusel
        mostrarImagen(indice);
        carruselIntervalo = setInterval(() => cambiarImagen(1), 3500);
    }
});