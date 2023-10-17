<template>
  <div class="common-page-container">
    <div class="content">
      <div class="lists" v-for="(item, index) in router.options.routes">
        <div class="list" @click="$router.push(item.path)" :key="index">
          <div class="list-left">{{ item.path }}</div>
          <img src="@/img/arrow-right.png" class="switch-img" />
        </div>
      </div>
    </div>
    <img src="@/assets/earth2.jpg" alt="" />
  </div>
</template>

<script setup>
import router from '@/router/index.ts'
</script>

<style lang="scss" scoped>
.content {
  padding: 20px 20px 0 20px;
}

.lists {
  border-radius: 6px;
  margin-bottom: 12px;
  padding: 1px;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
}

.list {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 12px;
  padding: 10px 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
  &:last-child {
    border: none;
  }
  .list-left {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: var(--text-color);
  }
  .right-txt {
    position: absolute;
    right: 18px;
    top: 12px;
    font-size: 12px;
    font-family:
      PingFangSC-Regular,
      PingFang SC;
    font-weight: 400;
    color: #757575;
  }
  .switch-img {
    display: block;
    width: 12px;
    height: 12px;
  }
}

a {
  color: inherit;
  font: inherit;
  text-decoration: none;
  border: none;
  outline: none;
  tap-highlight-color: rgba(0, 0, 0, 0);
  focus-ring-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-focus-ring-color: rgba(0, 0, 0, 0);
  -moz-tap-highlight-color: rgba(0, 0, 0, 0);
  -moz-focus-ring-color: rgba(0, 0, 0, 0);
}

a:visited {
  color: inherit;
}
</style>
