<script setup>
import * as Cesium from 'cesium'
import { ref, onMounted } from 'vue'
import earthImg from '@/assets/earth2.jpg'
import icon from '@/assets/wind.png'

import { GlobeRotate } from '@/utils/globeRotate.js'
import apngjs from '@/utils/apngjs.js'

// 设置cesium token
Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMzNkNTE5Zi1mMjY4LTRiN2QtOTRlZC1lOTUyM2NhNDYzNWYiLCJpZCI6NTU0OTYsImlhdCI6MTYyNTAyNjMyOX0.a2PEM4hQGpeuMfeB9-rPp6_Gkm6O-02Dm4apNbv_Dlk'
// const viewer = ref()
// const handlerCLick = () => {
//   let handler = new Cesium.ScreenSpaceEventHandler(viewer.value.scene.canvas)
//   handler.setInputAction(function (event: any) {
//     let cartesian = viewer.value.camera.pickEllipsoid(event.position)
//     let cartographic = Cesium.Cartographic.fromCartesian(cartesian)
//     let lng = Cesium.Math.toDegrees(cartographic.longitude) // 经度
//     let lat = Cesium.Math.toDegrees(cartographic.latitude) // 纬度
//     let alt = cartographic.height // 高度，椭球面height永远等于0
//     let coordinate = {
//       longitude: Number(lng.toFixed(6)),
//       latitude: Number(lat.toFixed(6)),
//       altitude: Number(alt.toFixed(2))
//     }
//     console.log(coordinate, 3333)

//     console.log(viewer.value.scene.camera.heading)
//     console.log(viewer.value.scene.camera.pitch)
//     console.log(viewer.value.scene.camera.roll)
//     console.log(viewer.value.scene.camera.position)
//   }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
// }
let viewer = null
onMounted(() => {
  // viewer.value = new Cesium.Viewer('cesiumContainer', {
  viewer = new Cesium.Viewer('cesiumContainer', {
    // animation: false, // 动画球
    // timeline: false, // 时间线
    // infoBox: false, // 报错 Blocked script execution in ‘about:blank‘
    // baseLayerPicker: false, // baselayer小组件
    // terrain: Cesium.Terrain.fromWorldTerrain({
    //   // 地形设置
    //   // requestWaterMask: true,
    //   // requestVertexNormals: true
    // }) // 地形数据
    animation: false, //是否创建动画小器件，左下角仪表
    baseLayerPicker: false, //是否显示图层选择器
    fullscreenButton: false, //是否显示全屏按钮
    geocoder: false, //是否显示geocoder小器件，右上角查询按钮
    homeButton: false, //是否显示Home按钮
    infoBox: false, //是否显示信息框
    sceneModePicker: false, //是否显示3D/2D选择器
    selectionIndicator: false, //是否显示选取指示器组件
    timeline: false, //是否显示时间轴
    sceneMode: Cesium.SceneMode.SCENE3D, //设定3维地图的默认场景模式:Cesium.SceneMode.SCENE2D、Cesium.SceneMode.SCENE3D、Cesium.SceneMode.MORPHING
    navigationHelpButton: false, //是否显示右上角的帮助按钮
    scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    navigationInstructionsInitiallyVisible: false, // 导航说明最初可见
    showRenderLoopErrors: false, //是否显示渲染错误
    orderIndependentTranslucency: false, // 半透明,可透过地球看星星
    imageryProvider: new Cesium.SingleTileImageryProvider({
      url: earthImg
    })
  })

  // Globe 对象
  let globe = viewer.scene.globe
  // 一定要为 true，否则 undergroundColor 设置无效
  globe.translucency.enabled = true
  // 基础色透明，默认是蓝色 Cesium.Color.BLUE
  globe.baseColor = Cesium.Color.BLACK
  // 地下色透明，默认是黑色 Cesium.Color.BLACK
  globe.undergroundColor = Cesium.Color.TRANSPARENT
  globe.atmosphereLightIntensity = 0
  // 隐藏天空大气层，否则最外围有一圈
  viewer.scene.skyAtmosphere.show = false

  // 给坐标添加点
  const entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883, 300000.0),
    point: {
      pixelSize: 2
    }
  })
  const point = entity.point
  point.pixelSize = 20.0
  point.color = Cesium.Color.YELLOW.withAlpha(0.33)

  // 给坐标添加图片
  loadApng()

  // 地球球体自转
  let globeRotate = new GlobeRotate(viewer)
  globeRotate.start()

  // handlerCLick()
  // viewer.value.scene.camera.setView({
  // viewer.scene.camera.setView({
  //   destination: Cesium.Cartesian3.fromDegrees(11.426141, 11.288993, 1800), // 经度, 纬度，高度，具体可以找个地图经纬度，自己写
  //   orientation: {
  //     // 相机镜头设置
  //     heading: 0.046, // 左右方向,正值为右,负值为左
  //     pitch: -0.163 // 上下方向,正值为上,负值为下
  //   }
  // })
})

async function loadApng() {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  let blob = await loaderURL(icon)
  let arrayBuffer = await blobToArrayBuffer(blob)
  console.log(apngjs, 'apngjsapngjsapngjs')
  let apng = apngjs.parseAPNG(arrayBuffer)
  console.log(apng, 'apng')
  let player = await apng.getPlayer(ctx)
  player.play()
  let point = [-65.59777, 33.03883]
  let entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(point[0], point[1]),
    billboard: {
      scale: 2
    }
  })

  entity.billboard.image = new Cesium.CallbackProperty(() => {
    return player.currentFrame.imageElement
  }, false)
}

/**
 * 加载图片资源，得到blob类型的值
 * @param {String} url
 * @returns
 */
async function loaderURL(url) {
  function createXmlHttpRequest() {
    if (window.ActiveXObject) {
      return new ActiveXObject('Microsoft.XMLHTTP')
    } else if (window.XMLHttpRequest) {
      return new XMLHttpRequest()
    }
  }
  return new Promise((resolve) => {
    let xhr = createXmlHttpRequest()
    xhr.open('get', url, true)
    xhr.responseType = 'blob'
    xhr.onload = function (res) {
      if (this.status == 200) {
        var blob = this.response
        resolve(blob)
      }
    }
    xhr.send()
  })
}

/**
 * 将blob转换成buffer
 * @param {Blob} blob
 * @returns
 */
async function blobToArrayBuffer(blob) {
  return new Promise((resolve) => {
    // Blob 转 ArrayBuffer
    let reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    reader.onload = function () {
      resolve(reader.result)
    }
  })
}
</script>

<template>
  <div id="cesiumContainer" ref="cesiumContainer"></div>
</template>
<style>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
