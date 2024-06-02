//Pinia
import { defineStore } from "pinia";
//Vue
import { ref, computed, onMounted } from "vue";
//Firebase
import { useFirebaseAuth } from "vuefire";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
//VueRouter
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const auth = useFirebaseAuth();
  const router = useRouter();

  const errorMsg = ref('');
  const authUser = ref(null);

  const errorCodes = {
    'auth/user-not-found' : 'Usuario no encontrado',
    'auth/wrong-password' : 'El password es incorrecto'
  }

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        console.log(user);
      }
    });
  });

  const login = ({email, password}) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authUser.value = user;
        router.push({name: 'admin-propiedades'});
      })
      .catch((error) => errorMsg.value = errorCodes[error.code]);
  };

  const logout = () => {
    signOut(auth)
    .then(() => {
      authUser.value = null;
      router.push({name: 'login'});
    })
    .catch(error => console.log(error));
  }

  const hasError = computed(() => errorMsg.value);

  const isAuth = computed(() => authUser.value);

  return {
    login,
    logout,
    hasError,
    errorMsg,
    isAuth
  };
});
