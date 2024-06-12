import p5 from 'p5'
import { useP5 } from '../../utils/main'
import './main.css'
const app = document.querySelector('#app')

useP5((p) => {
  const w = 500
  const h = 300

  class Vehicle {
    constructor(x, y) {
      this.pos = p.createVector(x, y)
      this.r = 6
      this.mass = 1

      this.a = p.createVector(0, 0)
      this.v = p.createVector(0, 0)
      this.maxV = 5
      this.maxForce = 0.2
    }

    update() {
      this.v.add(this.a)
      this.pos.add(this.v)
      this.a.mult(0)
    }

    seek(target) {
      const f1 = p5.Vector.sub(target.pos, this.pos).setMag(this.maxV)
      const f2 = p5.Vector.sub(f1, this.v).limit(this.maxForce)
      this.applyForce(f2)
    }

    applyForce(f) {
      this.a.add(f.div(this.mass))
    }

    show() {
      this.update()
      const angle = this.v.heading()
      p.push()
      p.stroke(30)
      p.strokeWeight(2)
      p.fill(120)
      p.translate(this.pos.x, this.pos.y)
      p.rotate(angle)
      p.beginShape()
      p.vertex(this.r * 2, 0)
      p.vertex(-this.r * 2, this.r)
      p.vertex(-this.r * 2, -this.r)
      p.endShape('close')
      p.pop()
    }
  }

  class Target {
    constructor() {
      this.d = 10
      this.pos = p.createVector(0, 0)
    }

    show() {
      this.pos = p.createVector(p.mouseX, p.mouseY)
      p.push()
      p.fill('#C46C76')
      p.noStroke()
      p.circle(this.pos.x, this.pos.y, this.d)
      p.pop()
    }
  }

  const vehicle = new Vehicle(w / 2, h / 2)
  const target = new Target()
  p.setup = () => {
    p.createCanvas(w, h)
  }

  p.draw = () => {
    p.background(255)
    target.show()
    vehicle.seek(target)
    vehicle.show()
  }
})
