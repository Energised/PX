<script setup lang="ts">

const props = defineProps<{
    y: number
    x: number
}>();

</script>

<template>
    <div class="size"></div>
</template>

<style scoped>

.size{
    width: 30px;
    height: 30px;
}

</style>