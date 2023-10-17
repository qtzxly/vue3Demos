<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <header>
    <div class="wrapper">
      <HelloWorld msg="vue3" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">edit</RouterLink>
        <RouterLink to="/map">高德map</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
}
nav {
  margin: 0 0 0 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
