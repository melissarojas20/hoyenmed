const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vScGVeDJn_MDqXI7pF0QRIwZMixeJH_dVgu5Ix9eYGboArPo2FqSU7ysA_Hgr9f2yx8x68R3okWxy1_/pub?output=csv';

let map = L.map('map').setView([6.2442, -75.5812], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let markers = [];
fetch(CSV_URL)
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\\n').slice(1);
    rows.forEach(row => {
      const [name, lat, lon, category] = row.split(',');
      const marker = L.marker([lat, lon]).addTo(map).bindPopup(<b>${name}</b><br>${category});
      marker.category = category.trim();
      markers.push(marker);
    });
  });

document.querySelectorAll('.filters button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const selected = btn.dataset.category;
    markers.forEach(marker => {
      const show = selected === 'Todos' || selected === 'All' || marker.category === selected;
      if (show) map.addLayer(marker);
      else map.removeLayer(marker);
    });
  });
});

const langMap = {
  es: {
    title: "Hoy en Med",
    subtitle: "¿Qué quieres hacer hoy en Medellín?",
    btns: ["Todos", "Cultura", "Comida", "Aventura", "Noche"],
    whatsapp: "📱 Contáctanos"
  },
  en: {
    title: "Hoy in Med",
    subtitle: "What would you like to do today in Medellín?",
    btns: ["All", "Culture", "Food", "Adventure", "Night"],
    whatsapp: "📱 Contact us"
  }
};

function switchLang(lang) {
  document.getElementById("title").innerText = langMap[lang].title;
  document.getElementById("subtitle").innerText = langMap[lang].subtitle;
  document.getElementById("btn-all").innerText = langMap[lang].btns[0];
  document.getElementById("btn-all").dataset.category = langMap[lang].btns[0];
  document.getElementById("btn-culture").innerText = langMap[lang].btns[1];
  document.getElementById("btn-culture").dataset.category = langMap[lang].btns[1];
  document.getElementById("btn-food").innerText = langMap[lang].btns[2];
  document.getElementById("btn-food").dataset.category = langMap[lang].btns[2];
  document.getElementById("btn-adventure").innerText = langMap[lang].btns[3];
  document.getElementById("btn-adventure").dataset.category = langMap[lang].btns[3];
  document.getElementById("btn-night").innerText = langMap[lang].btns[4];
  document.getElementById("btn-night").dataset.category = langMap[lang].btns[4];
  document.getElementById("whatsapp-link").innerText = langMap[lang].whatsapp;

  document.querySelectorAll('.lang-switch button').forEach(b => b.classList.remove('active'));
  document.getElementById("lang-" + lang).classList.add("active");
}

document.getElementById("lang-es").addEventListener("click", () => switchLang("es"));
document.getElementById("lang-en").addEventListener("click", () => switchLang("en"));

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