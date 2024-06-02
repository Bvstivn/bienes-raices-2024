<template>
    <h1 class="text-center text-h3 font-wight-bold my-5">Vue Bienes Raices</h1>

    <v-card flat class="py-10">
        <v-card-title class="text-h5">
            Búsqueda
            <v-checkbox label="Alberca" v-model="alberca"/>
        </v-card-title>
        <v-row>
            <Propiedad v-for="propiedad in propiedadesFiltradas" :key="propiedad.id" :propiedad="propiedad" :price="priceProperty(propiedad.precio)"/>
        </v-row>
    </v-card>
</template>

<script setup>
//Composables
import usePropiedades from "../composables/usePropiedades";
//Helpers
import { priceProperty } from '@/helpers/index';
//Components
import Propiedad from "@/components/Propiedad.vue";

//Composables
const { alberca, propiedadesFiltradas } = usePropiedades();
</script>