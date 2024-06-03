/**
 * 随机
 */

import { useP5 } from '../../utils/main'
import './main.css'
const app = document.querySelector('#app')

useP5((p) => {
  const s = 500
  const offset = p.createSlider(0, 0.05, 0.01, 0.01)
  offset.position(10, 10)
  offset.size(100)
  const text = p.createSpan('0.01')
  text.position(120, 10)
  text.style('color', '#121212')

  offset.changed(() => {
    text.html(offset.value())
  })

  class Walker {
    constructor() {
      this.pos = p.createVector(s / 2, s / 2)
      this.r = 1

      this.tx = 0
      this.ty = 100000
    }

    step() {
      this.pos.x = p.map(p.noise(this.tx), 0, 1, 0, s)
      this.pos.y = p.map(p.noise(this.ty), 0, 1, 0, s)
      this.tx += offset.value()
      this.ty += offset.value()
    }

    display() {
      p.noStroke()
      p.fill(100)
      p.circle(this.pos.x, this.pos.y, this.r * 2)
    }
  }
  const walker = new Walker()
  p.setup = () => {
    p.createCanvas(s, s)
    p.background(250)
  }

  p.draw = () => {
    walker.step()
    walker.display()
  }
}, app)
