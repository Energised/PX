<script setup lang="ts">

import { ref, onMounted } from 'vue'

import type { Ref } from 'vue'

import axios from 'axios';
import type { AxiosResponse } from 'axios';

import Board from './components/Board.vue'
import Draggable from './components/Draggable.vue'
import Menu from './components/Menu.vue'
import Instructions from './components/Instructions.vue'

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

async function dataHandlerRequest(){
    let url = "https://localhost:7004/DataHandler/Save";
    let data = {
        testString: "this is the request data",
        boardData: boardData.value
    };

    let response = await axios.post(url, data);
    console.log(response.data);
}

async function solverRequest(){
    let url : string = "https://localhost:7004/Solver";
    let data : object = {
        boardToSolve: boardData.value
    };

    let response : AxiosResponse = await axios.post(url, data);
    
    let solvedBoard : BoardData = response.data.solvedBoard;
    boardData.value.boardState = solvedBoard.boardState;
}

</script>

<template>

    <div>

        <Draggable id="menu">
            <Menu
                v-model:width="width"
                v-model:height="height"
                v-model:isValid="boardDataValidator.isValid"
                @regenerate-board="regeneratePicross()">
            </Menu>
        </Draggable>

        <Draggable id="instructions"> 
            <Instructions></Instructions>
        </Draggable>

        <Board
            v-model="boardData"
            :width="boardData.width"
            :height="boardData.height"
            @validate-board="boardDataValidator.validate()"
            style="display:block;float:right">
        </Board>

        <button @click="solverRequest()"> Click me!</button>

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
}

/* Initial positions */

#menu {
    left:650px;
    top:30px;
}

#instructions {
    left:100px;
    top:200px;
}
</style>