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

        <ion-card>

          <ion-card-header class="block font-bold" for="endereco">
            <p class="text-gray-600">Endereço de entrega:</p>
            <ion-card-subtitle>
              <p>{{ $store.state.user.address_delivery }}</p>
            </ion-card-subtitle>
          </ion-card-header>

          <ion-card-header class="block font-bold" for="endereco">
            <p class="text-gray-600">Endereço de pagamento:</p>
            <ion-card-subtitle>
              <p>{{ $store.state.user.address_billing }}</p>
            </ion-card-subtitle>
          </ion-card-header>

        </ion-card>

        <ion-card>
          <ion-card-header class="block font-bold" for="telefone">
            <p class="text-gray-600">Telefone:</p>
            <ion-card-subtitle>
              <p>{{ $store.state.user.phone_number }}</p></ion-card-subtitle>
          </ion-card-header>
        </ion-card>

      </div>
    </div>
    <IonFabContainer @click="setOpen(true)"/>

  <ion-modal :is-open="isOpen">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="setOpen(false)">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-card>
      <ion-card-title class="items-center flex justify-center">
        <h4 class="text-gray-500 font-semibold">Editar Perfil</h4>
      </ion-card-title>
      <ion-card-content>
        <ion-input class="text-gray-500" :value="$store.state.user.name"
                   placeholder="name" v-model="user.name"/>
        <ion-input class="text-gray-500" :value="$store.state.user.email"
                   placeholder="example@gmail.com" v-model="user.email"/>
        <ion-input class="text-gray-500" :value="$store.state.user.address_delivery"
                   placeholder="endereço de entrega" v-model="user.address_delivery"/>
        <ion-input class="text-gray-500" :value="$store.state.user.address_billing"
                   placeholder="endereço de pagamento" v-model="user.address_billing"/>
        <ion-input class="text-gray-500" :value="$store.state.user.phone_number"
                   placeholder="numero de telefone" v-model="user.phone_number"/>
        <ion-button @click="updateProfile(user)" color="danger" expand="full" size="small">salvar</ion-button>
      </ion-card-content>
    </ion-card>

  </ion-modal>
</template>

<script>
import {
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonInput, IonModal, loadingController, IonCardContent,IonHeader,
  IonToolbar,IonButtons,IonButton
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
    IonCardSubtitle,IonCardTitle,IonFabContainer,IonInput,IonModal,IonCardContent,
    IonToolbar,IonButtons,IonButton,IonHeader },
  data(){
    return{
      isOpen: false,
      name: '',
      email: '',
      address_delivery: '',
      address_billing: '',
      phone_number: '',
    }
  },
  methods:{
    setOpen(isOpen) {
      this.isOpen = isOpen;
    },
  },
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
        this.isOpen = false;
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