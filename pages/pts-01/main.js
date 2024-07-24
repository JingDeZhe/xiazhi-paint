import './main.css'
import { CanvasSpace, Pt, Group, Num, Rectangle, Triangle } from 'pts'

const app = document.querySelector('#app')
const canvas = document.createElement('canvas')
canvas.width = 700
canvas.height = 700
app.appendChild(canvas)

const space = new CanvasSpace(canvas)
space.setup({
  bgcolor: '#ddd',
})
const form = space.getForm()

space.add((time, ftime) => {
  const rect = Rectangle.fromCenter(space.center, space.size.$divide(2))
  const poly = Rectangle.corners(rect)
  poly.shear2D(Num.cycle((time % 5000) / 5000) - 0.5, space.center)

  const tris = poly.segments(2, 1, true)
  tris.map((t) => t.push(space.pointer))

  const circles = tris.map((t) => Triangle.incircle(t))

  form.fillOnly('#123').polygon(poly)
  form.fill('#f03').circles(circles)
  form.strokeOnly('#fff ', 3).polygons(tris)
  form.fill('#123').point(space.pointer, 5)
})

space.play().bindMouse()
