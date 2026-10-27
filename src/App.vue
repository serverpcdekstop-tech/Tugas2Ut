<template>
  <div id="app">
    <NavbarView />

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import NavbarView from "./components/NavbarView.vue";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
