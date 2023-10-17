<script setup lang="ts">
import * as Cesium from 'cesium'
import { ref, onMounted } from 'vue'

// 设置cesium token
Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMzNkNTE5Zi1mMjY4LTRiN2QtOTRlZC1lOTUyM2NhNDYzNWYiLCJpZCI6NTU0OTYsImlhdCI6MTYyNTAyNjMyOX0.a2PEM4hQGpeuMfeB9-rPp6_Gkm6O-02Dm4apNbv_Dlk'
const viewer = ref()
const handlerCLick = () => {
  let handler = new Cesium.ScreenSpaceEventHandler(viewer.value.scene.canvas)
  handler.setInputAction(function (event: any) {
    let cartesian = viewer.value.camera.pickEllipsoid(event.position)
    let cartographic = Cesium.Cartographic.fromCartesian(cartesian)
    let lng = Cesium.Math.toDegrees(cartographic.longitude) // 经度
    let lat = Cesium.Math.toDegrees(cartographic.latitude) // 纬度
    let alt = cartographic.height // 高度，椭球面height永远等于0
    let coordinate = {
      longitude: Number(lng.toFixed(6)),
      latitude: Number(lat.toFixed(6)),
      altitude: Number(alt.toFixed(2))
    }
    console.log(coordinate, 3333)

    console.log(viewer.value.scene.camera.heading)
    console.log(viewer.value.scene.camera.pitch)
    console.log(viewer.value.scene.camera.roll)
    console.log(viewer.value.scene.camera.position)
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

onMounted(() => {
  viewer.value = new Cesium.Viewer('cesiumContainer', {
    animation: false, // 动画球
    timeline: false, // 时间线
    infoBox: false, // 报错 Blocked script execution in ‘about:blank‘
    baseLayerPicker: false, // baselayer小组件
    terrain: Cesium.Terrain.fromWorldTerrain({
      // 地形设置
      // requestWaterMask: true,
      // requestVertexNormals: true
    }) // 地形数据
    // terrainProvider: Cesium.createWorldTerrain()
  })

  handlerCLick()
  viewer.value.scene.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(11.426141, 11.288993, 1800), // 经度, 纬度，高度，具体可以找个地图经纬度，自己写
    orientation: {
      // 相机镜头设置
      heading: 0.046, // 左右方向,正值为右,负值为左
      pitch: -0.563 // 上下方向,正值为上,负值为下
    }
  })
})
</script>

<template>
  <div id="cesiumContainer"></div>
</template>
<style>
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
</style>
