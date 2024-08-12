<template>
    <div class="swiper-wrapper">
        <div class="swiper-container">
            <div class="text-content">
                <h3>{{ items[activeIndex].title }}</h3>
                <p>{{ items[activeIndex].text }}</p>
            </div>
            <div class="swiper-pagination">
                <button v-for="(item, index) in items" :key="index"
                    :class="['swiper-bullet', { active: index === activeIndex }]" @click="setActiveIndex(index)">{{
                        index + 1 }}</button>
            </div>
            <div class="image-placeholder">
                <img :src="items[activeIndex].image" alt="Image" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
    {
        title: 'Гарантія антиплагіату',
        text: 'Наше департамент перевіряє роботу за допомогою Turnitin, щоб гарантувати її оригінальність та якість. Ми використовуємо базу даних з тисяч документів для забезпечення найвищих стандартів.',
        image: 'https://via.placeholder.com/200x200?text=Image+1'
    },
    {
        title: 'Редактори та експерти',
        text: 'Наші редактори мають багаторічний досвід роботи та глибокі знання у відповідних галузях, що дозволяє нам забезпечити високу якість кожної роботи.',
        image: 'https://via.placeholder.com/200x200?text=Image+2'
    },
    {
        title: 'Персоналізована підтримка',
        text: 'Ми пропонуємо індивідуальну підтримку для кожного клієнта, допомагаючи їм на кожному етапі процесу створення та редагування робіт.',
        image: 'https://via.placeholder.com/200x200?text=Image+3'
    },
    {
        title: 'Конфіденційність та безпека',
        text: 'Ми забезпечуємо повну конфіденційність і безпеку ваших даних. Ваша інформація зберігається в захищених системах і не передається третім особам.',
        image: 'https://via.placeholder.com/200x200?text=Image+4'
    }
]);

const activeIndex = ref(0);

const setActiveIndex = (index) => {
    activeIndex.value = index;
};

</script>

<style>
.swiper-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #2ecc71;
}

.swiper-container {
    display: flex;
    align-items: center;
    width: 80%;
    height: 400px;
    position: relative;
}

.text-content {
    flex: 2;
    margin-right: 20px;
    text-align: left;
}

.swiper-pagination {
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 10;
}

.image-placeholder {
    flex: 1;
    width: 200px;
    height: 200px;
    background-color: #e0e0e0;
    margin-left: 20px;
}

.image-placeholder img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.swiper-bullet {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    background-color: #ccc;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.swiper-bullet.active {
    background-color: #007bff;
}
</style>
