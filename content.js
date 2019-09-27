if (!window._hasRun) {
  window._hasRun = true
  browser.runtime.onMessage.addListener(({ type, ...detail }) => {
    dispatchEvent(new CustomEvent(type, { detail }))
  })
  addEventListener('action-inject', e => {
    const _img = new Image()
    _img.src = e.detail.src
    _img.onload = onLoad
    _img.onerror = console.error
  })
  let img, pos = { x: 0, y: 0 }
  function onLoad({ target }) {
    if (img) img.remove()
    img = document.body.appendChild(target)
    img.style = `position:absolute;top:${pos.x}px;left:${pos.y}px;z-index:200;pointer-events:none`
  }
  addEventListener('mousemove', e => {
    if (!img || !e.shiftKey) return
    const [dx, dy] = [e.movementX, e.movementY]
    pos.x += dx * (!e.ctrlKey || Math.abs(dx) > Math.abs(dy))
    pos.y += dy * (!e.ctrlKey || Math.abs(dy) > Math.abs(dx))
    img.style.left = `${pos.x}px`
    img.style.top = `${pos.y}px`
  })
}
