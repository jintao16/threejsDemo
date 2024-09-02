import {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    Mesh,
    BoxGeometry,
    MeshStandardMaterial,
    MeshBasicMaterial,
    AmbientLight,
    Vector3
} from "three"

export class TEngine {
    private dom: HTMLElement
    private renderer: WebGLRenderer
    private scene: Scene
    private camera: PerspectiveCamera

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


        const mesh: Mesh = new Mesh(
            new BoxGeometry(50, 50, 50),
            new MeshStandardMaterial({ color: 0xffddff, opacity: 0.5 })
        )
        this.scene.add(mesh)

        const ambient = new AmbientLight(0x444444,10)
        this.scene.add(ambient)

        this.renderer.render(this.scene, this.camera)


    }
}