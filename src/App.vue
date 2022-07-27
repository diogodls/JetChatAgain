<template>
  <div id="app">
    <HomeView />
  </div>
</template>

<script>
import HomeView from "@/views/HomeView";

export default {
  name: 'App',
  components: {
    HomeView,
  }
}
</script>

<style>
html {
  overflow-y: unset;
}
</style>