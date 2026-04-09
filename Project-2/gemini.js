const promptForm = document.querySelector('.prompt-form')
const promptInput = promptForm.querySelector('.prompt-input')

let userMessage = '';

const createMsgElem = (content, className) => {
    const div = document.createElement('div')
    div.classList.add('message' , className)
    div.innerHTML = content
    return div;
}

const handleFromSubmit = (e) => {
    e.preventDefault()
    userMessage = promptInput.value.trim()
    if(!userMessage) return
    const userMsgHtml = `<p class="message-text"></p>`
    const userMsgDiv = createMsgElem(userMsgHtml, "user-message")
}

promptForm.addEventListener('submit' , handleFromSubmit)