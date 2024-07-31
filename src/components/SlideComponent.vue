<template>
    <div class="subHeaderWrapper">
        <div class="slide-group">
            <div class="slide-wrapper">
                <ul class="slide-container" ref="container">
                    <li class="slide-item" v-for="(item, index) in items" :key="index" @click="scrollToItem($event)">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
        <v-btn class="buyButton" append-icon="mdi-arrow-right">Encarga tu Trabajo</v-btn>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const container = ref(null)

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8']

const scrollToItem = (event) => {
    const itemElement = event.target
    if (container.value && itemElement) {
        const containerRect = container.value.getBoundingClientRect()
        const itemRect = itemElement.getBoundingClientRect()
        const itemWidth = itemElement.offsetWidth + 20 // margin + padding

        const containerScrollWidth = container.value.scrollWidth
        const containerClientWidth = containerRect.width
        const currentTransform = getComputedStyle(container.value).transform
        const matrix = new DOMMatrix(currentTransform)
        const containerScrollLeft = -matrix.m41

        let newTransform = 0

        if (itemRect.left < containerRect.left) {
            const scrollAmount = itemRect.left - containerRect.left
            newTransform = Math.min(containerScrollLeft + scrollAmount, 0)
        } else if (itemRect.right > containerRect.right) {
            const scrollAmount = itemRect.right - containerRect.right
            newTransform = Math.max(containerScrollLeft - scrollAmount, containerClientWidth - containerScrollWidth)
        }

        container.value.style.transform = `translateX(${newTransform}px)`

        const visibleWidth = containerRect.width
        const adjustedLeft = container.value.getBoundingClientRect().left
        const adjustedItemLeft = itemRect.left - adjustedLeft
        const adjustedItemRight = itemRect.right - adjustedLeft

        if (adjustedItemLeft < 0 || adjustedItemRight > visibleWidth) {
            const newVisibleOffset = Math.max(
                -adjustedItemLeft + (visibleWidth - itemWidth) / 2,
                containerClientWidth - containerScrollWidth
            )
            container.value.style.transform = `translateX(${newVisibleOffset}px)`
        }
    }
}
</script>

<style scoped>
.subHeaderWrapper {
    display: flex;
    gap: 20px;
}

.slide-group {
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
}

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

.slide-item {
    min-width: 200px;
    margin: 0 10px;
    padding: 14px 20px;
    background-color: #f0f0f0;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
}

.buyButton {
    padding: 5px 10px;
    /* padding: 14px 20px; */
    height: 54px;
}
</style>
