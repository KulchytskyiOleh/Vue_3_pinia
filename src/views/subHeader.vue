<template>
  <div class="subHeaderWrapper">
    <SlideGroup />
    <v-btn class="buyButton" append-icon="mdi-arrow-right">Encarga tu Trabajo</v-btn>
  </div>
</template>

<script setup>
import SlideGroup from '../components/SlideGroup.vue'
</script>

<style>
.subHeaderWrapper {
  display: flex;
  gap: 20px;

  .buyButton {
    padding: 5px 10px;
    height: 36px;
  }
}
</style>