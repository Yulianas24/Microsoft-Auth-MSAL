<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App" :name="name"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import msalInstance from './msal.js';

export default {
  name: 'App',
  data() {
    return {
      tokenRequest: {
        scopes: ["user.read"]
      },
      accessToken: "",
      name: ""
    } 
  },
  components: {
    HelloWorld
  },
  async mounted() {
    console.log(msalInstance);

    // initial setup for msal
    msalInstance.handleRedirectPromise().then(()=>{
      // Check if user signed in 
      const account = msalInstance.getActiveAccount();

      if(!account){
        // redirect anonymous user to login page 
        msalInstance.loginRedirect();
      } else {

      // can retrieve user name and email from msal response,
      // no need to call graph unless further information is needed
      this.name = account.name;

      msalInstance.acquireTokenSilent(this.tokenRequest)
        .then(response => {
          console.log(response);
          this.accessToken = response.accessToken;
          
          // can now make calls to ms graph api, which is just a matter
          // of making requests to the endpoint you want to hit and 
          // passing in the access token in the body
          
          // might be a good idea to have a store holding the access token to be 
          // used by different components, or a handler method for accessing it
        })
        // TODO: Handle errors
        .catch(error => {console.log(error)});
      }
    }).catch(err=>{
      // TODO: Handle errors
      console.log(err);
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
