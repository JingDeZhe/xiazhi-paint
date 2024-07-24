import { CanvasSpace, Pt } from 'pts'
import './main.css'
const app = document.querySelector('#app')
const canvas = document.createElement('canvas')
app.appendChild(canvas)
canvas.width = 600
canvas.height = 600

const space = new CanvasSpace(canvas).setup({ bgcolor: '#fff' })
const form = space.getForm()

space.add((time, ftime) => {
  const p = space.pointer
  form.strokeOnly('#123', 5).line([new Pt(p.x, 0), p, new Pt(0, p.y)])
  form.stroke('#42e').line([new Pt(0, 0), p])
  form.stroke('#fff', 5).fill('#42e').point(p, 10, 'circle')
  form.fill('#123').font(14, 'bold').text(p.$add(20, 5), p.toString())
})

space.play().bindMouse()
