<script setup lang="ts">

import { ref, computed } from 'vue'
import { BlockState } from '@/features/BlockState';

var props = defineProps<{
    x: number
    y: number
}>();

var emit = defineEmits(['revalidateBoard']);

const model = defineModel<BlockState>({ default: BlockState.Empty});

const background = computed<string>(() => {
    switch(model.value){
        case BlockState.Empty: return "empty"
        case BlockState.Filled: return "filled"
        case BlockState.Hinted: return "hinted"
        case BlockState.Crossed: return "crossed"
    }
});

function setFilledOrEmpty(){
    if([BlockState.Empty, BlockState.Hinted, BlockState.Crossed].includes(model.value)){
        model.value = BlockState.Filled;
    }
    else{
        model.value = BlockState.Empty;
    }
    emit("revalidateBoard");
}

function setHintedOrEmpty(){
    if([BlockState.Empty, BlockState.Filled, BlockState.Crossed].includes(model.value)){
        model.value = BlockState.Hinted;
    }
    if(model.value == BlockState.Hinted){
        model.value = BlockState.Empty;
    }
}

function setCrossedOrEmpty(){
    if([BlockState.Empty, BlockState.Hinted, BlockState.Filled].includes(model.value)){
        model.value = BlockState.Crossed;
    }
    if(model.value == BlockState.Crossed){
        model.value = BlockState.Empty;
    }
}

</script>

<template>
    <div class="size" 
         @click.left="setFilledOrEmpty()" 
         @click.right.prevent="setHintedOrEmpty()" 
         @click.middle="setCrossedOrEmpty()"
         :class="background">
    </div>
</template>

<style scoped>

.size{
    width:25px;
    height:25px;
}

.filled{
    background-color:green;
}

.empty{
    background-color:grey;
}

.hinted{
    background-color:yellow;
}

.crossed{
    background-color:grey;
    background-image: url("../assets/cross.png");
}

</style>