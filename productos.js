document.addEventListener('DOMContentLoaded', function() {
    const categoriaFiltro = document.getElementById('categoria-filtro');
    const ordenFiltro = document.getElementById('orden-filtro');
    const productosContenedor = document.querySelector('.Productos-contenedor'); // Contenedor único
    const productos = Array.from(productosContenedor.querySelectorAll('.Producto'));

    function aplicarFiltros() {
        // Guardamos los productos actualmente visibles para ordenarlos después
        let productosVisibles = [];
        const categoriaSeleccionada = categoriaFiltro.value;
        const ordenSeleccionado = ordenFiltro.value;

        // 1. Filtrar por categoría (ocultar/mostrar)
        productos.forEach(producto => {
            if (categoriaSeleccionada === 'todas') {
                producto.style.display = 'flex'; // 'flex' porque así está definido en el CSS
                productosVisibles.push(producto);
            } else if (producto.dataset.categoria === categoriaSeleccionada) {
                producto.style.display = 'flex';
                productosVisibles.push(producto);
            } else {
                producto.style.display = 'none';
            }
        });

        // 2. Ordenar
        productosVisibles.sort((a, b) => {
            const nombreA = a.querySelector('h3').textContent.toLowerCase();
            const nombreB = b.querySelector('h3').textContent.toLowerCase();

            if (ordenSeleccionado === 'az') {
                return nombreA.localeCompare(nombreB);
            } else if (ordenSeleccionado === 'za') {
                return nombreB.localeCompare(nombreA);
            }
            return 0; // Por defecto
        });

        // 3. Mostrar productos en el DOM
        // Reordenamos los elementos dentro del contenedor
        productosVisibles.forEach(producto => {
            productosContenedor.appendChild(producto); // Mueve el elemento al final, reordenando efectivamente
        });
    }

    // Leer el parámetro de la URL al cargar la página
    function aplicarFiltroDesdeURL() {
        const params = new URLSearchParams(window.location.search);
        const categoriaURL = params.get('categoria');

        if (categoriaURL && categoriaFiltro.querySelector(`option[value="${categoriaURL}"]`)) {
            categoriaFiltro.value = categoriaURL;
        }
        aplicarFiltros();
    }

    // Event Listeners para los filtros
    categoriaFiltro.addEventListener('change', aplicarFiltros);
    ordenFiltro.addEventListener('change', aplicarFiltros);

    // Aplicar filtro inicial al cargar la página
    aplicarFiltroDesdeURL();
});