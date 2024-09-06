import * as TR from 'three'
import { box } from './TBasicObjects'

export const lightsList: TR.Object3D[] = []
const ambient = new TR.AmbientLight('rgb(200,255,255)', 0.1)

export const pointLight = new TR.PointLight(0xffffff, 300, 100, 1.5)
pointLight.position.set(0, 50, 30)
pointLight.castShadow = true

export const spotLight = new TR.SpotLight(0xffffff, 50, 100)
spotLight.decay = 0.1
spotLight.angle = 60
spotLight.penumbra = 0.1
spotLight.target = box

spotLight.position.set(50, 80, 0)
spotLight.castShadow = true


lightsList.push(ambient, spotLight)
