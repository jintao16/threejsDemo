import * as TR from 'three'

export const lightsList: TR.Object3D[] = []
const ambient = new TR.AmbientLight('rgb(200,255,255)', 0.1)

export const pointLight = new TR.PointLight(0xffffff, 300, 100, 1.5)
pointLight.position.set(0, 50, 30)

lightsList.push(ambient, pointLight)
