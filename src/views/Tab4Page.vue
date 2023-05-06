<template>
  <ion-page>
    <ion-content  class="ion-padding">
      <PurchasesHistoricContainer/>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage,IonContent } from '@ionic/vue';
import PurchasesHistoricContainer from "@/components/authComponents/PurchasesHistoricContainer.vue";
export default {
  name: 'Tab4Page.vue',
  components:{ PurchasesHistoricContainer, IonPage,IonContent }
}
</script>
