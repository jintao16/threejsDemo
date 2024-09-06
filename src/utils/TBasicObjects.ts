
import * as TR from "three";

export const basicObjectList: TR.Object3D[] = []
export const box: TR.Mesh = new TR.Mesh(
    new TR.BoxGeometry(10, 10, 10),
    new TR.MeshStandardMaterial({ color: 0xffddff, opacity: 0.5, metalness: 0.8, roughness: 0.1 })
)
box.position.x = 10
box.position.y = 5
box.castShadow = true
box.receiveShadow = true

const stage: TR.Mesh = new TR.Mesh(
    new TR.PlaneGeometry(300, 300),
    // new TR.BoxGeometry(300, 10, 300),
    new TR.MeshStandardMaterial({ color: 0xffffff, opacity: 0.5, roughness: 0 })
)
stage.rotation.x = -Math.PI / 2
stage.receiveShadow = true
stage.castShadow = true
// stage.position.y = -5

console.log((stage.material as TR.MeshStandardMaterial).color)

basicObjectList.push(box, stage)