import * as TR from "three"


export const codeModelList: TR.Object3D[] = []

const s = 5
const points: Float32Array = new Float32Array([
    -s, s, s,//顶点0
    s, -s, s,//顶点1
    s, s, s,//顶点2
    -s, -s, s,//顶点3
    s, s, -s,
    -s, s, -s,
    -s, -s, -s,
    s, -s, -s
])

const indexArr = [
    0, 1, 2,//顶点0，顶点1,顶点2
    0, 3, 1,

    0, 2, 4,
    5, 0, 4,

    5, 4, 6,
    4, 7, 6,

    2, 7, 4,
    2, 1, 7,

    0, 6, 3,
    0, 5, 6,

    3, 6, 7,
    3, 7, 1


]

const geometry: TR.BufferGeometry = new TR.BufferGeometry()
geometry.setAttribute('position', new TR.BufferAttribute(new Float32Array(points), 3))
geometry.setAttribute('normal', new TR.BufferAttribute(new Float32Array(points), 3))//法线信息，保证光照正常。
geometry.setIndex(indexArr)


const material: TR.MeshStandardMaterial = new TR.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.8,
    roughness: 0.1
})
const codeBox: TR.Mesh = new TR.Mesh(geometry, material)

codeBox.castShadow = true
codeBox.position.x = 25
codeBox.position.y = 5

codeModelList.push(codeBox)