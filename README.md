# Mega-Holz — O-SEE Challenge 2026 Merch-Planner

Interaktives Budget-Tool für die Merch- und Event-Planung zur O-SEE Challenge 2026 (14.–16. August, Olbersdorfer See, Zittau).

## Features

- **Alle Artikel auf einen Blick** mit drei Preisstufen (Budget / Mid / Premium)
- **Voll editierbar**: Namen, Beschreibungen, Mengen und Stückpreise direkt anklicken und ändern
- **Checkbox-System**: Nur angehakte Artikel fließen ins Budget
- **Neue Artikel hinzufügen** und bestehende löschen
- **Live-Budgetberechnung** pro Kategorie und gesamt

## Kategorien

- 👕 Team Outfit
- ⛺ Stand-Ausstattung
- 🏆 Premium Merch
- 🎁 Giveaways
- 🥤 Verpflegung

## Setup

Die Datei `merch-planner.jsx` ist eine React-Komponente. Sie kann als Claude Artifact gerendert oder in ein bestehendes React-Projekt eingebunden werden.

### Als standalone React App

```bash
npx create-react-app merch-app
cp merch-planner/merch-planner.jsx merch-app/src/App.jsx
cd merch-app && npm start
```

## Event-Kontext

- **Event**: XTERRA O-SEE Challenge 2026
- **Ort**: Olbersdorfer See, Zittau
- **Aufbau**: 2 Zelte (je 25qm), gebrandeter LKW, Hüpfburg
- **Erwartete Besucher**: ~1.000 Athleten + ~8.000 Zuschauer über 3 Tage
