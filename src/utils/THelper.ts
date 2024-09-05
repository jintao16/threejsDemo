import * as TR from "three";
import { pointLight, spotLight } from './TLights'

export const helperList: TR.Object3D[] = []


const axesHelper = new TR.AxesHelper(100)
axesHelper.position.set(0, 0, 0)
axesHelper.material.depthTest = false

const gridHelper = new TR.GridHelper(200, 30, new TR.Color(0x888888), new TR.Color(0x444444))

const pointLightHelper: TR.PointLightHelper = new TR.PointLightHelper(pointLight, pointLight.distance, pointLight.color) //点光源辅助

const spotLightHelper: TR.SpotLightHelper = new TR.SpotLightHelper(spotLight)

helperList.push(axesHelper, gridHelper,spotLightHelper)