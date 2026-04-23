const promptForm = document.querySelector('.prompt-form');
const promptInput = promptForm.querySelector('.prompt-input');
const chatContainer = document.querySelector(".chat-container");
const API_KEY = 'AIzaSyAvp8MckrkmEn_D_3AVZcyU4vKqVcs1aSM';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`

let userMessage = '';
const chatHistory = []; 
const createMsgElem = (content, ...classes) => {
    const div = document.createElement('div')
    div.classList.add('message' , ...classes)
    div.innerHTML = content;
    return div;
}

const generateResponse = async (botMsgDiv) => {
    const textElement = botMsgDiv.querySelector(".message-text")
    chatHistory.push({
        role: "user",
        parts: [{text : userMessage}]
    })
    try {
        const respons = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({contents : chatHistory})
        });

        const data = await respons.json()
        if(!respons.ok) throw new Error(data.error.message)
            console.log(data)
        const responseText = data.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g, "$1").trim()
        textElement.textContent = responseText;

    } catch (error) {
        console.log(error)
    }    
}

const handleFromSubmit = (e) => {
    e.preventDefault()
    userMessage = promptInput.value.trim()
    if(!userMessage) return;

    promptInput.value = "";

    const userMsgHtml = `<p class="message-text"></p>`
    const userMsgDiv = createMsgElem(userMsgHtml, "user-message")

    userMsgDiv.querySelector('.message-text').textContent = userMessage
    chatContainer.appendChild(userMsgDiv)

    // Gemini avatar set time out

    setTimeout(() => {
        const botMsgHtml = `<img src="resources/gemini-chatbot-logo.svg" class="avatar"><p class="message-text">Just a sec..</p>`
        const botMsgDiv = createMsgElem(botMsgHtml, "bot-message", "loading")
        chatContainer.appendChild(botMsgDiv)
         generateResponse(botMsgDiv)
    }, 600);

    console.log(botMsgHtml)
}

promptForm.addEventListener('submit' , handleFromSubmit);