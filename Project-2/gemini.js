const promptForm = document.querySelector('.prompt-form')
const promptInput = promptForm.querySelector('.prompt-input')
const chatContainer = document.querySelector(".chat-container")

let userMessage = '';

const createMsgElem = (content, ...classes) => {
    const div = document.createElement('div')
    div.classList.add('message' , ...classes)
    div.innerHTML = content
    return div;
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

    setTimeout(() => {
        const botMsgHtml = `<img src="resources/gemini-chatbot-logo.svg" class="avatar"><p class="message-text">Just a sec..</p>`
        const botMsgDiv = createMsgElem(botMsgHtml, "bot-message", "loading")
        chatContainer.appendChild(botMsgDiv)
         
    }, 600);
}

promptForm.addEventListener('submit' , handleFromSubmit)
console.log('submit')
console.log('submit')
console.log('submit')