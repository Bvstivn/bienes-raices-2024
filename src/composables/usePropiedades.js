//Vue
import { computed, ref } from "vue";
//Firebase
import { collection, doc, deleteDoc } from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";
//Vuefire
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";

export default function usePropiedades() {

  //Data
  const alberca = ref();

  //Firestore
  const storage = useFirebaseStorage();
  const db = useFirestore();
  const propiedadesCollection = useCollection(collection(db), "propiedades");

  //Computed
  const propiedadesFiltradas = computed(() => alberca.value ? propiedadesCollection.value.filter(propiedad => propiedad.alberca) : propiedadesCollection.value);

  //Methods
  async function deleteItem(id, urlImage){
    if(confirm('Eliminar?')){
      const docRef = doc(db, 'propiedades', id);
      const imageRef = storageRef(storage, urlImage); 

      await Promise.all([
        deleteDoc(docRef),
        deleteObject(imageRef)
      ]);
    }
  }

  return {
    propiedadesCollection,
    propiedadesFiltradas,
    alberca,
    deleteItem
  };
}
