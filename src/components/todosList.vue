<template>
    <div class="todoListWrapper">
        <todoItem v-for="todo in todosStore.todos" :key="todo.id" :todo @todoDone="todoDone" @editToDoItem="editToDoItem"
            @deleteToDo="deleteToDo" />
    </div>
</template>

<script setup>
import todoItem from './todoItem.vue'
import { useTodoStore } from "../stores/todosStore";
import { ref, onMounted } from 'vue'
const todosStore = useTodoStore();

onMounted(async () => {
    // let dd = todosStore.get_Todos();
    // console.log(dd,'dddd');
    todosStore.get_Todos();
})


function todoDone(val) {
    if (val.id) todosStore.todoDoneToggle(val)
}

function editToDoItem(val) {
    if (val.id) todosStore.updateTodo(val)
}

function deleteToDo(id) {
    if (id) todosStore.deleteTodo(id);
}

</script>
<style>
.todoListWrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 50px 50px;
    overflow-y: auto;
    height: 350px;
}
</style>