import './main.css'
const app = document.querySelector('#app')
const icons = import.meta.glob('./icons/*.svg', { query: '?raw' })

const ctn = document.createElement('div')
ctn.className = 'icons'
const title = document.createElement('div')
title.className = 'title'
const tools = document.createElement('div')
tools.className = 'tools'

const iconBoxes = []
const iconNames = []
const changeIcon = (offset = 1) => {
  const activeIndex = iconBoxes.findIndex((d) => d.classList.contains('active'))
  if (activeIndex + offset >= iconBoxes.length || activeIndex + offset < 0) return
  iconBoxes[activeIndex].classList.remove('active')
  iconBoxes[activeIndex + offset].classList.add('active')
  title.textContent = iconNames[activeIndex + offset]
}

const previous = document.createElement('span')
const next = document.createElement('span')
previous.textContent = 'Previous'
next.textContent = 'Next'
previous.addEventListener('click', () => changeIcon(-1))
next.addEventListener('click', () => changeIcon(1))

tools.appendChild(previous)
tools.appendChild(next)

let index = 0
for (const p in icons) {
  icons[p]().then((d) => {
    let name = p.match(/[^/]+(?=\.[^/.]+$)/)[0]
    name = name.replace(/\-/g, ' ').toUpperCase()
    const parser = new DOMParser()
    const doc = parser.parseFromString(d.default, 'image/svg+xml')
    const icon = document.createElement('div')
    if (index === 0) {
      title.textContent = name
      icon.className = 'icon-box active'
    } else {
      icon.className = 'icon-box'
    }
    iconBoxes.push(icon)
    iconNames.push(name)
    icon.dataset.index = index++
    icon.appendChild(doc.documentElement)
    ctn.appendChild(icon)
  })
}
app.appendChild(title)
app.appendChild(ctn)
app.appendChild(tools)
