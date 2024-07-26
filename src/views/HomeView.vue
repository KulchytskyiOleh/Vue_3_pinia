<template>
  <main>
    <todoForm />
    <todosList />
  </main>
</template>

<script setup>
import todosList from "../components/todosList.vue";
import todoForm from "../components/todoForm.vue";
</script>

<style>
main {
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 550px;
  height: auto;
  margin: 70px auto;
  padding: 50px;
  background: #ffffffdb;
  border-radius: 15px;
}
</style>