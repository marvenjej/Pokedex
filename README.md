# 🔴 Pokedex

Ein digitaler Pokédex, der Pokémon live aus der [PokéAPI](https://pokeapi.co/) lädt und als Karten darstellt.  
Das Projekt zeigt den Umgang mit einer externen API: Daten abrufen, dynamisch rendern, durchsuchen und in einem Detaildialog anzeigen.

> Lernprojekt im Rahmen meiner Weiterbildung zum Softwareentwickler.

---

## ✨ Funktionen

- **Pokémon-Karten**: Bild, Name und Typen, gefärbt nach Haupttyp
- **Load more**: Lädt 20 weitere Pokémon, mit Ladescreen
- **Detaildialog**: Typen und Werte (HP, Attack, Defense), blättern mit Pfeilen
- **Suche**: Ab 3 Buchstaben, mit Hinweis ohne Treffer
- **Barrierefreiheit**: ARIA-Labels und Tastaturbedienung
- **Responsive Design**: Bis 320 px Breite, mobil mit Lupen-Button

## 🛠️ Technologien

| Technologie | Einsatz |
|---|---|
| **HTML5** | Struktur der Seite, `<dialog>` für die Detailansicht |
| **CSS3** | Layout & Styling (Grid, Flexbox, Media Queries) |
| **JavaScript (Vanilla)** | API-Anfragen mit `fetch`, Rendering, Suche, Dialog-Steuerung |
| **PokéAPI** | Datenquelle für Pokémon, Bilder, Typen und Werte |

Keine Frameworks, keine Bibliotheken: bewusst reines HTML, CSS und JavaScript.

## 📁 Projektstruktur

```
Pokedex/
├── index.html
├── script.js           # Logik: Laden, Rendern, Suche, Dialog
├── style.css           # Grundlayout: Header und Suche
├── scripts/
│   ├── api.js          # API-Zugriff (PokéAPI)
│   └── template.js     # Reine HTML-Templates für Karten, Typen und Werte
├── styles/
│   ├── components.css  # Karten, Dialog und Ladescreen
│   ├── default.css     # Reset, Variablen, Content-Begrenzung
│   └── fonts.css
└── assets/
    ├── fonts/
    ├── icons/          # Logo, Favicon, Such-Icon
    └── img/
```

## 📚 Was ich dabei gelernt habe

- Daten mit `fetch` und `async`/`await` aus einer externen API laden
- Mehrere Anfragen parallel mit `Promise.all` ausführen und Fehler abfangen
- Dynamisches Rendern mit Template-Funktionen und Trennung von Daten, Templates und Logik
- Arbeiten mit dem `<dialog>`-Element und Wrap-around-Navigation mit Modulo
- Barrierefreiheit und responsive Layouts bis 320 px

## 👤 Autor

**Marven Jansen**
