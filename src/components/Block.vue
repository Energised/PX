<script setup lang="ts">

import { ref, computed } from 'vue'

var props = defineProps<{
    x: number
    y: number
}>();

var emit = defineEmits(['blockUpdated']);

const model = defineModel<boolean>({ default: false});

const background = computed<string>(() => {
    return model.value ? "filled" : "empty";
});

function selectBlock(){
    model.value = !model.value;
    emit("blockUpdated");
}

</script>

<template>
    <div class="size" @click="selectBlock()" :class="background">
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

</style>