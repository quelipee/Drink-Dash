<template>
  <ion-page :menu-enabled="false">
    <ion-content class="ion-padding">
        <LogoContainer/>
        <InputLoginContainer/>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage,IonContent,} from "@ionic/vue";
import InputLoginContainer from "@/components/loginComponents/InputLoginContainer.vue";
import LogoContainer from "@/components/loginComponents/LogoContainer.vue";
export default {
  name: "LoginPage.vue",
  components: { LogoContainer,InputLoginContainer,IonPage,IonContent },
}
</script>

<style>
</style>