document.addEventListener('DOMContentLoaded', function() {
    const carrusel = document.querySelector('.Carrusel-contenedor');
    const imagenes = carrusel.querySelectorAll('img');
    let indice = 0;

    function mostrarImagen(indiceActual) {
        imagenes.forEach((img, i) => {
            img.style.display = i === indiceActual ? 'block' : 'none';
        });
    }

    function siguienteImagen() {
        indice = (indice + 1) % imagenes.length;
        mostrarImagen(indice);
    }

    mostrarImagen(indice);
    setInterval(siguienteImagen, 3000);
});