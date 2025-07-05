
const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vScGVeDJn_MDqXI7pF0QRIwZMixeJH_dVgu5Ix9eYGboArPo2FqSU7ysA_Hgr9f2yx8x68R3okWxy1_/pub?output=csv';

let lugares = [];

async function cargarLugares() {
  const res = await fetch(sheetURL);
  const data = await res.text();
  const rows = data.split('\n').slice(1);

  lugares = rows.map(row => {
    const [nombre, categoria, descripcion, imagen, link] = row.split(',');
    return { nombre, categoria, descripcion, imagen, link };
  });

  mostrarLugares(lugares);
}

function mostrarLugares(lista) {
  const contenedor = document.getElementById('contenedor-lugares');
  contenedor.innerHTML = '';
  lista.forEach(lugar => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${lugar.imagen}" alt="${lugar.nombre}" />
      <div class="card-content">
        <h3>${lugar.nombre}</h3>
        <p>${lugar.descripcion}</p>
        <a href="${lugar.link}" target="_blank">Contactar por WhatsApp</a>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

function filtrarLugares() {
  const categoria = document.getElementById('categoria').value.toLowerCase();
  const texto = document.getElementById('busqueda').value.toLowerCase();

  const filtrados = lugares.filter(lugar => {
    return (
      (!categoria || lugar.categoria.toLowerCase().includes(categoria)) &&
      (!texto || lugar.nombre.toLowerCase().includes(texto) || lugar.descripcion.toLowerCase().includes(texto))
    );
  });

  mostrarLugares(filtrados);
}

window.onload = cargarLugares;
