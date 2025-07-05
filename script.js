console.log("Script cargado correctamente");

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
  document.getElementById("btn-culture").innerText = langMap[lang].btns[1];
  document.getElementById("btn-food").innerText = langMap[lang].btns[2];
  document.getElementById("btn-adventure").innerText = langMap[lang].btns[3];
  document.getElementById("btn-night").innerText = langMap[lang].btns[4];
  document.getElementById("whatsapp-link").innerText = langMap[lang].whatsapp;
}

document.getElementById("lang-es").addEventListener("click", () => switchLang("es"));
document.getElementById("lang-en").addEventListener("click", () => switchLang("en"));

document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
