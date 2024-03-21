<script setup lang="ts">

import { computed } from 'vue'

const props = defineProps<{
    columnHints: number[][]
    rowHints: number[][]
    firstIndex: number
    secondIndex: number
    isColumn: boolean
}>();

const value = computed<number>(() => {
    if(props.isColumn){
        return props.columnHints[props.firstIndex][props.secondIndex];
    }
    else{
        return props.rowHints[props.firstIndex][props.secondIndex];
    }
});

</script>

<template>
    <div class="size centeredNumber">
        {{ value }}
    </div>
</template>

<style scoped>

.size{
    width: 30px;
    height: 30px;
}

.centeredNumber{
    text-align: center;
}

</style>