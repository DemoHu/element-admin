<!--
 * @Author: Siwen
 * @LastEditors: Siwen
 * @Date: 2019-03-22 11:07:54
 * @LastEditTime: 2019-04-08 14:35:08
 * @Description: 全屏控件
 -->
<template>
  <div>
    <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" />
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: '你的浏览器暂不支持',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', () => {
          this.isFullscreen = screenfull.isFullscreen
        })
      }
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
