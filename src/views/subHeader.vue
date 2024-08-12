<template>
  <div class="sectionContentWrapper">
    <div class="subHeaderWrapper">
      <SlideGroup />
      <v-btn class="buyButton" append-icon="mdi-arrow-right">Encarga tu Trabajo</v-btn>
    </div>
    <ContentSections />
  </div>
</template>

<script setup>
import SlideGroup from '../components/SlideGroup.vue'
import ContentSections from '../views/ContentSections.vue'
</script>

<style>
.sectionContentWrapper {
  display: flex;
  flex-direction: column;
  margin-top: 150px;

  .subHeaderWrapper {
    display: flex;
    gap: 20px;

    .buyButton {
      padding: 5px 10px;
      height: 36px;
    }
  }
}
</style>