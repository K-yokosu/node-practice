const textInputElement = document.getElementById('text-input')
const submitButtonElement = document.getElementById('submit-button')

textInputElement.addEventListener('input', (event) => {
  const inputValue = event.target.value
  submitButtonElement.disabled = inputValue.length === 0
})
