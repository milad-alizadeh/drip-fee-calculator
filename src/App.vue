<template>
  <div class="app" id="app">
    <div class="app__header">
      <img class="app__logo"  src="./assets/logo.png" />
      <h1 class="app__title">Drip Network Tax Calculator</h1>
    </div>
    <FeeCalculator />
  </div>
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

<style lang="scss">

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  padding: 20px;
  display: grid;
  grid-gap: 20px;

  &__logo {
    width: 60px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 18px;

    @media (min-width: 769px) {
      font-size: 30px
    }
  }
}
</style>
