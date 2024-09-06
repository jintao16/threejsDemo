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
    Object3D

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
    private stats: Stats

    constructor(dom: HTMLElement) {
        this.dom = dom
        this.renderer = new WebGLRenderer({ antialias: true })
        console.log('TEngine实例了')


        this.scene = new Scene()
        this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000)
        this.camera.position.set(100, 100, 100)
        this.camera.lookAt(new Vector3(0, 0, 0))
        this.camera.up = new Vector3(0, 1, 0)

        dom.appendChild(this.renderer.domElement)
        this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)
        this.renderer.setClearColor(0xb9d3ff, 1)
        this.renderer.shadowMap.enabled = true






        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true
        // 禁止右键平移，按住ctrl+鼠标左键仍可平移
        this.controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: null
        }


        const stats = Stats()
        const statsDom = stats.domElement
        statsDom.style.position = 'fixed'
        statsDom.style.left = '10px'
        statsDom.style.top = '60px'
        this.stats = stats
        dom.appendChild(statsDom)

        this.animation()
    }
    addObject(...object: Object3D[]) {
        object.forEach(obj => {
            this.scene.add(obj)
        })

    }
    animation() {

        // this.controls.autoRotate = true
        this.controls && this.controls.update()

        this.stats.update()
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(this.animation.bind(this))
    }
}