<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ProfileContainer/>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage,IonContent } from '@ionic/vue';
import ProfileContainer from "@/components/authComponents/ProfileContainer.vue";
export default {
  name: 'Tab2Page.vue',
  components:{ ProfileContainer,IonPage,IonContent }
}
</script>
