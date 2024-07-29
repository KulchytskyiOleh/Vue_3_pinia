<template>
    <div class="LoginForm">
        <v-card class="mx-auto px-6 py-8" width="344">
            <v-form v-model="form" @submit.prevent="onSubmit">
                <v-text-field v-model="userName" :readonly="loading" :rules="[required]" class="mb-5" label="User name"
                    clearable />
                <v-text-field v-model="userPassword" :readonly="loading" class="mb-5" :rules="[required]"
                    label="Password" placeholder="Enter your password" clearable />
                <!-- <br> -->
                <div class="loginFormBtnWrapper">
                    <RouterLink class="registrationLink" to="/registration">Registration</RouterLink>
                    <v-btn :disabled="!form" :loading="loading" color="success" size="large" type="submit"
                        variant="elevated">
                        Sign In
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
let userPassword = ref(null);
let loading = ref(false);

function onSubmit() {
    if (!this.form) return

    this.loading = true

    setTimeout(() => (this.loading = false), 2000)
}



function required(v) {
    return !!v || 'Field is required'
}

</script>
<style>
.LoginForm {
    /* margin-top: 100px; */
    display: flex;

    /* background-color: silver; */
    /* width: 250px;
    height: 250px;*/
    .loginFormBtnWrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &.registrationLink {
            background: red !important;
        }
    }

}
</style>