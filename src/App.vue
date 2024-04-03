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

    <div style="display: flow-root;">

        <table class="options">
            <tr>
                <td colspan="2"><img alt="orange cat" src="./assets/orange-cat.png" width="270" height="230" style=""/></td>
            </tr>
            
            <tr>
                <td><label>Width</label></td>
                <td><input v-model.number="width" style="background-color:dimgrey; border:0px"/></td>
            </tr>
            <tr>
                <td><label>Height</label></td>
                <td><input v-model.number="height" style="background-color:dimgrey; border:0px"/></td>
            </tr>
            <tr>
                <td colspan="2"><button @click="regeneratePicross()">Regenerate Picross</button></td>
            </tr>
            <tr>
                <td colspan="2"><label>{{ boardDataValidator.isValid ? "VALID :)" : "SORRY :(" }}</label></td>
            </tr>
            <tr>
                <td>wandoolsey</td>
            </tr>
        </table>

        <div style="float:right;">
            <Board 
                v-model="boardData"
                :width="boardData.width"
                :height="boardData.height"
                @validate-board="boardDataValidator.validate()">
            </Board>
        </div>
    </div>

    <div>
        <table style="text-align:center">
            <tr>
                <td colspan="3">
                    <b>Instructions</b>
                </td>
            </tr>
            <tr>
                <td>Left Click</td>
                <td>Middle Mouse</td>
                <td>Right Click</td>
            </tr>
            <tr>
                <td>Fill Answer</td>
                <td>Cross Out</td>
                <td>Hint</td>
            </tr>
        </table>
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

.options{
    float: left;
}

.options td{
    text-align: center;
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