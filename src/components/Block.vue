<script setup lang="ts">

import { ref, computed } from 'vue'

var props = defineProps<{
    x: number
    y: number
}>();

const model = defineModel<boolean>({ default: false});

const background = computed<string>(() => {
    return model.value ? "filled" : "empty";
});

</script>

<template>
    <div class="size" @click="model = !model" :class="background">
    </div>
</template>

<style scoped>

.size{
    width:40px;
    height:40px;
}

.filled{
    background-color:green;
}

.empty{
    background-color:grey;
}

</style>