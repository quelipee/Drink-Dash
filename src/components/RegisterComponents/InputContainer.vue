<template>
  <div class="flex items-center justify-center">
    <ion-row>
      <p id="present-alert" style="font-size: 12px" class="text-gray-700 hover:underline hover:text-blue-500">Registrar-se</p>
      <ion-alert
          trigger="present-alert"
          header="Crie sua conta!!"
          :buttons="alertButtons"
          :inputs="alertInputs"
      ></ion-alert>
    </ion-row>
  </div>
</template>

<script>
  import axios from "axios";
  import {IonRow, IonAlert, loadingController} from "@ionic/vue";
  import {useRouter} from "vue-router";
import postAPILogin from '../../../services/postAPILogin';

  export default {
    name: "InputContainer.vue",
    components:{ IonRow,IonAlert },
    setup() {

      const showLoading = async () =>{
        const loading = await loadingController.create({
          message:'carregando ...',
          duration: 3000
        });

        await loading.present();
      }

      const route = useRouter();

      const alertButtons = [
          {
            text: 'Registrar',
            handler: (data) => {
              axios.post('http://127.0.0.1:8000/api/register',{
                name: data['name'],
                email: data['email'],
                password: data['password'],
                address_delivery: data['address_delivery'],
                address_billing: data['address_billing'],
                phone_number: data['phone'],
              }).then(() =>{
                login(data.email,data.password);
              }).catch(error =>{
                console.log(error.message)
              });
            },
          },
          ];
      const alertInputs = [
        {
          name:'name',
          type: 'text',
          placeholder: 'Name',
          modelValue: name,
          value: ''
        },
        {
          name:'email',
          type: 'email',
          placeholder: 'Example@gmail.com',
          value: ''
        },
        {
          name:'password',
          type: 'password',
          placeholder: 'password',
          value: ''
        },
        {
          name:'phone',
          type: 'number',
          placeholder: 'Telefone/celular',
          value: ''
        },
        {
          name:'address_delivery',
          type: 'text',
          placeholder: 'Endereço de entrega',
          value: ''
        },
        {
          name:'address_billing',
          type: 'text',
          placeholder: 'Endereço de cobrança',
          value: ''
        }
      ];

      const login = (email,password) => {
        postAPILogin(email,password).then(() =>{
          showLoading();
          route.push({name:'tab1'})
        }).catch(error =>{
          console.log(error)
        });
      };

      return { alertInputs,alertButtons,route,login};
    },
  }
</script>

<style scoped>

</style>