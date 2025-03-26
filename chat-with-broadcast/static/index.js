let socketIO = io(); //Initiera socket.io

const usernameElem = document.querySelector("#message");
const submitButton = document.querySelector("#submit");
const chatMessageInput = document.querySelector("#chat-message");
const sendButton = document.querySelector("#send");
const login = document.querySelector(".login");
const chat = document.querySelector(".chat");
let chatArea = document.querySelector(".chat-area");

// Funktioner som används för att hantera händelser 

function showChat() {
  // Döljer inloggningsdelen och visar chatt-delen av gränssnittet
  login.classList.add("hide");
  chat.classList.add("show");
}

function addTypingMessage(username) {
  // Lägger till meddelande om att användaren skriver 
  const typingElem = document.querySelector(".typingMessage");
  typingElem.innerHTML = username + " is typing";
}

function removeTypingMessage() {
  // Tar bort meddelandet om att användaren skriver efter 1 sek
  const typingElem = document.querySelector(".typingMessage");

  setTimeout(() => {
    typingElem.innerHTML = " ";
  }, 1000);
}

function addChatMessage(message) {
  // Lägger till ett nytt chattmeddelande 
  let chatMessage = document.createElement("p");
  chatMessage.innerHTML = message;
  chatArea.append(chatMessage);
}

function reset() {
  // Återställer innehållet i chattmeddelande-inputfältet
  chatMessageInput.value = "";
}

// Event listeners för olika användarinteraktioner

submitButton.addEventListener("click", () => {
  // Hanterar klickhändelsen på submit-knappen
  const username = usernameElem.value;
  // Skickar användarens namn till servern när den loggar in
  socketIO.emit("join", username);

  // Visar chattgränssnittet
  showChat();
});

sendButton.addEventListener("click", () => {
  // Hanterar klickhändelsen på submit-knappen
  const message = chatMessageInput.value;
  // Skickar det skrivna meddelandet till servern
  socketIO.emit("new message", message);

  // Återställer innehållet i inputfältet för chattmeddelanden
  reset();
});

chatMessageInput.addEventListener("keydown", () => {
  // Skickar signal till servern när användaren börjar skriva
  socketIO.emit("typing");
});

chatMessageInput.addEventListener("keyup", () => {
  // Skickar signal till servern när användaren slutar skriva
  socketIO.emit("stop typing");
});

// Socket.IO prenumererar på händelser från servern
socketIO.on("user joined", (username) => {
  // Hanterar händelsen: ny användare ansluter + lägger till ett meddelande i chatten
  const chatMessage = username + " joined the chat";
  addChatMessage(chatMessage);
});

socketIO.on("send message", (message) => {
  // Hanterar händelsen: nytt meddelande tas emot + lägger till det i chatten
  addChatMessage(message);
});

socketIO.on("is typing", (username) => {
  // Hanterar händelsen: någon börjar skriva + visar i UI
  addTypingMessage(username);
});

socketIO.on("not typing", (username) => {
  // Hanterar händelsen: någon slutar skriva + tar bort från UI
  removeTypingMessage();
});
