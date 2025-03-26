const express = require("express");
const http = require('http'); // Importerar HTTP-modulen för att skapa en HTTP-server
const socketio = require('socket.io'); // Importerar Socket.IO för realtidskommunikation


const app = express(); // Skapar en Express-app
const server = http.createServer(app); // Skapar en HTTP-server med Express-appen
const io = socketio(server); // Skapar en Socket.IO-server som lyssnar på HTTP-servern


app.use(express.static("static")); // Anger att statiskt innehåll ska serveras från mappen 'static'


// Socket-server
io.on("connection", (socket) => {
  // När en klient ansluter till servern
  socket.on("join", (username) => {
    // Tilldelar användarnamn till klientens socket-objekt
    socket.username = username;
    // Meddelar anslutna klienter att en ny användare har anslutit till chatten (förutom avsändaren)
    socket.broadcast.emit("user joined", username);
  });

  // När en klient skickar ett nytt meddelande
  socket.on("new message", (message) => {
    // Lägger ihop meddelandet med användarnamnet
    const composedMessage = socket.username + ": " + message;
    // Skickar meddelandet till anslutna klienter (inkl avsändaren)
    io.emit("send message", composedMessage);
  });

  // När en klient börjar skriva ett meddelande
  socket.on("typing", () => {
    // Meddelar anslutna klienter att denna klient skriver
    socket.broadcast.emit("is typing", socket.username);
  });

  // När en klient slutar skriva ett meddelande
  socket.on("stop typing", () => {
    // Meddelar anslutna klienter att denna klient inte längre skriver
    socket.broadcast.emit("not typing");
  });

  // När en klient kopplar från servern
  socket.on("disconnect", () => {
    // Loggar i serverns konsol att en användare har kopplat från
    console.log("User disconnected");
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server started on port:", port);
});
