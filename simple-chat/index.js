const socketIO = io(); // Initiera socket.io

// DOM-element
const usernameInput = document.querySelector("#message");
const submitButton = document.querySelector("#submit");
const chatMessageInput = document.querySelector("#chat-message");
const sendButton = document.querySelector("#send");
const loginScreen = document.querySelector(".login");
const chatScreen = document.querySelector(".chat");
const chatArea = document.querySelector(".chat-area");
const typingMessageElem = document.querySelector(".typingMessage");

// Variabler
let username = "";

// 🟢 Visa chatten efter inloggning
function showChat() {
  loginScreen.classList.add("hide");
  chatScreen.classList.add("show");
}

// 🟢 Lägg till ett meddelande i chatten
function addChatMessage(message) {
  const chatMessage = document.createElement("p");
  chatMessage.textContent = message;
  chatArea.appendChild(chatMessage);
}

// 🟢 Hantera "skriver"-meddelande
function handleTypingMessage(name, isTyping) {
  typingMessageElem.textContent = isTyping ? `${name} is typing...` : "";
}

// 🟢 Rensa inputfältet efter att ha skickat ett meddelande
function resetInput() {
  chatMessageInput.value = "";
}

// 🔹 Event Listeners
submitButton.addEventListener("click", (event) => {
  event.preventDefault(); // Förhindra eventuell form-submission
  username = usernameInput.value.trim();

  if (username) {
    socketIO.emit("join", username);
    showChat();
  }
});

sendButton.addEventListener("click", () => {
  const message = chatMessageInput.value.trim();

  if (message) {
    socketIO.emit("new message", message);
    resetInput();
  }
});

chatMessageInput.addEventListener("keydown", () =>
  socketIO.emit("typing", username)
);
chatMessageInput.addEventListener("keyup", () =>
  setTimeout(() => socketIO.emit("stop typing"), 1000)
);

// 🔹 Socket.IO event listeners
socketIO.on("user joined", (name) => addChatMessage(`${name} joined the chat`));
socketIO.on("send message", addChatMessage);
socketIO.on("is typing", (name) => handleTypingMessage(name, true));
socketIO.on("not typing", () => handleTypingMessage("", false));
