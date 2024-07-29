<template>
    <form class="formWrapper">
        <input type="text" placeholder="Add your new todo..." v-model.trim="todoText">
        <button class="addToDo" @click.prevent="addNewTodoItem">+</button>
    </form>
</template>

<script setup>

import { ref } from 'vue'
import { useTodoStore } from '../stores/todosStore'

let todoText = ref('');

const todosStore = useTodoStore();

const addNewTodoItem = () => {
    let toDoObj = {
        id: Math.random().toString(16).slice(2),
        text: todoText.value
    }
    todoText.value = '';
    todosStore.addTodo(toDoObj);
}

</script>

<style>
.formWrapper {
    display: flex;
    gap: 30px;
    padding: 10px 0;
    justify-content: center;

    & input {
        width: 60%;
        height: 40px;
        border: none;
        background: #fff;
        border-radius: 5px;
        font-size: 15px;
        padding: 0 10px;
        vertical-align: middle;
    }

    .addToDo {
        width: 12%;
        height: 40px;
        border: none;
        border-radius: 5px;
        font-size: 25px;
        font-weight: 700;
        color: #fff;
        cursor: pointer;
        background-color: #8b5ec6;
        vertical-align: middle;
    }
}
</style>