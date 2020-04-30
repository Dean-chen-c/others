const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const canvasWidth = 1100
const canvasHeight = 1100
// 用于绘制网格
const cap = 50
const colNum = Math.ceil(canvasWidth / cap) - 1
const rowNum = Math.ceil(canvasHeight / cap) - 1

const initX = 50
const initY = 1050
const lineWidth = 2
let Grids = []
let cache = null
// 控制精度 ，越小精度越高
let t = 0
let index = 0
// 获取点
const pointInputs = document.getElementsByName('point[]')
// 第几个点
let pointIndex = 1
let points = getPoints()
// 处理输入点的数据
function getPoints() {
  return Array.from(pointInputs).map((p) => {
    p = p.value.split(',')
    console.log([parseInt(p[0]), parseInt(p[1])])
    console.log([parseInt(p[0]) + initX, initY - parseInt(p[1])])
    return [parseInt(p[0]) + initX, initY - parseInt(p[1])]
  })
}
let initPoint = points[0],
  x = 0,
  isEnded = false
const replay = document.getElementById('replay')
const pointsCollection = document.getElementById('pointsCollection')
const addPoint = document.getElementById('addPoint')
addPoint.addEventListener('click', (e) => {
  pointIndex++
  let span = document.createElement('span')
  span.innerHTML = 'point' + pointIndex + ':'
  let input = document.createElement('input')
  input.name = 'point[]'
  let br = document.createElement('br')
  pointsCollection.appendChild(span)
  pointsCollection.appendChild(input)
  pointsCollection.appendChild(br)
})
//
canvas.width = canvasWidth
canvas.height = canvasHeight
context.lineWidth = 5
context.fillStyle = '#ccc'
context.fillRect(0, 0, canvas.width, canvas.height)

//网格建立
function initGrid(cap, width, height, lineWidth) {
  const colNum = Math.ceil((width - 40) / cap) - 1
  const rowNum = Math.ceil((height - 40) / cap) - 1
  for (let i = 1; i <= colNum; i++) {
    Grids.push([
      [initX + cap * (i - 1) - lineWidth / 2, 0, lineWidth / 2, colNum * cap],
      [
        (i - 1) * cap,
        cap * i - lineWidth / 2,
        colNum * cap + 5,
        'top',
        'center',
      ],
    ])
  }
  for (let i = 1; i <= rowNum; i++) {
    Grids.push([
      [initX, cap * i - lineWidth / 2, rowNum * cap, lineWidth / 2],
      [
        (rowNum - i) * cap,
        initX - 5,
        cap * i - lineWidth / 2,
        'middle',
        'right',
      ],
    ])
  }
}
initGrid(cap, canvasWidth, canvasHeight, lineWidth)
function createGrid() {
  context.fillStyle = '#999'
  context.font = '24px Arial'
  Grids.forEach((grid) => {
    context.textAlign = grid[1][4]
    context.textBaseline = grid[1][3]
    context.fillRect(grid[0][0], grid[0][1], grid[0][2], grid[0][3])
    context.save()
    context.fillText(grid[1][0], grid[1][1], grid[1][2])
    context.restore()
  })
}

replay.addEventListener('click', () => {
  if (isEnded) {
    t = 0
    points = getPoints()
    initPoint = points[0]
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)
    drawCubicBezierCurzeHelper(points)
    createGrid()
    animation2()
  }
})
drawCubicBezierCurzeHelper(points)
createGrid()
animation2()
function drawPoints(ps) {
  let newPs = []
  ps.reduce((p, c) => {
    newPs.push(linearBezierCurze(...p, ...c)(t))
    return c
  })
  if (newPs.length === 1) {
    return newPs[0]
  } else {
    return drawPoints(newPs)
  }
}
function animation2() {
  if (t > 1.02) {
    isEnded = true
    return
  }
  console.log(index++)

  let initPoint2 = drawPoints(points)

  if (context.strokeStyle !== '#ff0000') {
    context.strokeStyle = 'red'
  } else if (context.strokeStyle !== '#0000ff') {
    context.strokeStyle = 'blue'
  }

  drawLine(...initPoint, ...initPoint2)
  initPoint = initPoint2
  cache = canvas.toDataURL('image/jpeg', 1)
  let img = new Image()
  img.src = cache
  img.onload = function () {
    context.drawImage(img, 0, 0, canvas.width, canvas.height)
    window.requestAnimationFrame(() => {
      t += 0.005
      animation2()
    })
  }
}

function drawLine(x0, y0, x1, y1) {
  // console.log(x0, y0, x1, y1);

  context.beginPath()
  context.moveTo(x0, y0)
  context.lineTo(x1, y1)
  context.stroke()
  context.closePath()
}
function linearBezierCurze(a, b, c, d) {
  //(a,b),(c,d)
  let s1 = c - a,
    s2 = d - b
  return function (t) {
    return [s1 * t + a, s2 * t + b]
  }
}
// 绘制控制点连线
function drawCubicBezierCurzeHelper(points) {
  context.save()
  points.reduce((p, c) => {
    context.strokeStyle = 'gray'
    drawLine(...p, ...c)
    return c
  })
  points.forEach((c) => {
    context.beginPath()
    context.fillStyle = 'red'
    context.arc(...c, 10, 0, 2 * Math.PI)
    context.fill()
  })
  context.restore()
}
