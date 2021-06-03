<template>
  <div>

    <transition name="home" mode="out-in"></transition>

      <v-row class="mt-16">

        <v-col md="4" cols="12">
            <v-card
            elevation="2"
            shaped
            >
          <v-card-text>
              
              <h1>
                Typhoon News
              </h1>

              <div class="pa-1">
                Welcome!
                Monitor Typhoons
                in the Philippines Via Twitter Analytics
              </div>

              

          </v-card-text>

          </v-card>
        </v-col>

        <v-col md="8">
            <v-card
            elevation="2"
            shaped
           >
          
            <v-row no-gutters>
              <v-col md="7" cols="12" class="pa-5">
                

                <!-- Form -->
                <LoginForm buttonText="Authenticate" :submitForm="loginUser"/>
                
              </v-col>

              <v-divider vertical></v-divider>

              <v-col md="2">
                
                <div class="text-xs-center ml-5 mt-14">
                  <v-btn
                    :loading="loading"
                    class="mt-16"
                    color="error"
                    to="/dashboard"
                    @click="remove"
                  >
                    Continue as guest
                  </v-btn>
                </div>
              </v-col>

            </v-row>
          

          </v-card>
        </v-col>
        
      </v-row>

       <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
          :color="color"
        >
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>

  </div>
</template>

<script>

  import LoginForm from '~/components/UserAuthForm'
  export default {
    transition: {
      name: 'home',
      mode: 'out-in'
    },
    components: {
      LoginForm
    },
    data: () => ({
      loading: false,
      snackbar: false,
      text: '',
      color: '',
      timeout: 2000,
    }),
    methods: {
      async remove () {
        this.loading = true

        await new Promise(resolve => setTimeout(resolve, 3000))

        this.loading = false
      },
      async loginUser(loginInfo){
        
        try{
          await this.$auth.loginWith('local',{
            data: loginInfo
          })
          this.text = "Login successfuly!"
          this.color="success"
          this.snackbar = true;
          this.$router.push('/dashboard');
        }catch{
          this.text = "Wrong email or password."
          this.color="red"
          this.snackbar = true;
        }

        
      }
    },
    created(){
      if(this.$auth.loggedIn){
        this.$router.push('/dashboard')
      }
    }
  }
</script>

<style lang="scss" scoped>
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}

.home-enter-active, .home-leave-active { transition: opacity .5s; }
.home-enter, .home-leave-active { opacity: 0; }
</style>