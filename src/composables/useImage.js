//Vue
import { computed } from "vue";
//Firebase
import { ref as storageRef } from "firebase/storage";
//VueFire
import { useFirebaseStorage, useStorageFile } from "vuefire";
//Uid
import { uid } from 'uid';

export default function useImage(){
    
    const storage = useFirebaseStorage();
    const storageRefPath = storageRef(storage, `/propiedades/${uid()}.jpg`);

    const image = computed(() => url.value ? url.value : null);

    const {
        url,
        upload
    } = useStorageFile(storageRefPath);

    function uploadImage(e){
        const data = e.target.files[0];
        if(data){
            upload(data);
        }
    }

    return{
        url,
        uploadImage,
        image
    }
}