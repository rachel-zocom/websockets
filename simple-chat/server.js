// Importerar nödvändiga moduler
const express = require('express'); // Importerar Express för att hantera servern
const http = require('http'); // Importerar HTTP-modulen för att skapa en HTTP-server
const socketio = require('socket.io'); // Importerar Socket.IO för realtidskommunikation


const app = express(); // Skapar en Express-app
const server = http.createServer(app); // Skapar en HTTP-server med Express-appen
const io = socketio(server); // Skapar en Socket.IO-server som lyssnar på HTTP-servern

// Anger att statiskt innehåll ska serveras från mappen 'public'
app.use(express.static(__dirname + '/static'));

// Lyssnar efter inkommande Socket.IO-anslutningar
io.on('connection', (socket) => {
    console.log("En användare har anslutit"); // Loggar när en användare ansluter

    // Lyssnar efter när en användare kopplar från
    socket.on('disconnect', () => {
        console.log("En användare har kopplat från"); // Loggar när en användare kopplar från
    });

    // Lyssnar efter meddelanden från klienten med händelsen 'chat message'
    socket.on('chat message', (message) => {
        // Skickar meddelandet till alla anslutna klienter
        io.emit('chat message', message);
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Servern är igång och lyssnar på port ${port}`); 
});
