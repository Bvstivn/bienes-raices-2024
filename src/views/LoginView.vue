<template>
    <v-card flat max-width="600" class="mx-auto my-10">
        <v-card-title class="text-h4 font-weight-bold" tag="h3">
            Iniciar Sesion
        </v-card-title>
        <v-card-subtitle class="text-h5">
            Inicia Sesion con tu cuenta
        </v-card-subtitle>

        <v-alert v-if="auth$.hasError" class="my-5" type="error" :title="auth$.errorMsg" text="Error"/>

        <v-form class="mt-5">
            <v-text-field
                type="email"
                label="Email"
                bg-color="blue-accent-4 mb-3"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
            />

            <v-text-field
                type="password"
                label="Password"
                bg-color="blue-accent-4 mb-3"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
            />

            <v-btn block bg-color="pink-accent-3" @click="submit">
                Iniciar Sesión
            </v-btn>
        </v-form>
    </v-card>
</template>

<script setup>
//VeeValidate
import { useForm, useField } from "vee-validate";
//Stores
import { useAuthStore } from '../stores/auth';
//Validations
import { loginSchema as validationSchema } from "../validation/loginSchema";

//Validations
const { handleSubmit } = useForm({ validationSchema });

//Stores
const auth$ = useAuthStore();

const email = useField('email');
const password = useField('password');

//Methods
const submit = handleSubmit((values) => {
    auth$.login(values);
});
</script>