<script setup lang="ts">

import { ref, onMounted, onUnmounted, computed } from 'vue'

const width = defineModel<number>('width', {default: 10});
const height = defineModel<number>('height', {default: 10});
const isValid = defineModel<boolean>('isValid', {default: false});

const emit = defineEmits(['regenerateBoard']);

// extra functionality

const isWidthOrHeightGreaterThan30 = computed(() => {
    return width.value > 30 || height.value > 30;
})

const meowFile = computed(() => {
    let randomValue = Math.floor(Math.random() * 10);
    return randomValue % 2 == 1 ? "standard-meow.mp3" : "spooky-meow.mp3";
})

function playMeow(){
    let filepath = `../assets/media/${meowFile.value}`
    let audio = new Audio(filepath);
    audio.play();
}

</script>

<template>
    <table class="options">
        <tr>
            <td colspan="2">
                <img alt="orange cat" 
                    src="../assets/orange-cat.png" 
                    width="270" 
                    height="230"
                    style="user-select: none;"/>
            </td>
        </tr>
        
        <tr>
            <td><label>Width</label></td>
            <td><input v-model.number="width" style="background-color:whitesmoke; border:0px"/></td>
        </tr>
        <tr>
            <td><label>Height</label></td>
            <td><input v-model.number="height" style="background-color:whitesmoke; border:0px"/></td>
        </tr>
        <tr>
            <td colspan="2">
                <button @click="emit('regenerateBoard')"
                        :disabled="isWidthOrHeightGreaterThan30">Regenerate Picross
                </button>
            </td>
        </tr>
        <tr>
            <td colspan="2"><label>{{ isValid ? "VALID :)" : "SORRY :(" }}</label></td>
        </tr>
        <tr>
            <td><i>wandoolsey</i></td>
        </tr>
    </table>
</template>