<template>
    <div class="container">
        <!-- Moveable is the component with all the logic that then targets the div below -->
        <Moveable
            v-bind:target="['.target']"
            v-bind:draggable="true"
            @drag="onDrag"
            @scale="onScale"
            @rotate="onRotate">
        </Moveable>

        <!-- We can then slot whatever we need to in here -->
        <div class="target" ref="target" style="width:320px;height:450px;">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import Moveable from "vue3-moveable";
    
    export default {
      name: "MoveableContainer",
      components: {
        Moveable
      },
      methods: {
        onDrag({ transform }) {
            this.$refs.target.style.transform = transform;
        },
        onScale({ drag }) {
            this.$refs.target.style.transform = drag.transform;
        },
        onRotate({ drag }) {
            this.$refs.target.style.transform = drag.transform;
        },
      }
    }
</script>