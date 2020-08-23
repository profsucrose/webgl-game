const keysPressed = {
    'a': false,
    'd': false,
    'w': false,
    's': false,
    ' ': false,
    'Shift': false
}

const speed = 1

// init program
initWebGL()
noise.seed(Math.random())

// input
document.addEventListener("keydown", event => {
    const { key } = event
    console.log(key)
    keysPressed[key] = true
})


document.addEventListener("keyup", event => {
    const { key } = event
    keysPressed[key] = false
})

const colors = {
    green: 0x00ff00
}


for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
        const value = Math.floor(noise.simplex2(x / 100, y / 100) * 10)
        
        renderCube(x, value, y, colors.green)
    }
}




camera.position.z = 5
camera.position.y = 10

const ambientLight = new THREE.AmbientLight( 0xffffff, 5.0 )
scene.add(ambientLight)

// draw loop
function animate() {
    requestAnimationFrame( animate )
    
    if (keysPressed.a) camera.position.x -= speed
    if (keysPressed.d) camera.position.x += speed
    if (keysPressed.w) camera.position.z -= speed
    if (keysPressed.s) camera.position.z += speed
    if (keysPressed[' ']) camera.position.y += speed
    if (keysPressed.Shift) camera.position.y -= speed
	renderer.render( scene, camera )
}
animate()