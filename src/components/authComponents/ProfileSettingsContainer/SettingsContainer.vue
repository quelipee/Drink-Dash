<template>
  <button class="p-1 flex items-center justify-center" @click="presentActionSheet">
    <ion-icon :icon="apps"/>
  </button>
</template>

<script>
import { actionSheetController, loadingController } from "@ionic/vue";
import {useRouter} from "vue-router";
import {IonIcon} from "@ionic/vue";
import {ellipsisVerticalOutline,apps} from "ionicons/icons";
import {ref} from "vue";
import store from "@/store/index.js";
import getAPI from "../../../../services/getAPI.js";

export default {
  name: "SettingsContainer.vue",
  components:{ IonIcon },
  data(){
    return{
      apps: ellipsisVerticalOutline
    }
  },
  setup(){

    const ellipsis_vertical_outline = ref(apps)
    const route = useRouter();
    const presentActionSheet = async () =>{
      const actionSheet = await actionSheetController.create({
        header:'Opções',
        buttons:[
          {
            text: 'Sair',
            data: {
              action: 'logout',
            },
            handler: handleLogout,
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            data: {
              action: 'cancel',
            },
          },
        ],
      });
      await actionSheet.present();
    };

    const showLoading = async () =>{
      const loading = await loadingController.create({
        message:'carregando ...',
        duration: 1500
      });

      await loading.present();
    }

    const handleLogout = () =>{
      getAPI('logout').then(() =>{
        showLoading();
        localStorage.removeItem('token');
        store.dispatch('logoutUser');
        route.replace('/');
      }).catch(error =>{
        console.log(error);
      });
    }

    return { presentActionSheet,ellipsis_vertical_outline };
  }
}
</script>

<style scoped>

</style>