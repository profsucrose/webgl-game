function initScene() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
}

function renderBox(x, y, z, width, length, height, color) {
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color })
    const cube = new THREE.Mesh(geometry, material)

    cube.scale.x = width
    cube.scale.y = height
    cube.scale.z = length

    cube.position.x = x
    cube.position.y = y
    cube.position.z = z
    scene.add(cube)
    return cube
}