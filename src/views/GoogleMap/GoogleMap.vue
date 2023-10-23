<template>
  <div>
    <input v-model="formData.stationProvince" class="mapInput" maxlength="64" style="" />
    <div id="mapContainer" ref="mapContainer"></div>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'
export default {
  data() {
    return {
      formData: {
        stationProvince: ''
      }
    }
  },
  async mounted() {
    this.initGMap()
  },
  methods: {
    initGMap() {
      const loader = new Loader({
        apiKey: 'qtAIzaSyD5mbK4MJPKAeGKtxuGOZi0e_71j3-H__05mbK',
        version: 'weekly'
      })

      loader.load().then(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.map = new google.maps.Map(this.$refs.mapContainer, {
              center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              zoom: 8,
              disableDefaultUI: true
            })
            this.dealMapClick()
          })
        } else {
          this.map = new google.maps.Map(this.$refs.mapContainer, {
            center: { lat: 51.5074, lng: 0.1278 }, // 欧洲的坐标
            zoom: 8,
            disableDefaultUI: true
          })
          this.dealMapClick()
        }
      })
    },
    dealMapClick() {
      this.geocoder = new google.maps.Geocoder()
      // 添加点击事件监听器
      const _this = this
      this.map.addListener('click', (event) => {
        console.log('Clicked location: ', event.latLng.toString())
        console.log('Latitude--->: ', event.latLng.lat())
        console.log('Longitude: ', event.latLng.lng())
        _this.formData.stationLatitude = event.latLng.lat()
        _this.formData.stationLongitude = event.latLng.lng()
        // 使用Geocoder服务获取地点名称
        this.geocoder.geocode({ location: event.latLng }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              console.log('Location name: ', results[0].formatted_address)
              _this.formData.stationProvince = results[0].formatted_address
            } else {
              console.log('No results found')
            }
          } else {
            console.log('Geocoder failed due to: ' + status)
          }
        })
        // 将地图中心设置为点击的位置
        this.map.setCenter(event.latLng)
        // 如果已经存在一个标记，移除它
        if (this.marker) {
          this.marker.setMap(null)
        }

        // 在点击的位置添加一个标记
        this.marker = new google.maps.Marker({
          position: event.latLng,
          map: this.map
        })
      })
    }
  }
}
</script>

<style scoped>
#mapContainer {
  height: 600px;
  width: 100%;
}

.mapInput {
  position: absolute;
  z-index: 10;
  top: 5px;
  left: 5px;
  width: 200px;
}
</style>
