<script setup lang="ts">

import { ref, onMounted } from 'vue'

import type { Ref } from 'vue'

import Board from './components/Board.vue'
import DraggableMenu from './components/DraggableMenu.vue'

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

    <div>

        <DraggableMenu
            v-model:width="width"
            v-model:height="height"
            v-model:isValid="boardDataValidator.isValid"
            @regenerate-board="regeneratePicross()">
        </DraggableMenu>

        <Board
            v-model="boardData"
            :width="boardData.width"
            :height="boardData.height"
            @validate-board="boardDataValidator.validate()"
            style="display:block;float:right">
        </Board>

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