/**
 * 随机
 */

import { Engine, Vector, Bodies, Constraint, MouseConstraint, Mouse } from 'matter-js'
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
      this.type = p.random([1, 2, 3])
      this.w = this.type === 2 ? 32 : 16
      this.h = 10
      this.r = 10

      if (this.type === 1) {
        this.body = Bodies.fromVertices(this.x, this.y, [
          Vector.create(-10, -10),
          Vector.create(20, -15),
          Vector.create(15, 0),
          Vector.create(0, 10),
          Vector.create(-20, 15),
        ])
      } else if (this.type === 2) {
        this.part1 = Bodies.rectangle(this.x, this.y, this.w, this.h)
        this.part2 = Bodies.circle(this.x + this.w / 2, this.y, this.r)
        this.body = Body.create({ parts: [this.part1, this.part2] })
      } else {
        this.body = Bodies.rectangle(this.x, this.y, this.w, this.w)
      }

      Body.setAngularSpeed(this.body, 0.1)
      Body.setVelocity(this.body, Vector.create(p.random(-2, 2), 0))
      Composite.add(engine.world, this.body)
    }

    show() {
      p.rectMode(p.CENTER)
      p.stroke(0)
      p.strokeWeight(2)
      p.fill(127)

      if (this.type === 2) {
        const { angle } = this.body // cautious
        const { position: p1 } = this.part1
        p.push()
        p.translate(p1.x, p1.y)
        p.rotate(angle)
        p.rectMode(p.CENTER)
        p.rect(0, 0, this.w, this.h)
        p.pop()

        const { position: p2 } = this.part2
        p.push()
        p.translate(p2.x, p2.y)
        p.rotate(angle)
        p.fill('#D14B49')
        p.circle(0, 0, this.r * 2)
        p.pop()
      } else {
        p.beginShape()
        for (let d of this.body.vertices) {
          p.vertex(d.x, d.y)
        }
        p.endShape(p.CLOSE)
      }
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

  class Pendulm {
    constructor(x, y, len) {
      this.len = len
      this.r = 10
      this.anchor = Bodies.circle(x, y, this.r, { isStatic: true })
      this.bob = Bodies.circle(x + len, y, this.r)
      this.arm = Constraint.create({
        bodyA: this.anchor,
        bodyB: this.bob,
        length: this.len,
        stiffness: 0.7,
      })

      Composite.add(engine.world, this.anchor)
      Composite.add(engine.world, this.bob)
      Composite.add(engine.world, this.arm)
    }

    show() {
      const { position: pa, angle: aa } = this.anchor
      const { position: pb, angle: ab } = this.bob

      p.line(pa.x, pa.y, pb.x, pb.y)

      p.push()
      p.translate(pa.x, pa.y)
      p.rotate(aa)
      p.circle(0, 0, this.r * 2)
      p.line(0, 0, this.r, 0)
      p.pop()

      p.push()
      p.translate(pb.x, pb.y)
      p.rotate(ab)
      p.circle(0, 0, this.r * 2)
      p.line(0, 0, this.r, 0)
      p.pop()
    }
  }

  p.setup = () => {
    const canvas = p.createCanvas(w, h)
    p.pixelDensity(1)
    const mouse = Mouse.create(canvas.elt)
    const mouseConstraint = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.7 } })
    Composite.add(engine.world, mouseConstraint)
  }

  const boxes = []
  const boundaries = [new Boundary(w / 3, h - 50, w / 2, 10), new Boundary((w / 3) * 2, h - 100, w / 3, 10)]
  const pendulm = new Pendulm(w / 2, 10, 100)
  p.draw = () => {
    Engine.update(engine)
    p.background(255)
    if (p.mouseIsPressed && p.mouseButton === p.RIGHT) {
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

    pendulm.show()
  }
}, app)
