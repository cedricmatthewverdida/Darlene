<template>
  <v-app>



 <TheSnackbar />
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :fixed="fixed"
      app
    >

      <v-list-item>
        <v-list-item-content class="text-center" v-if="location.length != 0">

          <v-list-item-title class="title">

            <v-img src="https://i.ibb.co/rFGMDnZ/logo-text.png"></v-img>
            <v-divider class="mb-2"></v-divider>
            {{location.name}}

            <div class="d-flex justify-center">
              <v-img :src="loadImage(location.weather[0].icon)" max-height="65" max-width="65"></v-img>
            </div>
            <h2>{{location.weather[0].main}}</h2>

          </v-list-item-title>
          
          <v-list-item-subtitle>
            <small>{{location.weather[0].description}}</small><br>
            {{location.main.temp | kelvinToCel}}&#176;C
          </v-list-item-subtitle>

        </v-list-item-content>

        <v-list-item-content v-else>
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>


      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        
        <AccountInfo/>


        <v-list-item
          router
          exact
          v-if="$auth.loggedIn"
          @click="LogOut"
        >
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Logout
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>



    </v-navigation-drawer>


    <v-app-bar
      :clipped-left="clipped"
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />


        <v-btn
          icon
          @click="changetheme"
        >
          <v-icon>{{check_theme}}</v-icon>
        </v-btn>
      <v-toolbar-title v-text="title" />

      <v-spacer></v-spacer>

      


    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>





      <v-footer
          :absolute="!fixed"
          app
          padless
        >
          <v-card
            class="flex"
            flat
            tile
          >

      <v-card-text class="py-2 text-center">
        A Crisis Information Dashboard
        System using Feedback-based Test Classification of
        Real-Time Typhoon-Related Tweets in the Philippines
      </v-card-text>
    </v-card>
  </v-footer>


   
  </v-app>
</template>

<script>
import TheSnackbar from '@/components/TheSnackbar.vue';
import AccountInfo from '@/components/userInfo.vue';
export default {
  components: {
    TheSnackbar,
    AccountInfo
  },
  data () {
    return {
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
      lat: undefined,
      long: undefined,
      location:[],
      loading: false,
      clipped: false,
      drawer: false,
      fixed: true,
      thememode: undefined,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/dashboard'
        },
        {
          icon: 'mdi-chart-bar',
          title: 'Analytics',
          to: '/analytics'
        },
        {
          icon: 'mdi-weather-partly-snowy-rainy',
          title: 'Forecast',
          to: '/forecast'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Crisis Information'
    }
  },
  methods:{
    changetheme : function (){
        !this.themes() ? this.$vuetify.theme.dark = true : this.$vuetify.theme.dark = false;
        this.thememode = this.themes()
    },
    loadImage : function (img){
      return 'http://openweathermap.org/img/wn/'+`${img}`+'@2x.png';
    },
    themes(){
      return this.$vuetify.theme.dark;
    },
    LogOut() {
      this.$auth.logout();
      this.$router.push('/')
    },
    async getUserForecast (){
            this.loading = true;
            if(this.lat != undefined && this.long != undefined){
              try{
                const fetch_list = await this.$axios.get('/Weather/data/2.5/weather?lat='+`${this.lat}`+'&lon='+`${this.long}`+'&appid=abec48bcf758f9b536a6cf99bdbcf750');
                
                const pending = await fetch_list.status;

                if(pending == 200){
                  this.location = fetch_list.data
                }else{
                  this.location = [];
                }
              }catch(err){
                  alert("Failed to load user weather");
              }
            }
          this.loading = false;
      }
  },
  computed: {
    theme(){
        return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
    check_theme : function (){
      return this.thememode ? 'mdi-sunglasses' : 'mdi-moon-waning-crescent'
    }
  },
  filters:{
    kelvinToCel : function (kelv) {
        const calc =  kelv - 273.15;
        return Math.round(calc);
    },
  },
  mounted(){

    // console.log($auth.user);
    this.thememode = this.themes();

              //Location
              const successCallback = (position) => {

              

                if(this.lat == undefined && this.long == undefined){
                    this.lat = position.coords['latitude'];
                    this.long = position.coords['longitude'];
                  this.getUserForecast();
                }

              }
              const errorCallback = (error) => {
                console.error(error);
              }
              

              const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);
              
              console.log(watchId);
  
  }
  
}
</script>
