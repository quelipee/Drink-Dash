<template>
  <div>
    <form @submit.prevent="login" method="post">
      <ion-card>
        <ion-card-header>
          <ion-title>
            <h2 class="text-center text-gray-500 font-semibold">Login</h2>
          </ion-title>
        </ion-card-header>
          <ion-card-content>
            <ion-input name="user.email" type="email" v-model="user.email"
                       placeholder="example@gmail.com"/>
            <ion-input name="user.password" type="password" v-model="user.password"
                       placeholder="password" autocomplete="off"/>
          </ion-card-content>
          <div class="rounded-md shadow-md p-3 mb-3 bg-red-300" v-if="errorLogin">
            <p class="text-sm text-red-700">{{ errorLogin }}</p>
          </div>
          <ion-button type="submit" color="danger" expand="full">Login</ion-button>
      </ion-card>
      <InputContainer/>
    </form>
  </div>
</template>

<script>
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonInput, IonTitle, loadingController} from "@ionic/vue";
import InputContainer from "@/components/RegisterComponents/InputContainer.vue";
import {useRouter} from "vue-router";
import postAPILogin from "../../../services/postAPILogin";
import { ref } from "vue";
import axios from "axios";
export default {
  name: "InputLoginContainer.vue",
  components:{
    IonTitle,
    InputContainer,
    IonCard, IonButton, IonCardContent, IonInput,
    IonCardHeader
  },
  setup(){
    const router = useRouter()
    const errorLogin = ref(null);
    const user = ref({
      email : '',
      password : '',
    });

    const showLoading = async () =>{
      const loading = await loadingController.create({
        message:'carregando ...',
        duration: 1500
      });

      await loading.present();
    }

    const clearError = () =>{
      errorLogin.value = null
    }

    const getToken = async () =>{
      await axios.get('http://192.168.1.114:8000/sanctum/csrf-cookie');
    }

    const login = async () =>{
      await getToken();
      await postAPILogin(user.value.email,user.value.password).then(() =>{
        showLoading();
        router.push({name: 'tab1'});
      }).catch(error =>{
        errorLogin.value = error.response.data.message;
        setTimeout(() =>{
          clearError();
        },5000)
        console.log(error)
      })
    }

    return{
      errorLogin,
      user,
      login,
      showLoading
    }
  },
}
</script>

<style scoped>

</style>