<script setup lang="ts">

import { ref, reactive, computed } from 'vue'

import Block from "./Block.vue"
import Hint from "./Hint.vue"
import Empty from "./Empty.vue"

const props = defineProps<{
    width: number
    height: number
}>();

// board data - load from persistence somehow

const boardState = ref<boolean[][]>(
    [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false]
    ]
);

const rowHints = ref<number[][]>([
    [0, 2, 1],
    [0, 0, 5],
    [1, 1, 1],
    [0, 1, 3],
    [0, 0, 1]
]);

const columnHints = ref<number[][]>([
    [0, 4],
    [0, 2],
    [0, 3],
    [2, 2],
    [0, 3]
]);

// computed methods

const longestRowHint = computed<number>(() => {
    return rowHints.value[0].length;
});

const longestColumnHint = computed<number>(() => {
    return columnHints.value[0].length;
});

const tableWidth = computed(() => {
    return props.width + longestRowHint.value;
});

const tableHeight = computed(() => {
    return props.height + longestColumnHint.value;
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
        return columnHints.value[columnHintKey][y] == 0;
    }

    // in row hint space
    if(y >= longestColumnHint.value && x < longestRowHint.value){
        let rowHintKey : number = y - longestColumnHint.value;
        return rowHints.value[rowHintKey][x] == 0;
    }

    // must be a Block
    return false;
}

function isColumnHintSpace(y : number, x : number) : boolean{
    // in column hint space
    if(y < longestColumnHint.value && x >= longestRowHint.value){
        let columnHintKey : number = x - longestRowHint.value;
        // index for this hint array will always be y
        return columnHints.value[columnHintKey][y] != 0;
    }

    return false;
}

function isRowHintSpace(y : number, x : number) : boolean{
    // in row hint space
    if(y >= longestColumnHint.value && x < longestRowHint.value){
        let rowHintKey : number = y - longestColumnHint.value;
        return rowHints.value[rowHintKey][x] != 0;
    }

    return false;
}

function isBlockSpace(y : number, x : number) : boolean{
    return isEmptySpace(y, x) == false 
        && isRowHintSpace(y, x) == false
        && isColumnHintSpace(y, x) == false;
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
                            <Hint :column-hints="columnHints"
                                  :row-hints="rowHints"
                                  :first-index="x - longestRowHint"
                                  :second-index="y"
                                  :is-column="true">
                            </Hint>
                        </template>
                        <template v-else-if="isRowHintSpace(y, x)">
                            <Hint :column-hints="columnHints"
                                  :row-hints="rowHints"
                                  :first-index="y - longestColumnHint"
                                  :second-index="x"
                                  :is-column="false">
                            </Hint>
                        </template>
                        <template v-else>
                            <Block
                                v-model="boardState[y - longestColumnHint][x - longestRowHint]"
                                :y="y - longestColumnHint"
                                :x="x - longestRowHint">
                            </Block>
                        </template>
                    </td>
                </template>
            </tr>
        </template>
    </table>

</template>