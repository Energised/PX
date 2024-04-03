<script setup lang="ts">

import { ref, reactive, computed } from 'vue'

import { BoardData } from "../features/BoardData"

import Block from "./Block.vue"
import Hint from "./Hint.vue"
import Empty from "./Empty.vue"

const model = defineModel<BoardData>({default: BoardData});

const props = defineProps<{
    width: number
    height: number
}>();

const emit = defineEmits(['validateBoard']);

// computed methods

const longestRowHint = computed<number>(() => {
    return model.value.rowHints[0].length;
});

const longestColumnHint = computed<number>(() => {
    return model.value.columnHints[0].length;
});

const tableWidth = computed(() => {
    return model.value.width + longestRowHint.value;
});

const tableHeight = computed(() => {
    return model.value.height + longestColumnHint.value;
});

// functions

function isEmptySpace(y : number, x : number) : boolean{
    // guaranteed empties
    if(y < longestColumnHint.value && x < longestRowHint.value){
        return true;
    }

    // in column hint space
    if(y < longestColumnHint.value && x >= longestRowHint.value){
        let columnHintKey : number = x - longestRowHint.value;
        return model.value.columnHints[columnHintKey][y] == 0;
    }

    // in row hint space
    if(y >= longestColumnHint.value && x < longestRowHint.value){
        let rowHintKey : number = y - longestColumnHint.value;
        return model.value.rowHints[rowHintKey][x] == 0;
    }

    // must be a Block
    return false;
}

function isColumnHintSpace(y : number, x : number) : boolean{
    // in column hint space
    if(y < longestColumnHint.value && x >= longestRowHint.value){
        let columnHintKey : number = x - longestRowHint.value;
        // index for this hint array will always be y
        return model.value.columnHints[columnHintKey][y] != 0;
    }

    return false;
}

function isRowHintSpace(y : number, x : number) : boolean{
    // in row hint space
    if(y >= longestColumnHint.value && x < longestRowHint.value){
        let rowHintKey : number = y - longestColumnHint.value;
        return model.value.rowHints[rowHintKey][x] != 0;
    }

    return false;
}

function isBlockSpace(y : number, x : number) : boolean{
    return isEmptySpace(y, x) == false 
        && isRowHintSpace(y, x) == false
        && isColumnHintSpace(y, x) == false;
}

function validateBoard(){
    emit("validateBoard");
}

</script>

<template>

    <table>
        <template v-for="(_, y) in tableHeight">
            <tr>
                <template v-for="(_, x) in tableWidth">
                    <td>
                        <template v-if="isEmptySpace(y, x)">
                            <Empty :x="x" :y="y"></Empty>
                        </template>
                        <template v-else-if="isColumnHintSpace(y, x)">
                            <Hint :column-hints="model.columnHints"
                                  :row-hints="model.rowHints"
                                  :first-index="x - longestRowHint"
                                  :second-index="y"
                                  :is-column="true">
                            </Hint>
                        </template>
                        <template v-else-if="isRowHintSpace(y, x)">
                            <Hint :column-hints="model.columnHints"
                                  :row-hints="model.rowHints"
                                  :first-index="y - longestColumnHint"
                                  :second-index="x"
                                  :is-column="false">
                            </Hint>
                        </template>
                        <template v-else>
                            <Block
                                v-model="model.boardState[y - longestColumnHint][x - longestRowHint]"
                                :y="y - longestColumnHint"
                                :x="x - longestRowHint"
                                @block-updated="validateBoard()">
                            </Block>
                        </template>
                    </td>
                </template>
            </tr>
        </template>
    </table>

</template>