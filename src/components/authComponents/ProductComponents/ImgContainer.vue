<template>

  <div class="rounded-xl p-2 bg-cover bg-no-repeat bg-center bg-opacity-70"
       style="background-image: url('public/img/wallpaper123.png');">
    <ion-buttons slot="start">
      <button @click="$router.push({name:'tab1'})">
        <ion-icon :icon="arrowBack" class="text-2xl" />
      </button>
    </ion-buttons>
    <ion-img :src="variant" style="height: 200px;"/>

  </div>

</template>

<script>
import { IonImg, IonButtons, IonIcon} from "@ionic/vue";
import {arrowBack} from "ionicons/icons";

export default {
  name: "ImgContainer.vue",
  components:{IonImg,IonButtons,IonIcon},
  props:{
    variant:{
      type:String,
      required:true
    }
  },
  data(){
    return{
      arrowBack:arrowBack
    }
  }
}
</script>

<style scoped>

</style>