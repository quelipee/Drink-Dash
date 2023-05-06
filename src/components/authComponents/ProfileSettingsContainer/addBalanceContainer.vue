<template>
  <button id="balance_open" class="flex items-center justify-center rounded-md bg-green-500 hover:bg-green-600 text-white p-1">
    <ion-icon :icon="add"/>
  </button>
  <ion-alert
      trigger="balance_open"
      header="Adicionar Saldo!!"
      :buttons="alertButtons"
      :inputs="alertInputs"
  ></ion-alert>
</template>

<script>
import {IonAlert} from "@ionic/vue";
import { IonIcon } from "@ionic/vue";
import { add } from 'ionicons/icons';
import {ref} from "vue";
import postAPI from "../../../../services/postAPI.js";
export default {
  name: "addBalanceContainer.vue",
  emits:['balanceUpdated'],
  components:{ IonIcon,IonAlert },
  setup(props, { emit }){

    const alertButtons = [
      {
        text: 'Adicionar',
        handler: (data) => {
          const payload = ref({
            deposit: data['deposit']
          });

          postAPI('deposit',payload.value).then((response)=>{
            emit("balanceUpdated", response.data.balance);
          }).catch(error =>{
            console.log(error.message)
          });
        },
      },
    ];

    const alertInputs = [
      {
        name:'deposit',
        type: 'number',
        placeholder: 'Adicionar saldo!!!',
        value: null
      },
    ];

    return{
      add,
      alertButtons,
      alertInputs
    }
  },
}
</script>

<style scoped>

</style>