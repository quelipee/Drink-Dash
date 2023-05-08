<template>

      <div class="grid grid-cols-1 gap-4" v-if="loading">
        <div class="border-b border-gray-300 pb-4">
          <h2 class="text-lg text-gray-500 font-semi-bold mb-2">Buscar por nome:</h2>
          <div class="flex flex-col md:flex-row md:items-end gap-4">
            <ion-input v-model="search" aria-label="produto" type="text"
                       placeholder="Nome do produto ..." class=" flex-1"/>
          </div>
        </div>

        <div class="space-y-2">
          <p class="font-semibold text-gray-500">Histórico</p>
          <div class="space-y-12">
            <ion-card class="m-0 space-y-3 p-2"
                      v-for="order in getfilteredOrders(undefined, undefined)" :key="order.id">
              <p>{{formatDate(order.date_order)}}</p>
              <div class="flex items-center space-x-2">
                <ion-icon :icon="beer"/>
                <p class="text-sm text-gray-500">One Bebidas Delivery</p>
              </div>
              <ion-card-content class="space-y-2">
                <div class="flex items-center space-x-1">
                  <ion-icon :icon="checkmarkCircle"/>
                  <p>Pedido {{order.status_order.toLowerCase()}} * N°{{ order.products.order_id }}</p>
                </div>

                <div class="flex items-center space-x-2">
                  <p class="bg-gray-300 rounded pr-1 pl-1">{{order.products.amount}}</p> <p>{{order.products.name}}</p>
                </div>
              </ion-card-content>
            </ion-card>
          </div>
        </div>
      </div>
</template>

<script lang="js">
import {defineComponent, onMounted, ref} from "vue";
import {IonCardContent, IonIcon} from "@ionic/vue";
import { checkmarkCircle,beer } from 'ionicons/icons';
import {IonChip} from "@ionic/vue";
import { IonInput,IonCard } from "@ionic/vue";
import getAPI from "../../../services/getAPI.js";
import {useStore} from "vuex";

export default defineComponent({
  name: "OrderHistory",
  components: { IonCardContent,IonIcon,IonCard,IonInput },
  setup() {
    const store = useStore();
    const loading = ref(false);
    const search = ref('');

    onMounted(async ()=>{
      getAPI('get-list-order').then(response =>{
        store.state.compras = response;
        loading.value = true;
      }).catch(error =>{
        console.log(error)
      });
    });

    const getfilteredOrders = () =>{
      if (store.state.compras){
        const filteredOrders = store.state.compras.filter(order =>
            order.products.name.toLowerCase().includes(search.value.toLowerCase()));

        return filteredOrders ? filteredOrders.reverse() : [];
      }
      return store.state.compras;
    }


    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    };

    const formatPrice = (price) => {
      return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);
    };

    return {
      formatDate,
      formatPrice,
      loading,
      IonChip:IonChip,
      store,
      search,
      getfilteredOrders,
      checkmarkCircle,beer
    };
  },
});
</script>

<style scoped>
/* estilo personalizado para a lista de itens */
ion-item {
  --border-color: transparent;
  --inner-border-width: 1px;
  --inner-border-color: #e5e7eb;
  --background: white;
  --padding-top: 1rem;
  --padding-end: 1rem;
  --padding-bottom: 1rem;
  --padding-start: 1rem;
  border-radius: 0.5rem;
}

/* estilo personalizado para a miniatura de produto */
ion-thumbnail img {
  object-fit: cover;
  width: 3rem;
  height: 3rem;
  border-radius: 0.25rem;
}

</style>
