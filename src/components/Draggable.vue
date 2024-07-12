<script setup lang="ts">

import { ref, onMounted, onUnmounted, computed } from 'vue'

const draggable = ref<HTMLDivElement | null>(null)
let x = 0
let y = 0

function handleMouseDown(event: MouseEvent){
    x = event.clientX;
    y = event.clientY;
    window.addEventListener('mousemove', handleMouseMove);
}

function handleMouseMove(event: MouseEvent){
    window.addEventListener('mouseup', handleMouseUp);
    const dx = event.clientX - x
    const dy = event.clientY - y
    x = event.clientX;
    y = event.clientY;
    if (draggable.value){
        draggable.value.style.left = `${draggable.value.offsetLeft + dx}px`;
        draggable.value.style.top = `${draggable.value.offsetTop + dy}px`;
    }
}

function handleMouseUp(){
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
}

onMounted(() => {
    draggable.value?.addEventListener('mousedown', handleMouseDown)
})

onUnmounted(() => {
    draggable.value?.removeEventListener('mousedown', handleMouseDown)
})

</script>

<template>
    <div ref="draggable" class="draggable">
        <slot></slot>
    </div>
</template>
  
<style scoped>

.draggable {
    position: absolute;
    cursor: move;
}

.draggable::before{
    left:620px;
    top:30px;
}

</style>