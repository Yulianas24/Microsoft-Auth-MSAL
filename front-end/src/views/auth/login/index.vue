<template>
  <h1 class="font-semibold text-lg">Login Page</h1>
  <form action="" @submit.prevent="login">
    <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email address</label>
        <input v-model="formData.email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@company.com" required>
    </div>
    <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
        <input v-model="formData.password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required>
    </div>
    <ButtonPrimary :type="'button'" @click="msalLogin()">
      Login Microsoft
    </ButtonPrimary>
    <ButtonPrimary :type="'submit'" class="ml-3">
      Login
    </ButtonPrimary>
    <ButtonDanger @click="$router.push('/register')" class="ml-3">
      Register
    </ButtonDanger>
  </form>

</template>

<script>
  import msalInstance from '@/helper/msal.js';
  import { useAuthStore } from "@/stores/auth.store.js"

  export default {
    data() {
      return {
        authStore: useAuthStore(),
        formData: {
          email: "",
          password: "",
        }
      }
    },
    methods: {
      login() {
        this.authStore.login(this.formData)
      },
      async msalLogin() {
        try {
          // call msal popup login
          const loginResponse = await msalInstance.loginPopup()
          // post response to pinia store 
          this.authStore.msalLogin(loginResponse.account)
        } catch (err) {
          // handle error
        }
      }
    }
  }

</script>
