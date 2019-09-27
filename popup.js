async function inject() {
  const input = document.querySelector('input')
  if (!input.reportValidity()) return
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  })
  browser.tabs.sendMessage(tab.id, {
    type: 'action-inject',
    src: input.value,
  })
}
browser.tabs.executeScript({ file: 'content.js' }).then(() => {
  const button = document.querySelector('button')
  button.addEventListener('click', inject)
}).catch(err => {
  document.querySelector('.error').textContent = err
})
