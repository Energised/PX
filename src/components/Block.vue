<script setup lang="ts">

import { ref, computed } from 'vue'

var props = defineProps<{
    x: number
    y: number
}>();

var emit = defineEmits(['blockUpdated']);

const model = defineModel<boolean>({ default: false});

const background = computed<string>(() => {
    if(model.value) return "filled";
    if(hinted.value) return "hint";
    if(crossed.value) return "crossed";
    return "empty";
});

const hinted = ref(false);

const crossed = ref(false);

function setFilled(){
    model.value = !model.value;
    hinted.value = false;
    emit("blockUpdated");
}

function setHintIfEmpty(){
    if(model.value) return;
    hinted.value = !hinted.value;
}

function setCrossed(){
    hinted.value = false;
    crossed.value = !crossed.value;
}

</script>

<template>
    <div class="size" 
         @click.left="setFilled()" 
         @click.right.prevent="setHintIfEmpty()" 
         @click.middle="setCrossed()"
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

.hint{
    background-color:yellow;
}

.crossed{
    background-color:grey;
    background-image: url("../assets/cross.png");
}

</style>