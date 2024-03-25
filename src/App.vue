<script setup lang="ts">

import { ref } from 'vue'

import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Square from './components/Square.vue'
import Board from './components/Board.vue'

import BoardDataGenerator from './features/BoardDataGenerator'

// data

let boardData = ref(new BoardDataGenerator(10, 10));

// methods

function regeneratePicross(){
    boardData.value.update();
}

</script>

<template>
  <header>
    <img alt="orange cat" src="./assets/orange-cat.png" width="270" height="230" style="padding: 5%"/>

    <button @click="regeneratePicross" style="padding: 5%">Regenerate Picross</button>

  </header>

  <main>
    <Board 
        v-model="boardData"
        :width="boardData.width"
        :height="boardData.height">
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
    flex-flow: column;
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
