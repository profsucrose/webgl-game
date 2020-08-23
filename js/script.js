// globals
let scene, camera, renderer
const colors = {
    green:  0x00ff00,
    blue:   0x0000ff,
    red:    0xff0000,
    yellow: 0xffff00
}
const keysPressed = {
    'a': false,
    'd': false,
    'w': false,
    's': false,
    ' ': false,
    'Shift': false
}

const speed = 0.1
const sensitivity = 0.003
let rotation = 0
let fallingCubes = []
let paused = false
let score = 0

// init scene
initScene()
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
})

// input
document.addEventListener('keydown', event => {
    const { key } = event
    console.log(key)
    switch (key) {
        case 'ArrowRight':
            camera.rotation.y -= 90 * Math.PI / 180
            rotation += 1
            rotation %= 4
            break
        case 'ArrowLeft':
            camera.rotation.y += 90 * Math.PI / 180
            rotation += 1
            rotation %= 4
            break
    }
    keysPressed[key] = true
})

document.addEventListener('keyup', event => {
    const { key } = event
    keysPressed[key] = false
})

camera.position.z = 10
camera.position.x = 4.5

// initial static rendering
for (let x = 0; x < 10; x++) {
    for (let z = 0; z < 10; z++) {
        renderBox(x, -0.5, z, 1, 1, 0, (x + z) % 2 == 0 ? colors.green : colors.blue)
    }
}

renderBox(-1, 0, 4.5, 1, 10, 1, colors.yellow)
renderBox(10, 0, 4.5, 1, 10, 1, colors.yellow)

function addCube() {
    if (paused)
        return
    fallingCubes.push(
        renderBox(
            Math.floor(Math.random() * 10), 
            0, 
            0, 
            1, 
            1, 
            1, 
            colors.red
        )
    )
}

function updateScoreDisplay() {
    document.querySelector('.score').innerText = `Score: ${score}`
}

function incrementScore() {
    if (paused)
        return
    score += 1
    updateScoreDisplay()
}
setInterval(addCube, 1000)
setInterval(addCube, 1500)
setInterval(incrementScore, 100)

function restart() {
    paused = false;
    fallingCubes.forEach(cube => {
        scene.remove(cube)
    })
    fallingCubes = []
    document.querySelector('main').style.display = 'none'
    camera.position.z = 9
    camera.position.x = 4.5
    score = 0
    updateScoreDisplay()
}

// animate loop
function animate() {
    requestAnimationFrame(animate)
    if (paused) {
        renderer.render(scene, camera)
        return
    }
    if (keysPressed.a 
            && camera.position.x > 0)      
        camera.position.x -= speed
    if (keysPressed.d
            && camera.position.x < 9)      
        camera.position.x += speed
    if (keysPressed.w
            && camera.position.z > 0)      
        camera.position.z -= speed
    if (keysPressed.s
            && camera.position.z < 10)      
        camera.position.z += speed

    for (let i = fallingCubes.length - 1; i >= 0; i--) {
        const cube = fallingCubes[i]
        cube.position.z += 0.1
        if (Math.abs(camera.position.z - cube.position.z) < 1
                && Math.abs(camera.position.x - cube.position.x) < 1) {
            console.log('hit')
            document.querySelector('main').style.display = 'flex'
            paused = true
        }
    }
    
    renderer.render(scene, camera)
}
animate()