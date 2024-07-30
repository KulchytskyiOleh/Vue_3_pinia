<template>
    <div class="registrationForm">
        <v-card class="mx-auto px-6 py-8" width="344">
            <v-form v-model="form" @submit.prevent="onSubmit">
                <v-text-field v-model="userName" :readonly="loading" :rules="[validationRules(userName).required]"
                    class="mb-2" label="User name" clearable />
                <v-text-field v-model="userEmail" type="email" :readonly="loading"
                    :rules="[validationRules(userEmail).email]" class="mb-2" label="Email" clearable />
                <v-text-field v-model="userPassword" :readonly="loading"
                    :rules="[validationRules(userPassword).password]" label="Password" placeholder="Enter your password"
                    clearable :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword" />
                <div class="registrationFormBtnWrapper">
                    <v-btn :disabled="!form" :loading="loading" color="success" size="large" type="submit"
                        variant="elevated">
                        Create
                    </v-btn>
                </div>
            </v-form>
        </v-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import validationRules from '../helpers/validationRules'
import idGenerator from '../helpers/idGenerator'

import { useUsersStore } from "../stores/userStore";
const userStore = useUsersStore();

onMounted(() => {
    userStore.getUsers();
    console.log(userStore.users, 'users');
})


let form = ref(false);
let userName = ref(null);
let userEmail = ref(null);
let userPassword = ref(null);
let loading = ref(false);
let showPassword = ref(false);

function onSubmit() {
    if (!form.value) return;
    loading.value = true;

    let newUser = {
        id: idGenerator(),
        email: userEmail.value,
        name: userName.value,
        password: userPassword.value
    }

    // console.log(newUser, 'newUser');

    userStore.createUser(newUser)
    // зробити запит на всіх юзерів і пошукати чи немає співпадінь по імені та імейлу
    setTimeout(() => (loading.value = false), 2000)
    userStore.getUsers();
    console.log(userStore.users, 'users');
}

</script>

<style>
.registrationForm {
    display: flex;

    .registrationFormBtnWrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

}
</style>