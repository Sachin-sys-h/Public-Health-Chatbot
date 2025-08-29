// function D(){
//     window.location.href='DiseasePrevention.html'
// }
// function Back(){
//     window.location.href='index.html'
// }

const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const webhookUrl = "https://yourn8n.cloud/webhook/chatbot"; // 🔹 abhi add nhi hai mera
const optionsBox = document.getElementById('optionsBox');

function addMessage(message, sender, withAvatar = false) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  if (withAvatar && sender === "bot") {
    const avatar = document.createElement("img");
    avatar.src = "IMG_2074[1].JPG";
    avatar.alt = "Bot Avatar";
    avatar.className = "avatar";
    msgDiv.appendChild(avatar);
  }
  const textDiv = document.createElement("div");
  textDiv.className = "message-box";
  textDiv.innerText = message;
  msgDiv.appendChild(textDiv);
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(message = null) {
  if (message === null) {
    message = userInput.value.trim();
  }
  if (!message) return;

  // Add user message to chat
  addMessage(message, "user");
  userInput.value = "";

  // Send to n8n webhook abhi pending hai
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: message })
    });
    const data = await response.json();
    addMessage(data.reply, "bot", true);
  } catch (error) {
    addMessage("⚠️ Error connecting to server.", "bot", true);
  }
}

// Enter key support
userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Option button pe click  krne ke liye
if (optionsBox) {
  optionsBox.addEventListener('click', function(e) {
    if (e.target.closest('.option-btn')) {
      const btn = e.target.closest('.option-btn');
      const message = btn.innerText;
      sendMessage(message);
      // Hide all options after click
      optionsBox.style.display = 'none';
    }
  });
}