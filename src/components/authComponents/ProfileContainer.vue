<template>
    <div class="flex flex-col items-center pt-8" v-if="$store.state.user">
      <div class="relative mb-6">
        <img class="object-cover rounded-full shadow-lg" src="https://via.placeholder.com/150" alt="Foto de perfil">
        <div class="absolute bottom-0 right-0 bg-white rounded-full shadow-sm p-2">
          <SettingsContainer/>
        </div>
      </div>
      <div class="text-center">
        <ion-input class="text-xl text-gray-600 font-semibold" type="text"
                   v-model="user.name" :value="$store.state.user.name"/>
        <p class="text-gray-700">{{ $store.state.user.email }}</p>
        <p class="text-gray-700">{{ $store.state.user.telefone }}</p>
      </div>
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
        <ion-card>
          <ion-card-header class="space-y-2">
          <ion-card-title class="text-gray-500 font-semibold">Saldo</ion-card-title>
            <div class="flex justify-between items-center">
              <span class="whitespace-nowrap overflow-x-auto text-xl font-bold text-gray-600">{{ formatPrice(balance) }}</span>
              <AddBalanceContainer @balanceUpdated="balanceUp"/>
            </div>
          </ion-card-header>
        </ion-card>

        <ion-card class="mb-1 bg-gray-200">

          <ion-card-header class="block bg-gray-2500 text-gray-700 font-bold" for="endereco">
            Endereço de entrega:
            <ion-card-subtitle>
              <ion-input v-model="user.address_delivery"
                         :value="$store.state.user.address_delivery"/>
            </ion-card-subtitle>
          </ion-card-header>

          <ion-card-header class="block bg-gray-2500 text-gray-700 font-bold" for="endereco">
            Endereço de pagamento:
            <ion-card-subtitle>
              <ion-input v-model="user.address_billing" :value="$store.state.user.address_billing"/>
            </ion-card-subtitle>
          </ion-card-header>

        </ion-card>

        <ion-card class="mb-1 bg-gray-200">
          <ion-card-header class="block text-gray-700 font-bold mb-2" for="telefone">
            Telefone:
            <ion-card-subtitle>
              <ion-input v-model="user.phone_number" :value="$store.state.user.phone_number"/>
            </ion-card-subtitle>
          </ion-card-header>
        </ion-card>

      </div>
    </div>
    <IonFabContainer @click="updateProfile(user)"/>
</template>

<script>
import {IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonInput, loadingController
} from "@ionic/vue";
import { add } from 'ionicons/icons';
import SettingsContainer from "@/components/authComponents/ProfileSettingsContainer/SettingsContainer.vue";
import AddBalanceContainer from "@/components/authComponents/ProfileSettingsContainer/addBalanceContainer.vue";
import getAPI from "../../../services/getAPI.js";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import IonFabContainer from "@/components/authComponents/ProfileSettingsContainer/IonFabContainer.vue";
import postAPI from "../../../services/postAPI.js";



export default {
  name: "ProfileContainer.vue",
  components:{
    AddBalanceContainer,SettingsContainer,IonCard,IonCardHeader,
    IonCardSubtitle,IonCardTitle,IonFabContainer,IonInput },
  setup(){

    const user = ref({});

    const showLoading = async () =>{
      const loading = await loadingController.create({
        message:'carregando ...',
        duration: 1500
      });

      await loading.present();
    }

    const updateProfile = (user) =>{
      console.log(user)
      postAPI('editProfile',user).then(response =>{
        console.log(response);
        showLoading();
      }).catch(error =>{
        console.log(error);
      });
    }

    const store = useStore();
    const isLoading = ref(false);

    onMounted(async ()=>{
      getAPI('get-user').then((response) =>{
        store.commit('get_user',response.data)
        isLoading.value = true;
      });
    });


    const balanceUp = (data) =>{
      store.commit('balance_user', data);
    };

    const balance = computed(() =>{
      return store.state.user.balance.balance;
    });

    const formatPrice = (price) => {
      return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    };

    return{
      formatPrice,
      formatDate,
      balanceUp,
      isLoading,
      balance,
      user,
      updateProfile,
      add,
    }
  },
}

</script>

<style scoped>

</style>