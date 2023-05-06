<template>
  <div class="p-10 flex items-center justify-center">
    <ion-img
        class="sm:h-48 md:h-80"
        :src="src_img"/>
  </div>
</template>

<script>
import {IonImg} from "@ionic/vue";
export default {
  name: "LogoContainer.vue",
  components:{
    IonImg
  },
  data(){
    return{
      src_img: "../public/img/onebebidas.png",
    }
  }
}
</script>

<style scoped>
</style>