let scene, camera, renderer


console.log('Shaders', document.querySelector('#vertexShader').textContent, document.querySelector('#fragmentShader').textContent)

function initWebGL() {
    // scene
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

    // renderer
    renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0x0000ff)
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )
}

function renderCube(x = 0, y = 0, z = 0, color = 0xffffff) {
    // cube
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshPhongMaterial()
    const cube = new THREE.Mesh( geometry, material )

    cube.position.x = x
    cube.position.y = y
    cube.position.z = z

    scene.add( cube )
}