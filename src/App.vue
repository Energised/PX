<script setup lang="ts">

import { ref } from 'vue'

import type { Ref } from 'vue'

import Board from './components/Board.vue'

import { BoardData } from './features/BoardData'
import { BoardDataValidator} from './features/BoardDataValidator'

// data

let width : Ref<number> = ref(10);
let height : Ref<number> = ref(10);

let boardData = ref(new BoardData(width.value, height.value));
let boardDataValidator = ref(new BoardDataValidator(boardData.value));

// methods

function regeneratePicross(){
    boardData.value.update(width.value, height.value);
    boardDataValidator.value.validate();
}

</script>

<template>

    <div style="display:flex; justify-content:space-between;">
        <div style="display:flex; flex-direction:column; justify-content:space-between">
            <img alt="orange cat" src="./assets/orange-cat.png" width="270" height="230" style="padding: 5%"/>
            <div style="display:flex; justify-content:space-evenly">
                <label>Width</label>
                <input v-model.number="width" style="background-color:dimgrey; border:0px"/>
            </div>
            <div style="display:flex; justify-content:space-evenly">
                <label>Height</label>
                <input v-model.number="height" style="background-color:dimgrey; border:0px"/>
            </div>
            <button @click="regeneratePicross" style="padding: 5%">Regenerate Picross</button>
            <!--<button @click="validateBoard" style="padding: 5%">Check Valid</button>-->
            <div>
                <label>{{ boardDataValidator.isValid ? "VALID :)" : "SORRY :(" }}</label>
            </div>
        </div>

        <div style="flex-basis:60%">
            <Board 
                v-model="boardData"
                :width="boardData.width"
                :height="boardData.height"
                @validate-board="boardDataValidator.validate()">
            </Board>
        </div>
    </div>

    <div>
        wandoolsey
    </div>

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
    /*display: flex;
    place-items: flex-start;
    flex-wrap: wrap;*/
  }
}
</style>
./features/BoardData