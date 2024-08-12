<template>
    <div class="content">
        <section v-for="(item, index) in items" :key="index" :id="item" class="content-section">
            <h2>{{ item }}</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula dapibus augue, vel
                fringilla turpis volutpat eget. Praesent nec mollis est, sed condimentum dolor. Vestibulum ante
                ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam nec risus quis nisl
                hendrerit varius. Vivamus gravida metus id vehicula pulvinar. Morbi viverra est a metus pharetra
                cursus. Donec sed quam sit amet velit euismod pretium. Sed pharetra dignissim odio, in pulvinar
                justo varius non. Nullam sollicitudin libero a massa aliquet, a bibendum velit pellentesque.
            </p>
            <p>
                Integer fermentum, nunc ut bibendum luctus, neque purus commodo ex, ut vestibulum eros tortor ac
                felis. Suspendisse potenti. Aenean tincidunt tempor velit, a mollis erat tempor sed. Integer
                imperdiet enim non diam ultricies, at fermentum urna tincidunt. Proin vitae risus vitae ligula
                tincidunt vulputate in id ligula. Nulla facilisi. Vivamus sed pharetra sapien. Aenean sed felis
                ut nulla aliquam suscipit. Curabitur suscipit libero sit amet facilisis ultricies. Vivamus ac
                fringilla odio. Integer eget convallis elit, et iaculis ligula. Nam eu lectus id elit dictum
                bibendum. Mauris scelerisque lectus ac nisi suscipit gravida.
            </p>
            <p>
                Suspendisse potenti. Duis non malesuada justo. Nunc vel viverra nulla. Donec placerat interdum
                ligula non viverra. Integer in nulla eget ex ornare consequat. Phasellus faucibus venenatis est,
                et laoreet felis. Cras lacinia interdum ipsum, in scelerisque velit vestibulum non. Sed gravida
                urna orci, a sodales velit condimentum quis. Vestibulum posuere egestas justo ut suscipit. Donec
                in venenatis est. Curabitur auctor sapien non urna bibendum pretium.
            </p>
        </section>
    </div>
</template>

<script setup>
// import { defineProps } from 'vue'
// const props = defineProps({ items: Array });

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

</script>

<style scoped>
.content {
    margin-top: 20px;

    .content-section {
        margin-bottom: 50px;
    }
}
</style>
