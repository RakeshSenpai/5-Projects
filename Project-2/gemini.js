const promptForm = document.querySelector('.prompt-form');
const promptInput = promptForm.querySelector('.prompt-input');
const chatContainer = document.querySelector(".chat-container");
const API_KEY = 'AIzaSyCk768keHxbOP7E2TZ9a-zeRw1lJ47BBGI'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`

let userMessage = '';
const chatHistory = []; 
const createMsgElem = (content, ...classes) => {
    const div = document.createElement('div')
    div.classList.add('message' , ...classes)
    div.innerHTML = content;
    return div;
}

const generateResponse = async () => {
    chatHistory.push({
        role: "user",
        parts: [{text : userMessage}]
    })
    try {
        const respons = await fetch(API_URL , {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({contents : chatHistory})
        });

        const data = await respons.json()
        if(!respons.ok) throw new Error(data.error.message)
            console.log(data) 

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
         generateResponse()
    }, 600);
}

promptForm.addEventListener('submit' , handleFromSubmit);