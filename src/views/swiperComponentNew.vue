<template>
    <div class="swiper-container">
        <div class="header">
            <h2>Garantías TFG.online</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur. Malesuada morbi turpis dolor
                nunc. Odio est lectus donec ac amet tristique id.
            </p>
        </div>
        <div class="bottomContent" ref="swiperContainer">
            <div class="swiper-wrapper" ref="swiperWrapper">
                <div v-for="(item, index) in items" :key="index" class="swiper-slide"
                    :style="{ transform: isDesktop ? `translateY(${activeIndex * -100}%)` : `translateX(${activeIndex * -100}%)` }">
                    <div class="swiper-card">
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.text }}</p>
                        <button>Leer más</button>
                        <img :src="`https://via.placeholder.com/500x500?text=Image+${index + 1}`"
                            :alt="`Image ${index + 1}`" />
                    </div>
                </div>
            </div>
            <div class="swiper-pagination">
                <span v-for="(item, index) in items" :key="index"
                    :class="['swiper-pagination-bullet', { active: index === activeIndex }]"
                    @click="goToSlide(index)"></span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';

export default {
    setup() {
        const items = ref([
            { title: "Garantía antiplagio mediante informe de originalidad generado por Turnitin", text: "Nuestro departamento de calidad revisa todo el trabajo que realizan nuestros redactores académicos para asegurar..." },
            { title: "Otra garantía que ofrecemos", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac odio est. In hac habitasse platea dictumst..." },
            { title: "Otra garantía que ofrecemos", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac odio est. In hac habitasse platea dictumst..." },
            { title: "Más garantías para tu tranquilidad", text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi..." },
            { title: "Más garantías para tu tranquilidad", text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi..." },
            { title: "Más garantías para tu tranquilidad", text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi..." }
        ]);

        const activeIndex = ref(0);
        const isDesktop = computed(() => window.innerWidth >= 1440);
        const startX = ref(0);
        const endX = ref(0);
        const threshold = 50; // Minimum swipe distance in pixels

        const goToSlide = (index) => {
            if (index >= 0 && index < items.value.length) {
                activeIndex.value = index;
            }
        };

        const handleResize = () => {
            isDesktop.value = window.innerWidth >= 1440;
        };

        const handleTouchStart = (event) => {
            startX.value = event.touches[0].clientX;
        };

        const handleTouchMove = (event) => {
            endX.value = event.touches[0].clientX;
        };

        const handleTouchEnd = () => {
            const diffX = startX.value - endX.value;

            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    // Swipe left
                    goToSlide(activeIndex.value + 1);
                } else {
                    // Swipe right
                    goToSlide(activeIndex.value - 1);
                }
            }
        };

        onMounted(() => {
            window.addEventListener('resize', handleResize);
            const swiperContainer = document.querySelector('.bottomContent');
            swiperContainer.addEventListener('touchstart', handleTouchStart);
            swiperContainer.addEventListener('touchmove', handleTouchMove);
            swiperContainer.addEventListener('touchend', handleTouchEnd);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
            const swiperContainer = document.querySelector('.bottomContent');
            swiperContainer.removeEventListener('touchstart', handleTouchStart);
            swiperContainer.removeEventListener('touchmove', handleTouchMove);
            swiperContainer.removeEventListener('touchend', handleTouchEnd);
        });

        return { items, activeIndex, goToSlide, isDesktop };
    },
};
</script>

<style lang="scss">
.swiper-container {
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 300px;

        h2 {
            font-size: 2rem;
            margin-bottom: 10px;
        }

        p {
            font-size: 1rem;
            margin-bottom: 20px;
        }
    }

    .bottomContent {
        width: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .swiper-wrapper {
        display: flex;
        transition: transform 0.6s ease;
        overflow: hidden;
        margin-bottom: 50px;

        &.desktop {
            max-height: 500px;
            overflow-y: hidden;
            padding: 0 0 20px;
            /* Ensure space at the bottom */
        }
    }

    .swiper-slide {
        flex: 0 0 100%;
        display: flex;
        justify-content: center;
        transition: transform 0.3s ease;

        .swiper-card {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            padding: 20px;
            text-align: center;
            width: 100%;
            max-width: 500px;

            h3 {
                font-size: 1.25rem;
                margin-bottom: 10px;
            }

            p {
                font-size: 1rem;
                margin-bottom: 20px;
            }

            button {
                background-color: #007bff;
                color: #fff;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                margin-bottom: 20px;
                transition: background-color 0.3s ease;

                &:hover {
                    background-color: #0056b3;
                }
            }

            img {
                width: 100%;
                border-radius: 10px;
                transition: transform 0.3s ease;

                &:hover {
                    transform: scale(1.05);
                }
            }
        }
    }

    .swiper-pagination {
        display: flex;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        justify-content: center;
        margin-top: 20px;

        .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background-color: #ddd;
            border-radius: 50%;
            margin: 0 5px;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.3s ease;

            &.active {
                background-color: #007bff;
                transform: scale(1.2);
            }
        }
    }
}

@media (min-width: 768px) {
    .swiper-wrapper {
        flex-direction: row;
        overflow: auto;

        .swiper-slide {
            flex: 0 0 70%;

            &:not(:last-child) {
                margin-right: 20px;
            }
        }
    }

    .swiper-pagination {
        flex-direction: row;
        position: static;
        margin-top: 10px;
        width: auto;
    }
}

@media (min-width: 1440px) {
    .swiper-container {
        flex-direction: row;
        align-items: flex-start;

        .header {
            max-width: none;
        }

        .bottomContent {
            flex-direction: row;
            align-items: flex-start;
        }

        .swiper-wrapper {
            flex-direction: column;
            max-height: 500px;
            width: calc(100% - 60px);
            overflow: hidden;
            position: relative;

            .swiper-slide {
                flex: 0 0 auto;
                margin-bottom: 20px;
                /* Space between slides */
                display: flex;
                align-items: center;
                position: relative;
                overflow: hidden;
                /* Ensure no overflow from slides */

                &:nth-child(n+2) {
                    margin-top: 20px;
                    /* Margin between slides */
                }

                .swiper-card {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    text-align: left;
                    width: 100%;

                    h3,
                    p {
                        text-align: left;
                    }

                    img {
                        width: 50%;
                        margin-left: 20px;
                    }
                }
            }
        }

        .swiper-pagination {
            flex-direction: column;
            position: static;
            margin-left: 20px;
            width: 60px;
            height: 100%;
            align-items: center;
            justify-content: center;

            .swiper-pagination-bullet {
                margin: 10px 0;
            }
        }
    }
}
</style>
