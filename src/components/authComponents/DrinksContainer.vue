<template>

<div class="grid grid-cols-2 gap-2" >
  <div v-for="bebida in productsFilter()" :key="bebida.id">
    <ion-card class="border border-gray-300">
      <div @click="comprar(bebida)">
        <div class="p-2 bg-cover bg-no-repeat bg-center bg-opacity-70"
             style="background-image: url('src/assets/img/wallpaper123.png');">
          <ion-img :src="bebida.img_product" class="bg-cover bg-center h-24"/>
        </div>
        <div class="space-y-2 p-2">
          <ion-card-header class="p-1">
            <ion-card-title class="text-sm h-10">
              {{bebida.name}}
            </ion-card-title>
          </ion-card-header>
          <ion-card-content class="p-1 flex-col h-full">
            <p class="text-green-600">
              {{formatPrice(bebida.price)}}
            </p>
            <div class="flex items-center justify-between space-x-2">
              <p>Estoque</p>
              <p class="px-1 bg-gray-200 rounded-md">{{bebida.produtc_stock.available_quantity}}</p>
            </div>
          </ion-card-content>
        </div>
      </div>
    </ion-card>
  </div>
</div>

</template>

<script lang="js">
import getAPI from "../../../services/getAPI.js";
import {useRouter} from "vue-router";
import {
  IonCardContent,IonCard,
  IonCardHeader, IonCardTitle, IonImg
} from "@ionic/vue";
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
export default {
  name: "DrinksContainer.vue",
  props:{
    bebida : Object
  },
  components:{IonCardContent,IonCardHeader,IonCardTitle, IonImg,IonCard},

  setup() {
    const router = useRouter();
    const store = useStore();
    const bebidas = ref([]);

    const comprar = (bebida) => {
      router.replace({
        name: "drink",
        params: { id: bebida.id },
      });
    };

    const productsFilter = () => {
      if (store.state.products) {
        return Object.keys(store.state.products).filter(key => {
          return store.state.products[key].produtc_stock && store.state.products[key].produtc_stock.available_quantity > 0;
        }).map(key => {
          return store.state.products[key];
        });
      }
    };


    onMounted(async () => {
      getAPI('get_all_products').then(response =>{
        store.state.products = response.data;
      }).catch(error =>{
        console.log(error.message);
      });
    });

    const formatPrice = (price) => {
      return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);

    };

    return {  bebidas, comprar,formatPrice,productsFilter,store };
  },
}
</script>

<style scoped>
  .drink-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .drink-preco {
    width: 100px;
  }
</style>