import p5 from 'p5'

/**
 * @type {(fn: (p:import('p5')) => void, parentEl: HTMLElement) => void}
 */
export const useP5 = (fn, parentEl = document.body, title) => {
  const wrap = document.createElement('div')
  wrap.addEventListener('contextmenu', (e) => {
    e.preventDefault()
  })
  if (title) {
    const el = document.createElement('p')
    el.innerText = title
    wrap.appendChild(el)
    const ctn = document.createElement('div')
    ctn.style = 'position:relative;'
    wrap.appendChild(ctn)
    parentEl.appendChild(wrap)
    new p5(fn, ctn)
  } else {
    wrap.style = 'position:relative;'
    parentEl.appendChild(wrap)
    new p5(fn, wrap)
  }
}
