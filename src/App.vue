<template>
  <FeeCalculator />
</template>

<script>
import FeeCalculator from './components/FeeCalculator.vue'
import '@/scss/index.scss';

export default {
  name: 'App',
  components: {
    FeeCalculator
  }
}
</script>

<style>

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
