const translations = {
    es: {
        title: "Hoy en Med",
        subtitle: "¿Qué quieres hacer hoy en Medellín?",
        btn_all: "Todos",
        btn_culture: "Cultura",
        btn_food: "Comida",
        btn_adventure: "Aventura",
        btn_night: "Noche"
    },
    en: {
        title: "Today in Med",
        subtitle: "What do you want to do today in Medellín?",
        btn_all: "All",
        btn_culture: "Culture",
        btn_food: "Food",
        btn_adventure: "Adventure",
        btn_night: "Night"
    }
};

function setLanguage(lang) {
    document.getElementById("title").innerText = translations[lang].title;
    document.getElementById("subtitle").innerText = translations[lang].subtitle;
    document.getElementById("btn-all").innerText = translations[lang].btn_all;
    document.getElementById("btn-culture").innerText = translations[lang].btn_culture;
    document.getElementById("btn-food").innerText = translations[lang].btn_food;
    document.getElementById("btn-adventure").innerText = translations[lang].btn_adventure;
    document.getElementById("btn-night").innerText = translations[lang].btn_night;
}

document.getElementById("lang-es").addEventListener("click", () => setLanguage("es"));
document.getElementById("lang-en").addEventListener("click", () => setLanguage("en"));

let map = L.map('map').setView([6.2442, -75.5812], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);