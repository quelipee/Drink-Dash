<template>
<!--  <form action="">-->
    <ion-card>
      <ion-card-title>
        <h2 class="text-center font-semibold text-3xl">{{variant.name}}</h2>
      </ion-card-title>
      <ion-card-subtitle class="border-t-2 border-blue-500">
        <h5 class="text-center">Descrição</h5>
        <p class="text-gray-500 text-justify">{{variant.description}}</p>
      </ion-card-subtitle>
      <div class="flex justify-between items-center p-4 space-x-8">
        <h2 class="font-bold">{{formatPrice(variant.price)}}</h2>
        <ion-input type="number" placeholder="Quantidade"  @ionInput="limitQuantity" v-model="quantity" min="0" :max="variant.stock.available_quantity"/>
      </div>
      <div class="rounded-md shadow-md p-3 mb-3 bg-red-300" v-if="errorOrder">
        <p class="text-sm text-red-700">{{ errorOrder }}</p>
      </div>

      <div class="grid grid-cols-4">

        <div class="flex items-center justify-center space-x-2">
          <p class="font-semibold">Estoque:</p>
          <p class="bg-gray-300 rounded pt-1 px-2 pl-2">{{variant.stock.available_quantity}}</p>
        </div>

        <div class="flex items-center justify-center col-span-3">
          <ion-button class="space-x-2 min-w-max" color="danger" @click="comprar(quantity)">
            <p class="flex justify-start text-[11px]">
              Adicionar
            </p>
            <span class="whitespace-nowrap overflow-x-auto truncate">
              {{ v_total }}
            </span>
          </ion-button>
        </div>
      </div>
    </ion-card>

<!--  </form>-->
</template>

<script>
import {IonInput, IonCard, IonCardTitle, IonCardSubtitle, IonButton} from "@ionic/vue";
import {computed, onMounted, ref} from "vue";
import postAPI from "../../../../services/postAPI.js";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import axios from "axios";


export default {
  name: "ProductContainer.vue",
  components:{ IonCard, IonCardTitle,IonCardSubtitle,IonInput,IonButton},
  props:{
    variant:{
      type:Object,
      required:true
    }
  },
  setup(props){

    const limitQuantity =() =>{
      if (quantity.value > props.variant.stock.available_quantity) {
        quantity.value = props.variant.stock.available_quantity
      }
    }

    onMounted(() =>{
      // console.log(props.variant)
    });

    const v_total = computed(() =>{
      return formatPrice(props.variant.price * quantity.value);
    })

    const store = useStore();
    const route = useRoute();
    const router = useRouter()
    // order_product/{id} rota api
    const quantity = ref(0);
    const formatPrice = (price) => {
      return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);

    };
    const errorOrder = ref(null);

    const clearError = () =>{
      errorOrder.value = null
    }

    const getToken = async () =>{
      await axios.get('http://192.168.1.114:8000/sanctum/csrf-cookie');
    }
    const comprar = (data) =>{

      const payload = {
        qtd: data
      };

      postAPI(`order_product/${route.params.id}`, payload).then(() =>{
        getToken();
        store.dispatch('updateStock');
        store.dispatch('updateCompras');
        store.dispatch('updateBalance');
        router.replace({
          name: "tab3",
        })
      }).catch(error =>{
        errorOrder.value = error.response.data.message;
        setTimeout(() =>{
          clearError();
        },5000);
      })
    }

    return{
      formatPrice,
      quantity,
      comprar,
      errorOrder,
      v_total,
      limitQuantity
    }
  }
}
</script>

<style scoped>

</style>