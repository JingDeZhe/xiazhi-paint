import p5 from 'p5'

export class Vechile {
  /**
   * @param {import('p5')} p
   */
  constructor(p, x, y) {
    this.p = p
    // 假设质量为1，因此force和a实际上等同
    this.pos = p.createVector(x, y)
    this.r = 10
    this.v = p.createVector(0, 0)
    this.a = p.createVector(0, 0)

    this.maxTurnForce = 2
    this.maxSeekForce = 2
    this.maxSpeed = 2
  }

  evade(vechile) {
    return this.pursue(vechile).mult(-1)
  }
  pursue(vechile) {
    const vechilePos = vechile.pos.copy()
    const vechileForeV = vechile.v.copy().mult(10) // 稍微预测远一点
    const targetPos = vechilePos.add(vechileForeV)
    return this.seek(targetPos)
  }
  flee(target) {
    return this.seek(target).mult(-1)
  }
  seek(target) {
    const seekForce = p5.Vector.sub(target, this.pos).setMag(this.maxSeekForce)
    const turnForce = p5.Vector.sub(seekForce, this.v).limit(this.maxTurnForce)
    return turnForce
  }
  applyForce(f) {
    this.a.add(f)
  }
  update() {
    this.v.add(this.a).limit(this.maxSpeedq)
    this.pos.add(this.v)
    this.a.mult(0)
  }
  show() {
    const p = this.p
    const heading = this.v.heading()
    p.push()
    p.translate(this.pos.x, this.pos.y)
    p.rotate(heading)
    p.stroke(30)
    p.strokeWeight(2)
    p.fill(120)
    p.beginShape()
    p.vertex(this.r, 0)
    p.vertex(-this.r, this.r / 2)
    p.vertex(-this.r, -this.r / 2)
    p.endShape(p.CLOSE)
    p.pop()
  }
  edges() {
    const { width, height } = this.p
    if (this.pos.x < -this.r) {
      this.pos.x = width
    } else if (this.pos.x > width + this.r) {
      this.pos.x = 0
    }

    if (this.pos.y < -this.r) {
      this.pos.y = height
    } else if (this.pos.y > height + this.r) {
      this.pos.y = 0
    }
  }
}

export class Target extends Vechile {
  constructor(p, x, y) {
    super(p, x, y)
    this.v = p5.Vector.random2D().mult(6)
  }

  show() {
    const p = this.p
    const heading = this.v.heading()
    p.push()
    p.translate(this.pos.x, this.pos.y)
    p.rotate(heading)
    p.stroke(100)
    p.strokeWeight(1)
    p.line(0, 0, this.v.mag() * 10, 0)
    p.stroke(30)
    p.strokeWeight(2)
    p.fill('#AE6376')
    p.circle(0, 0, this.r * 2)
    p.pop()
  }
}
