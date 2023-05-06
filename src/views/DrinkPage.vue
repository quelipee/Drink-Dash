<template>
  <ion-page>
<!--      <ion-toolbar>-->
<!--        <ion-buttons slot="start">-->
<!--          <ion-back-button defaultHref="/" />-->
<!--        </ion-buttons>-->
<!--      </ion-toolbar>-->
    <ion-content>
      <div v-if="loading">
        <ImgContainer :variant="bebida.img_product ? bebida.img_product : 'default'"/>
        <ProductContainer :variant="bebida"/>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue";
import { onMounted, ref } from "vue";
import getAPI from "../../services/getAPI.js";
import { useRoute } from "vue-router";
import ImgContainer from "@/components/authComponents/ProductComponents/ImgContainer.vue";
import ProductContainer from "@/components/authComponents/ProductComponents/ProductContainer.vue";
export default {
  name: "DrinkPage.vue",
  components:{ IonPage,IonContent,ImgContainer,ProductContainer },
  setup(){
    const loading = ref(false)
    const route = useRoute();
    const bebida = ref([])
    onMounted(async() =>{
      await getAPI(`product/${route.params.id}`).then(response =>{
        bebida.value = response;
        loading.value = true;
      });
    });

    return{
      bebida,
      loading
    }
  },
}
</script>

<style scoped>

</style>