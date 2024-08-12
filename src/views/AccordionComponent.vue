<template>
    <div class="faq-container">
        <div class="top-section">
            <div class="left-content">
                <h1>Preguntas más frecuentes</h1>
                <p>Lorem ipsum dolor sit amet consectetur. Malesuada morbi turpis dolor nunc. Odio est lectus donec ac
                    amet tristique id.</p>
            </div>
            <div class="right-content">
                <img src="../assets/icons/lady_faq.png">
            </div>
        </div>

        <div class="accordionSectionWrapper">
            <div :class="['accordion', { 'show-all': showAll }]" :style="{ maxHeight: showAll ? 'none' : '800px' }"
                ref="accordion">
                <div v-for="(item, index) in faqItems" :key="index" class="accordion-item">
                    <div class="item-header" @click="toggleItem(index)">
                        <h2 :class="{ active: item.isOpen }">{{ item.title }}</h2>
                        <button :class="{ active: item.isOpen }">
                            <img v-if="item.isOpen" src="../assets/icons/arrow-up.svg">
                            <img v-else src="../assets/icons/arrow-down.svg">
                        </button>
                    </div>
                    <p v-if="item.isOpen">{{ item.content }}</p>
                </div>
            </div>
        </div>

        <div class="show-more-container">
            <button class="show-more" @click="showMore">
                {{ buttonTextToggle }}
                <img v-if="showAll" src="../assets/icons/button-arrow-up.svg">
                <img v-else src="../assets/icons/button-arrow-down.svg">
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const faqItems = ref([
    { title: '¿Sabrá el redactor quién soy yo?', content: 'Todos tus datos personales son completamente confidenciales; el redactor nunca tendrá acceso a ellos.', isOpen: false },
    { title: '¿Qué garantías tengo de que una vez pague recibiré el trabajo?', content: 'Una vez realizado el pago, recibirás tu trabajo dentro del plazo acordado.', isOpen: false },
    { title: '¿El trabajo me lo vais enviando en partes o es todo de una vez?', content: 'Puedes optar por recibir el trabajo en partes o en su totalidad una vez finalizado.', isOpen: false },
    { title: '¿Tendré contacto con la persona que redactará mi trabajo?', content: 'Podrás comunicarte directamente con el redactor para cualquier duda o modificación.', isOpen: false },
    { title: '¿El trabajo me lo vais enviando en partes o es todo de una vez?', content: 'Puedes optar por recibir el trabajo en partes o en su totalidad una vez finalizado.', isOpen: false },
    { title: '¿Sabrá el redactor quién soy yo?', content: 'Todos tus datos personales son completamente confidenciales; el redactor nunca tendrá acceso a ellos.', isOpen: false },
    { title: '¿Qué garantía tengo de que el trabajo no sea un plagio?', content: 'Todos los trabajos son 100% originales y pasan por un control antiplagio antes de la entrega.', isOpen: false },
    { title: '¿Puedo encargar un trabajo antes de conocer todos los detalles del mismo?', content: 'Puedes reservar un trabajo con anticipación y definir los detalles más adelante.', isOpen: false },
    { title: '¿Qué garantías tengo de obtener una buena nota?', content: 'Nuestros redactores están altamente calificados para garantizar una excelente calidad en tu trabajo.', isOpen: false },
    { title: '¿El redactor realizará las correcciones que yo le solicite?', content: 'Sí, todas las correcciones necesarias están incluidas en el servicio.', isOpen: false },
    { title: '¿Cuáles son los métodos de pago disponibles?', content: 'Aceptamos pagos a través de tarjetas de crédito, PayPal y transferencias bancarias.', isOpen: false },
    { title: '¿Quién será el redactor de mi trabajo?', content: 'Asignamos redactores especializados en la temática de tu trabajo.', isOpen: false },
    { title: '¿Cuáles son los métodos de pago disponibles?', content: 'Aceptamos pagos a través de tarjetas de crédito, PayPal y transferencias bancarias.', isOpen: false },
    { title: '¿Puedo pedir una revisión del trabajo?', content: 'Ofrecemos revisiones gratuitas para asegurarte de que el trabajo cumpla con tus expectativas.', isOpen: false },
    { title: '¿El precio incluye impuestos?', content: 'El precio total incluye todos los impuestos aplicables.', isOpen: false },
    { title: '¿Cuánto tiempo tardan en entregar el trabajo?', content: 'El tiempo de entrega depende de la complejidad del trabajo, pero siempre dentro de los plazos acordados.', isOpen: false },
    { title: '¿Puedo solicitar trabajos urgentes?', content: 'Sí, ofrecemos un servicio de entrega urgente para casos en los que necesitas el trabajo lo antes posible.', isOpen: false },
    { title: '¿Cuánto tiempo tardan en entregar el trabajo?', content: 'El tiempo de entrega depende de la complejidad del trabajo, pero siempre dentro de los plazos acordados.', isOpen: false },
    { title: '¿Ofrecen descuentos para pedidos grandes?', content: 'Sí, ofrecemos descuentos para pedidos de gran volumen. Contáctanos para más detalles.', isOpen: false },
    { title: '¿Puedo solicitar trabajos urgentes?', content: 'Sí, ofrecemos un servicio de entrega urgente para casos en los que necesitas el trabajo lo antes posible.', isOpen: false },
    { title: '¿Ofrecen descuentos para pedidos grandes?', content: 'Sí, ofrecemos descuentos para pedidos de gran volumen. Contáctanos para más detalles.', isOpen: false },
    { title: '¿Cómo puedo contactar con soporte?', content: 'Puedes contactar con nuestro equipo de soporte a través de chat en vivo, correo electrónico o teléfono.', isOpen: false },
]);


const accordion = ref(null);

const showAll = ref(false);

const toggleItem = (index) => {
    faqItems.value[index].isOpen = !faqItems.value[index].isOpen;
};

const buttonTextToggle = computed(() => {
    return showAll.value ? 'Mostrar menos FAQs' : 'Mostrar más FAQs'
})

const curtainHeight = ref(0);

onMounted(() => {
    curtainHeight.value = (accordion.value.offsetHeight / faqItems.value.length) * 3 + 10;
})

const showMore = () => {
    showAll.value = !showAll.value;
};
</script>

<style scoped>
.faq-container {
    max-width: 1440px;
    margin: 100px 0px;
    background: #ffffff;
}

.top-section {
    padding: 0 104px;
    background: url('../assets/icons/web.png') 100% 0 /auto 100% no-repeat, linear-gradient(135deg, #F5FFF9 0%, #FEF8EB 47%, #F5FFF5 100%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 80px;
}

@media (width < 1439px) {
    .top-section {
        flex-direction: column;
        margin-bottom: 20px;
        padding: 0 10px;
        background: url('../assets/icons/web-mobile.png') 100% 0 /auto 100% no-repeat,
            linear-gradient(135deg, #F5FFF9 0%, #FEF8EB 47%, #F5FFF5 100%);
    }
}

.left-content {
    flex: 1;
    margin-right: 70px;

    h1 {
        color: #1C1C1C;
        margin-bottom: 32px;
        line-height: 120%;
        font-family: Satoshi;
        font-weight: bold;
        font-size: 48px;
    }

    p {
        color: #3D3D3D;
        line-height: 150%;
        font-family: Satoshi;
        font-size: 18px;

    }

    @media (width <=768px) {
        margin-right: 0px;
        margin-top: 40px;
        padding: 0px 16px;

        h1 {
            color: #1C1C1C;
            text-align: center;
            margin-bottom: 20px;
            line-height: 120%;
            font-family: Satoshi;
            font-weight: bold;
            font-size: 24px;
        }

        p {
            text-align: center;
            color: #3D3D3D;
            line-height: 150%;
            font-family: Satoshi;
            font-size: 16px;

        }
    }

    @media (769px <=width < 1439px) {
        padding: 0px 104px;
        margin-right: 0px;
        margin-top: 56px;

        h1 {
            color: #1C1C1C;
            text-align: center;
            margin-bottom: 24px;
            line-height: 120%;
            font-family: Satoshi;
            font-weight: bold;
            font-size: 40px;
        }

        p {
            text-align: center;
            color: #3D3D3D;
            line-height: 150%;
            font-family: Satoshi;
            font-size: 18px;

        }
    }
}

.right-content img {
    width: auto;
    height: 307px;
}

.accordionSectionWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.accordion {
    width: 100%;
    max-width: 700px;
    overflow-y: hidden;
    transition: max-height 0.3s ease;
    position: relative;
}

.accordion.show-all::after {
    display: none;
}

.accordion::after {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: v-bind(curtainHeight + 'px');
    background: linear-gradient(to bottom, rgb(255 255 255 / 50%) 0%, rgb(255 255 255 / 80%) 100%);
}

.accordion-item {
    margin-bottom: 10px;
    border-bottom: 1px solid #F6F6F6;

    p {
        font-size: 18px;
        margin: 0;
        padding: 0 26.5px;
        color: #3D3D3D;
    }
}

.item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 24px 29.5px;

    h2 {
        font-size: 18px;
        font-family: Satoshi;
        margin: 0;
        color: #1C1C1C;
        /* transition: color 0.3s ease; */
        flex-grow: 1;
        font-weight: bold;
    }
}

.accordion-item h2.active {
    color: #2A74E3;
    font-weight: bold;
}

.accordion-item button {
    background: none;
    border: none;
    color: #1C1C1C;
    cursor: pointer;
    font-size: 18px;
    transition: color 0.3s ease;
    margin-left: 10px;
}

.accordion-item button.active {
    color: #2A74E3;
}

.show-more-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    /* remove on dev*/
}

.show-more {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 10px 20px;
    border: 1px solid #E7E7E7;
    cursor: pointer;
    color: #3D3D3D;
    font-size: 16px;
    font-family: Satoshi;
    font-weight: bold;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}
</style>