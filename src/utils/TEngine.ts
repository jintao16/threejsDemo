import {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    Mesh,
    BoxGeometry,
    MeshStandardMaterial,
    MeshBasicMaterial,
    AmbientLight,
    Vector3,
    AxesHelper,

} from "three"
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from 'three/examples/jsm/libs/stats.module.js'

export class TEngine {
    private dom: HTMLElement
    private renderer: WebGLRenderer
    private scene: Scene
    private camera: PerspectiveCamera
    private controls: OrbitControls
    private mesh: Mesh
    private stats: Stats

    constructor(dom: HTMLElement) {
        this.dom = dom
        this.renderer = new WebGLRenderer()
        console.log('TEngine实例了')


        this.scene = new Scene()
        this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000)
        this.camera.position.set(100, 100, 100)
        this.camera.lookAt(new Vector3(0, 0, 0))
        this.camera.up = new Vector3(0, 1, 0)

        dom.appendChild(this.renderer.domElement)
        this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)
        this.renderer.setClearColor(0xb9d3ff, 1)

        const mesh: Mesh = new Mesh(
            new BoxGeometry(50, 50, 50),
            new MeshStandardMaterial({ color: 0xffddff, opacity: 0.5 })
        )
        this.mesh = mesh
        this.scene.add(mesh)

        const ambient = new AmbientLight(0x444444, 10)
        this.scene.add(ambient)

        const axesHelper = new AxesHelper(100)
        axesHelper.position.set(0, 0, 0)
        axesHelper.material.depthTest = false
        this.scene.add(axesHelper)

        const gridHelper = new THREE.GridHelper(200, 30, new THREE.Color(0x888888), new THREE.Color(0x444444))
        this.scene.add(gridHelper)


        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        const stats = Stats()
        const statsDom = stats.domElement
        statsDom.style.position = 'fixed'
        statsDom.style.left = '10px'
        statsDom.style.top = '60px'
        this.stats = stats
        dom.appendChild(statsDom)

        this.animation()
    }
    animation() {
        this.renderer.render(this.scene, this.camera)
        this.controls && this.controls.update()
        this.mesh.position.x += 0.1
        // this.mesh.position.z += 0.1
        this.camera.position.x += 0.1
        this.stats.update()
        requestAnimationFrame(this.animation.bind(this))
    }
}