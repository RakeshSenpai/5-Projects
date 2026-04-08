const promptForm = document.querySelector('.prompt-form')
const promptInput = promptForm.querySelector('.prompt-input')

let userMessage = '';
const handleFromSubmit = (e) => {
    e.preventDefault()
    userMessage = promptInput.value.trim()
    if(!userMessage) return
    console.log(userMessage)
}

promptForm.addEventListener('submit' , handleFromSubmit)