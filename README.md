# Enkel Chattapplikation 🚀

Detta är en enkel realtidschattapplikation byggd med **Node.js**, **Express**, och **Socket.IO**.
Användare kan ansluta, skicka meddelanden och se när andra skriver.

## 📌 Funktioner
- Realtidskommunikation med **Socket.IO**
- Användaranslutning och frånkoppling
- Meddelanden visas direkt för alla användare
- "Användaren skriver..."-indikator

## 🛠 Tekniker som används
- **Node.js** – Servermiljö
- **Express.js** – Webbramverk
- **Socket.IO** – WebSocket-baserad realtidskommunikation
- **HTML/CSS/JavaScript** – Frontend

## 🔧 Installation och körning
1. **Kloning av repository**
   ```sh
   git clone https://github.com/ditt-repo/websockets.git
   cd websockets
   ```
2. **Installera beroenden**
   ```sh
   npm install
   ```
3. **Starta servern**
   ```sh
   npm start
   ```
4. **Öppna applikationen**
   - Gå till `http://localhost:3000` i din webbläsare.

## 📜 Projektstruktur
```
chat-app/
│── static/              # Frontend-filer (HTML, CSS, JS)
│   ├── index.html       # Huvudsida
│   ├── style.css        # Stilmall      
│── server.js            # Huvudserverfilen
│── index.js             # Hanterar klientsidan
│── package.json         # Projektberoenden
│── README.md            # Dokumentation
```

## 📌 Användning
1. Öppna applikationen i webbläsaren.
2. Ange ett användarnamn och gå med i chatten.
3. Börja chatta med andra användare i realtid!

## 🚀 Kommande förbättringar
- Stöd för flera chattrum
- Användarhantering med autentisering
- Meddelandeloggning med databas


