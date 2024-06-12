import p5 from 'p5'
import { useP5 } from '../../utils/main'
import './main.css'
import { Target, Vechile } from './vechile'
const app = document.querySelector('#app')

useP5((p) => {
  const w = 500
  const h = 500
  const vechile = new Vechile(p, w / 2, h / 2)
  const target = new Target(p, w / 3, h / 3)
  p.setup = () => {
    p.createCanvas(w, h)
  }

  p.draw = () => {
    p.background(255)
    vechile.applyForce(vechile.pursue(target))
    vechile.update()
    vechile.edges()
    vechile.show()

    if (p5.Vector.dist(vechile.pos, target.pos) < vechile.r + target.r) {
      target.pos.set(p.random(w), p.random(h))
    }
    target.update()
    target.edges()
    target.show()
  }
})
