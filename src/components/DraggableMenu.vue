<script setup lang="ts">

import { ref, reactive, computed } from 'vue'
import MoveableContainer from './MoveableContainer.vue';

const width = defineModel<number>('width', {default: 10});
const height = defineModel<number>('height', {default: 10});
const isValid = defineModel<boolean>('isValid', {default: false});

const emit = defineEmits(['regenerateBoard']);

const isWidthOrHeightGreaterThan30 = computed(() => {
    return width.value > 30 || height.value > 30;
});

</script>

<template>
    <div>
        <MoveableContainer>
            <table class="options" style="">
                <tr>
                    <td colspan="2"><img alt="orange cat" src="../assets/orange-cat.png" width="270" height="230"/></td>
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
        </MoveableContainer>
    </div>
</template>

<style scoped>

.options{
    float: left;
}

.options td{
    text-align: center;
}

</style>