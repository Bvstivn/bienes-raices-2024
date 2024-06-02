<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3">
      Nueva Propiedad
    </v-card-title>
    <v-card-subtitle class="text-h5"> Rellena el formulario </v-card-subtitle>

    <v-form class="mt-10">
      <v-text-field
        class="mb-5"
        label="Titulo Propiedad"
        v-model="titulo.value.value"
        :error-messages="titulo.errorMessage.value"
      />
      <v-file-input
        accept="image/jpg"
        label="Foto de la propiedad"
        prepend-icon="mdi-camera"
        class="mb-5"
        v-model="imagen.value.value"
        :error-messages="imagen.errorMessage.value"
        @change="uploadImage"
      />
      <v-text-field
        class="mb-5"
        label="precio"
        type="number"
        v-model="precio.value.value"
        :error-messages="precio.errorMessage.value"
      />

      <div v-if="image" class="my-5">
        <p class="font-weight-bold">Imagen Propiedad:</p>
        <img class="w-50" :src="image" />
      </div>

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            label="Habitaciones"
            class="mb-5"
            :items="items"
            v-model="habitaciones.value.value"
            :error-messages="habitaciones.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            label="WC"
            class="mb-5"
            :items="items"
            v-model="wc.value.value"
            :error-messages="wc.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            label="Estacionamientos"
            class="mb-5"
            :items="items"
            v-model="estacionamiento.value.value"
            :error-messages="estacionamiento.errorMessage.value"
          />
        </v-col>
      </v-row>

      <v-textarea
        class="mb-5"
        label="Descripcion"
        v-model="descripcion.value.value"
        :error-messages="descripcion.errorMessage.value"
      >
      </v-textarea>

      <v-checkbox
        label="Alberca"
        v-model="alberca.value.value"
        :error-messages="alberca.errorMessage.value"
      />

      <h2 class="font-weight-bold text-center my-5">Ubicacion</h2>

      <div class="pb-10">
        <div style="height: 600px">
          <LMap
            v-model:zoom="zoom"
            :center="center"
            :use-global-leaflet="false"
          >
          <LMarker :lat-lng="center" draggable @moveend="pin"/>
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></LTileLayer>
          </LMap>
        </div>
      </div>

      <v-btn @click="submit" block color="pink-accent-3"
        >Agregar Propiedad</v-btn
      >
    </v-form>
  </v-card>
</template>

<script setup>
//VeeValidate
import { useForm, useField } from "vee-validate";
//Firestore
import { collection, addDoc } from "firebase/firestore";
import { useFirestore } from "vuefire";
//VueRouter
import { useRouter } from "vue-router";
//Validations
import { validationSchema, imageSchema } from "@/validation/propiedadSchema";
//Composables
import useImage from "@/composables/useImage";
import useLocationMap from "@/composables/useLocationMap";
//Leaflet
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

const { uploadImage, image, url } = useImage();
const { zoom, center, pin } = useLocationMap();



const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema,
  },
});

const titulo = useField("tiotulo");
const imagen = useField("imagen");
const precio = useField("precio");
const habitaciones = useField("habitaciones");
const wc = useField("wc");
const estacionamiento = useField("estacionamiento");
const descripcion = useField("descripcion");
const alberca = useField("alberca", null, {
  initialValue: false,
});

const db = useFirestore();
const router = useRouter();

const submit = handleSubmit(async (values) => {
  const { imagen, ...propiedad } = values;

  const docRef = await addDoc(collection(db, "propiedades"), {
    ...propiedad,
    imagen: url.value,
    ubicacion: center.value
  });
  if (docRef.id) {
    router.push({ name: "admin-propiedades" });
  }
});

const items = [1, 2, 3, 4, 5];
</script>
