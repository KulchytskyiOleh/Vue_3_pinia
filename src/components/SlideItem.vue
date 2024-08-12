<template>
    <li :class="['slideItem', { 'active': isActive }]" @click="handleClick">
        {{ item }}
    </li>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
    item: String,
    isActive: Boolean
})

const emit = defineEmits(['click']);

const handleClick = (event) => {
    emit('click', event.target, props.item);
}
</script>

<style>
.slideItem {
    min-width: 200px;
    margin: 0 10px;
    padding: 5px 10px;
    text-align: center;
    background-color: #c0c0c0;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &.active {
        background-color: #f0f0f0;
        border-radius: 5px;
    }
}
</style>
