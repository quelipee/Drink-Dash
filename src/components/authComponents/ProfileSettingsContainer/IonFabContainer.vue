<template>
<div>
  <ion-fab vertical="bottom" horizontal="end">
    <ion-fab-button size="small">
      <ion-icon :icon="checkmark"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</div>
</template>

<script>
import {IonIcon} from "@ionic/vue";
import { checkmark } from 'ionicons/icons';
import { IonFab,IonFabButton} from "@ionic/vue";
export default {
  name: "IonFabContainer.vue",
  components: { IonFab,IonFabButton,IonIcon },
  setup(){
    const adas = ()=>{
      console.log('eta');
    }
    return{
      checkmark,
      adas,
    }
  }
}
</script>

<style scoped>

</style>