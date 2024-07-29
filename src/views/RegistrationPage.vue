<template>
    <div class="registrationForm">
        <v-card class="mx-auto px-6 py-8" width="344">
            <v-form v-model="form" @submit.prevent="onSubmit">
                <v-text-field v-model="userName" :readonly="loading" :rules="[required]" class="mb-2" label="User name"
                    clearable />
                <v-text-field v-model="userEmail" type="email" :readonly="loading" :rules="[required]" class="mb-2"
                    label="Email" clearable />
                <v-text-field v-model="userPassword" :readonly="loading" :rules="[required]" label="Password"
                    placeholder="Enter your password" clearable />
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
import { ref } from 'vue'

let form = ref(false);
let userName = ref(null);
let userEmail = ref(null);
let userPassword = ref(null);
let loading = ref(false);

function onSubmit() {
    if (!this.form) return

    this.loading = true
    // зробити запит на всіх юзерів і пошукати чи немає співпадінь по імені та імейлу
    setTimeout(() => (this.loading = false), 2000)
}



function required(v) {
    return !!v || 'Field is required'
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