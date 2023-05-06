<template>
  <ion-page>
    <ion-content class="ion-padding">
      <DrinksContainer/>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage,IonContent } from '@ionic/vue';
import DrinksContainer from "@/components/authComponents/DrinksContainer.vue";
  export default {
    name: 'Tab1Page.vue',
    components: { IonPage, IonContent,DrinksContainer },
  }
</script>
<style scoped>

</style>
