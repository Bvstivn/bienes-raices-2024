<template>
  <v-card variant="elevated" max-width="1200" class="mx-auto">
    <v-layout>
      <v-app-bar color="blue-darken-1">
        <template v-slot:prepend>
          <v-btn :to="{ name: 'home' }"> Bienes Raices - Vue Fire </v-btn>
        </template>

        <template v-slot:append>
          <div v-if="isAuth">
            <v-btn :to="{ name: 'admin-propiedades' }">Admin</v-btn>
            <v-btn @click="auth$.logout">Cerrar Sesion</v-btn>
          </div>
          <div v-else>
            <v-btn :to="{ name: 'home' }"> Inicio </v-btn>
            <v-btn :to="{ name: 'login' }"> Iniciar Sesion </v-btn>
          </div>
        </template>
      </v-app-bar>

      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
//VueRouter
import { RouterView } from "vue-router";
//Pinia
import { storeToRefs } from "pinia";
//Stores
import { useAuthStore } from "./stores/auth";

//Stores
const auth$ = useAuthStore();
const { isAuth } = storeToRefs(auth$);

</script>

<style scoped></style>
