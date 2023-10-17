<template>
  <div id="container"></div>
  <div class="info" v-show="showFore">
    <h4>预报天气</h4>
    <p id="forecast"></p>
  </div>
</template>

<script setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import { onMounted, shallowRef, ref } from 'vue'
const showFore = ref(false)
const map = shallowRef(null) //定义一个map对象
//初始化地图
const initMap = () => {
  window._AMapSecurityConfig = {
    securityJsCode: 'a500c9a70ad5d03db8bf3897fd9990f9' //安全密钥
  }
  AMapLoader.load({
    key: '489d0a338a7a792a72327d1fbd470c8a', //设置密钥
    version: '2.0' //版本
    // plugins:['AMap.Geolocation','AMap.ToolBar','AMap.HawkEye','AMap.MapType','AMap.Weather','AMap.Marker'],
  })
    .then((AMap) => {
      map.value = new AMap.Map('container', {
        viewMode: '3D', //地图模式
        pitch: 20, //角度
        zoom: 11, //缩放，缩放级别在3-15
        zooms: [2, 22],
        mapStyle: 'amap://styles/blue', //设置地图的显示样式
        // center: [118.88064, 32.11352] //初始化地图中心点位置
      })
      AMap.plugin('AMap.Weather', () => {
        let weather = new AMap.Weather() //引入地图插件
        weather.getLive('福田区', (err, data) => {
          console.log(111111111,err, data);
          if (!err) {
            let str = []
            str.push('<h4 >实时天气</h4>')
            str.push('<p>城市/区：' + data.city + '</p>')
            str.push('<p>天气：' + data.weather + '</p>')
            str.push('<p>温度：' + data.temperature + '℃</p>')
            str.push('<p>风向：' + data.windDirection + '</p>')
            str.push('<p>风力：' + data.windPower + ' 级</p>')
            str.push('<p>空气湿度：' + data.humidity + '</p>')
            str.push('<p>发布时间：' + data.reportTime + '</p>')
            console.log(str)
            //添加标记
            let marker = new AMap.Marker({
              map: map,
              position: map.value.getCenter(),
              // icon: 'https://webapi.amap.com/images/car.png',
              autoRotation: true, // 自动旋转
              // angle: 90 // 图片旋转角度
            })
            //自定义信息窗体
            let infoWin = new AMap.InfoWindow({
              content:
                '<div class="info" style="position:inherit;margin-bottom:0;width:240px;height:180px;background: rgba(40, 101, 215,0.5);color:#fff;border-radius: 5px;display:flex;flex-direction: column;justify-content: space-around;">' +
                str.join('') +
                '</div>',
              isCustom: true,
              offset: new AMap.Pixel(0, -20)
            })
            marker.on('mouseover', infoOpen) //鼠标经过打开信息窗体
            marker.on('mouseout', infoClose) //鼠标离开关闭信息窗体
            function infoOpen(e) {
              infoWin.open(map.value, e.target.getPosition())
              showFore.value = true
            }
            function infoClose(e) {
              infoWin.close(map.value, e.target.getPosition())
              showFore.value = false
            }
            map.value.add(marker)
          }
        })
        //未来4天天气预报
        weather.getForecast('福田区', (err, data) => {
          console.log(err, data)
          if (err) {
            return
          }
          let str = []
          for (let i = 0, dayWeather; i < data.forecasts.length; i++) {
            dayWeather = data.forecasts[i]
            str.push(
              dayWeather.date +
                ' <span class="weather">' +
                dayWeather.dayWeather +
                '</span> ' +
                dayWeather.nightTemp +
                '~' +
                dayWeather.dayTemp +
                '℃'
            )
          }
          console.log(str, '未来天气')
          document.getElementById('forecast').innerHTML = str.join('<br>')
        })
      })
    })
    .catch((e) => {
      console.log(e)
    })
}
onMounted(() => {
  initMap()
})
</script>

<style  scoped>
#container {
  width: 100%;
  height: 600px;
  margin: 0;
  padding: 0;
  position: relative;
}
.info {
  width: 220px;
  height: 140px;
  background: rgba(40, 101, 215, 0.5);
  color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  top: 10%;
  left: 60%;
  h4 {
    font-size: 16px;
    text-align: center;
    height: 16px;
    &::after {
      content: '';
      width: 200px;
      height: 1px;
      border-bottom: 1px solid #fff;
      display: inline-block;
    }
  }
  p {
    font-size: 14px;
  }
}
</style>