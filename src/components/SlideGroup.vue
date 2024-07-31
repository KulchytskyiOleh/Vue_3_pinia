<template>
    <div class="slide-group">
        <div class="slide-wrapper">
            <ul class="slide-container" ref="container">
                <SlideItem v-for="(item, index) in items" :key="index" :isActive="item === currentActiveItem"
                    :item="item" @click="scrollToItem" />
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SlideItem from './SlideItem.vue'

const container = ref(null);

const currentActiveItem = ref(null);

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

const scrollToItem = (itemElement, currentActive) => {
    currentActiveItem.value = currentActive;
    if (container.value && itemElement) {
        const containerRect = container.value.getBoundingClientRect();
        const itemRect = itemElement.getBoundingClientRect();
        const itemWidth = itemElement.offsetWidth + 20;
        const containerScrollWidth = container.value.scrollWidth;
        const containerClientWidth = containerRect.width;
        const currentTransform = getComputedStyle(container.value).transform;
        const matrix = new DOMMatrix(currentTransform);
        const containerScrollLeft = -matrix.m41;

        let newTransform = 0;

        if (itemRect.left < containerRect.left) {
            const scrollAmount = itemRect.left - containerRect.left;
            newTransform = Math.min(containerScrollLeft + scrollAmount, 0);
        } else if (itemRect.right > containerRect.right) {
            const scrollAmount = itemRect.right - containerRect.right;
            newTransform = Math.max(containerScrollLeft - scrollAmount, containerClientWidth - containerScrollWidth);
        }

        container.value.style.transform = `translateX(${newTransform}px)`;

        const visibleWidth = containerRect.width;
        const adjustedLeft = container.value.getBoundingClientRect().left;
        const adjustedItemLeft = itemRect.left - adjustedLeft;
        const adjustedItemRight = itemRect.right - adjustedLeft;

        if (adjustedItemLeft < 0 || adjustedItemRight > visibleWidth) {
            const newVisibleOffset = Math.max(
                -adjustedItemLeft + (visibleWidth - itemWidth) / 2,
                containerClientWidth - containerScrollWidth
            )
            container.value.style.transform = `translateX(${newVisibleOffset}px)`
        }

        // const section = document.getElementById(`section-${activeIndex.value}`)
        const section = document.getElementById(`${currentActiveItem.value}`)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }
}
</script>

<style scoped>
.slide-group {
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;

    .slide-wrapper {
        overflow: hidden;
        flex: 1;
    }

    .slide-container {
        display: flex;
        padding: 0;
        margin: 0;
        list-style-type: none;
        transition: transform 0.3s ease;
    }
}
</style>
