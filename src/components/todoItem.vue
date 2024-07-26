<template>
    <div class="todoItemWrapper" v-if="todo">
        <p v-if="!isItemEdited" type="text" :class="isItemToggledDone ? 'todo-done' : ''">{{ inputValue }} </p>
        <input v-else v-model="inputValue" type="text">
        <div class="btnBlockWrapper">
            <button @click="toggleDone" class="btn btnDone">
                <img v-if="!isItemToggledDone" src="../assets/icons/done.svg" alt="done/undone">
                <img v-else src="../assets/icons/repeat.svg" alt="done/undone">
            </button>
            <button @click="editItem" class="btn btnEdit">
                <img v-if="!isItemEdited" src="../assets/icons/edit.svg" alt="edit/save">
                <img v-else src="../assets/icons/save.svg" alt="edit/save">
            </button>
            <button @click="deleteItem" class="btn btnDelete">
                <img src="../assets/icons/delete.svg" alt="delete">
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// const props = defineProps(['todo'])

const props = defineProps({
    todo: Object,
})

const emit = defineEmits(['todoDone', 'editToDoItem', 'deleteItem']);

onMounted(() => {
    inputValue.value = props.todo.text;
    isItemToggledDone.value = props.todo.done;
})

let inputValue = ref('');
let isItemToggledDone = ref(false);
let isItemEdited = ref(false);

function toggleDoneBtn() {
    return isItemToggledDone.value = !isItemToggledDone.value;
}

function toggleEditBtn() {
    return isItemEdited.value = !isItemEdited.value;
}

function toggleDone() {
    toggleDoneBtn();
    emit('todoDone', { ...props.todo, done: isItemToggledDone.value });
}

function editItem() {
    toggleEditBtn();
    if (props.todo.text !== inputValue.value && !isItemEdited.value) {
        let obj = { id: props.todo.id, text: inputValue.value };
        emit('editToDoItem', obj);
    }
}

function deleteItem() {
    emit('deleteToDo', props.todo.id);
}

</script>

<style>
.todoItemWrapper {
    display: flex;
    padding: 10px;
    gap: 10px;
    background: #fff;
    font-size: 18px;
    border-radius: 5px;
    font-family: sans-serif;
    width: 100%;
    justify-content: space-between;

    & input {
        border: none;
        outline: none;
    }

    .todo-done{
        text-decoration: line-through;
    }

    .btnBlockWrapper {
        display: flex;
        gap: 10px;

        .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            height: 32px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 700;
            color: #fff;

            & img {
                height: 22px;
                width: auto;
                color: #ffffff;
            }

            &.btnDone {
                background: #28a745;
            }

            &.btnEdit {
                background: #ebd316;
            }

            &.btnDelete {
                background: #dc3545;
            }
        }

    }
}
</style>