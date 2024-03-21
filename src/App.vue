<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Square from './components/Square.vue'
import Board from './components/Board.vue'
</script>

<template>
  <header>
    <img alt="orange cat" class="logo" src="./assets/orange-cat.png" width="180" height="180" />
  </header>

  <main>
    <Board 
        :width="5"
        :height="5">
    </Board>
  </main>

  <!-- Look into how flexboxes work again -->
  <footer class="">
    wandoolsey
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
