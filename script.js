const URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vScGVeDJn_MDqXI7pF0QRIwZMixeJH_dVgu5Ix9eYGboArPo2FqSU7ysA_Hgr9f2yx8x68R3okWxy1_/pub?output=csv";

let lugares = [];
let mapa;
let marcadores = [];

window.onload = () => {
  initMap();
  cargarCSV();
};

function initMap() {
  mapa = L.map('mapa').setView([6.2442, -75.5812], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapa);
}

function cargarCSV() {
  fetch(URL_CSV)
    .then(res => res.text())
    .then(data => {
      const filas = data.split('\n').slice(1);
      filas.forEach(fila => {
        const [nombre, descripcion, categoria, lat, lng, imagen] = fila.split(',');

        if (!nombre || !lat || !lng) return;

        const lugar = { nombre, descripcion, categoria, lat: parseFloat(lat), lng: parseFloat(lng), imagen };
        lugares.push(lugar);
      });

      mostrarLugares('Todos');
    });
}

function mostrarLugares(filtro) {
  document.getElementById("lugares").innerHTML = "";
  marcadores.forEach(m => mapa.removeLayer(m));
  marcadores = [];

  const filtrados = filtro === 'Todos' ? lugares : lugares.filter(l => l.categoria.trim() === filtro);

  filtrados.forEach(lugar => {
    const card = document.createElement("div");
    card.className = "lugar";
    card.innerHTML = `
      <img src="${lugar.imagen}" alt="${lugar.nombre}">
      <div class="info">
        <h3>${lugar.nombre}</h3>
        <p>${lugar.descripcion}</p>
        <p><strong>${lugar.categoria}</strong></p>
      </div>
    `;
    document.getElementById("lugares").appendChild(card);

    const marker = L.marker([lugar.lat, lugar.lng]).addTo(mapa)
      .bindPopup(<strong>${lugar.nombre}</strong><br>${lugar.descripcion});
    marcadores.push(marker);
  });
}

function filtrar(categoria) {
  mostrarLugares(categoria);
}