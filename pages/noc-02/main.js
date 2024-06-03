/**
 * 随机
 */

import { Engine, Vector, Bodies } from 'matter-js'
import { useP5 } from '../../utils/main'
import './main.css'
import { Render } from 'matter-js'
import { Composite } from 'matter-js'
import { Body } from 'matter-js'
import { Runner } from 'matter-js'
const app = document.querySelector('#app')

useP5((p) => {
  const w = 640
  const h = 360
  let engine = Engine.create()

  class Box {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.w = 16

      this.body = Bodies.rectangle(x, y, this.w, this.w)
      Composite.add(engine.world, this.body)
    }

    show() {
      const { position, angle } = this.body
      p.rectMode(p.CENTER)
      p.stroke(0)
      p.strokeWeight(2)
      p.fill(127)

      p.push()
      p.translate(position.x, position.y)
      p.rotate(angle)
      p.square(0, 0, this.w)
      p.pop()
    }

    checkDisappear() {
      const { x, y } = this.body.position
      return x < 0 || x > w || y < 0 || y > h
    }

    removeBody() {
      Composite.remove(engine.world, this.body)
    }
  }

  class Boundary {
    constructor(x, y, w, h) {
      this.x = x
      this.y = y
      this.w = w
      this.h = h

      this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, {
        isStatic: true,
      })
      Composite.add(engine.world, this.body)
    }

    show() {
      p.rectMode(p.CENTER)
      p.stroke(0)
      p.strokeWeight(2)
      p.fill(127)
      p.rect(this.x, this.y, this.w, this.h)
    }
  }

  p.setup = () => {
    p.createCanvas(w, h)
  }

  const boxes = []
  const boundaries = [new Boundary(w / 3, h - 50, w / 2, 10), new Boundary((w / 3) * 2, h - 100, w / 3, 10)]
  p.draw = () => {
    Engine.update(engine)
    p.background(255)
    if (p.mouseIsPressed) {
      boxes.push(new Box(p.mouseX, p.mouseY))
    }

    for (let i = boxes.length - 1; i >= 0; i--) {
      if (boxes[i].checkDisappear()) {
        boxes.splice(i, 1)
      } else {
        boxes[i].show()
      }
    }

    for (let boundary of boundaries) {
      boundary.show()
    }
  }
}, app)
