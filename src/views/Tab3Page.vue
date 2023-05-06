<template>
  <ion-page>
    <ion-content class="ion-padding">
       <OrderContainer/>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage,IonContent } from '@ionic/vue';
import OrderContainer from "@/components/authComponents/OrderContainer.vue";
export default {
  name: 'Tab3Page.vue',
  components:{ IonPage,IonContent,OrderContainer }
}
</script>
