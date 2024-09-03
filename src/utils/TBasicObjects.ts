
import * as TR from "three";

export const basicObjectList: TR.Object3D[] = []
export const box: TR.Mesh = new TR.Mesh(
    new TR.BoxGeometry(50, 50, 50),
    new TR.MeshStandardMaterial({ color: 0xffddff, opacity: 0.5 })
)
box.position.x = -30

export const sphere: TR.Line = new TR.Line(
    new TR.SphereGeometry(30, 30, 30),
    // new TR.MeshStandardMaterial({ color: 0xffaabb, opacity: 0.5 })
)
sphere.position.x = 30

basicObjectList.push(box, sphere)