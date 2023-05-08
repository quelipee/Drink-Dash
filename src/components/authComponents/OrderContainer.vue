<template v-if="loading">

  <div class="mb-8" v-for="compra in comprasfilter()" :key="compra.id">
    <ion-card class="m-0 space-y-3 p-2">
      <p>{{ formatDate(compra.date_order) }}</p>

      <div class="flex items-center space-x-2">
        <ion-icon :icon="beer"/>
        <p class="text-sm text-gray-500">One Bebidas Delivery</p>
      </div>
      <ion-card-content class="space-y-2">
        <div class="flex items-center space-x-1">
          <p class="flex items-center">
            <ion-icon class=" mr-1 h-6" :icon="refreshCircleOutline"/>
            Pedido {{ compra.status_order.toLowerCase() }} * N°{{ compra.products.order_id }}</p>
        </div>

        <div class="flex items-center space-x-2">
          <p class="bg-gray-300 rounded pr-1 pl-1">{{ compra.products.amount }}</p>
          <p>{{ compra.products.name }}</p>
        </div>
        <div class="flex items-center space-x-1">
          <p class="font-semibold">Valor Total:</p>
          <p>{{ formatPrice(compra.products.price * compra.products.amount) }}</p>
        </div>
      </ion-card-content>
    </ion-card>
    <ion-card class="flex items-center m-0 border-t border-gray-200">
      <ion-button @click="cancel(compra)"
                  class="w-full font-semibold text-red-500" expand="full" size="small" fill="clear">
        cancelar
      </ion-button>
      <ion-button @click="payment(compra)"
                  class="w-full font-semibold text-red-500" expand="full" size="small" fill="clear">
        pagar
      </ion-button>
    </ion-card>
  </div>
</template>

<script lang="js">

import { alertController,IonChip,IonIcon,loadingController} from "@ionic/vue";
import { IonButton,IonCard,IonCardContent } from "@ionic/vue";

import postAPI from "../../../services/postAPI.js";
import { onMounted, ref} from "vue";
import getAPI from "../../../services/getAPI.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {beer, refreshCircleOutline} from "ionicons/icons";
export default {
  name: "OrderContainer.vue",
  components:{
    IonIcon,
    IonButton,
    IonCard,
    IonCardContent,
  },
  setup(){

    const loading = ref(false);
    const router = useRouter();
    const store = useStore();
    const error_payment = ref();

    onMounted(async ()=>{
      getAPI('get-list-order').then(response =>{
        store.state.compras = response
        loading.value = true
      }).catch(error =>{
        console.log(error.message);
      });
    });

    // TODO ALERT CASO NAO TENHA SALDO
    const presentAlert = async () => {
      const alert = await alertController.create({
        header: 'Aviso',
        subHeader: 'Mensagem Importante!!',
        message: error_payment.value,
        buttons: [{
          text: 'Ok',
          handler:()=>{
            error_payment.value = null
          }
        }],
      });

      await alert.present();
    };

    const comprasfilter = () => {
      if (Array.isArray(store.state.compras)) {
        const cart = store.state.compras.filter(compra => compra.status_order !== 'Concluído');
        return cart ? cart.reverse() : [];
      }
      return store.state.compras;
    }


    const showLoading = async () =>{
      const loading = await loadingController.create({
        message:'carregando ...',
        duration: 2000
      });

      await loading.present();
    }

    // buy_product/{id} router payment
    const payment = (compra) => {
      console.log(compra)
      postAPI(`buy_product/${compra.products.order_id}`).then(() =>{
        store.dispatch('updateCompras')
        store.dispatch('updateBalance')
        showLoading();
        router.replace({name:'tab4'})
      }).catch(error =>{
        error_payment.value = error.response.data.message;
        presentAlert();
      })
    }

    const cancel = (compra) =>{
      console.log(compra)
      postAPI(`order_product_cancel/${compra.products.order_id}`).then(() =>{
        store.dispatch('updateStock')
        showLoading();
        router.replace({name:'tab1'})
      }).catch(error =>{
        console.log(error);
      })
    }

    const product = ref({
      name: '',
      price:'',
      order_id:'',
    })
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
      product,
      payment,
      cancel,
      IonChip:IonChip,
      loading,
      error_payment,
      beer,
      refreshCircleOutline,
      comprasfilter
    }
  }
}
</script>

<style scoped>
  ion-skeleton-text {
    --border-radius: 9999px;
    --background: rgba(188, 0, 255, 0.065);
    --background-rgb: 188, 0, 255;
  }

</style>