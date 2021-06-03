<template>
  <div>



        <v-text-field
              v-model="search"
              hide-details 
              label="Search for City" 
              placeholder="...." 
              filled 
              rounded 
              dense 
              single-line 
              append-icon="mdi-magnify"
              class="kq">
        </v-text-field>

        <v-btn
          :loading="loading"
          rounded
          class="mt-2"
          @click="getForecast"
        >
          Search City
        </v-btn>


      <v-card
        class="mt-2"
        elevation="2"
        v-if="forecast.length != 0"
        shaped
      >
      
      <v-card-text class="text-center">
        <h1 class="display-1 pa-7">{{forecast.name}} <br>
          <small>Country: {{forecast.sys['country']}}</small>
        </h1>
        

        <v-row class="mt-5">

          <v-col>
            <div class="d-flex justify-center">
              <v-img :src="loadImage(forecast.weather[0].icon)" max-height="65" max-width="65"></v-img>
            </div>
            <h2>{{forecast.weather[0].main}}</h2>
          </v-col>

          <v-col>
            <h1 class="pa-2">{{forecast.main.temp | kelvinToCel}}&#176;C</h1>
            <small>{{forecast.weather[0].description}}</small>
          </v-col>

          <v-col>
            
            <div class="text-left">
              <v-icon>mdi-weather-windy</v-icon>
              Wind: {{forecast.wind.speed | meterSec_to_kmph}} kmph
            </div>

            <div class="text-left">
              <v-icon>mdi-water</v-icon>
              Humidity: {{forecast.main.humidity}} %
            </div>

            <div class="text-left">
              <v-icon>mdi-speedometer-medium</v-icon>
              Pressure : {{forecast.main.pressure}} mb
            </div>

            <div class="text-left">
              <v-icon>mdi-thermometer-low</v-icon>
              Feels Like : {{forecast.main.feels_like | kelvinToCel}}&#176;
            </div>


          </v-col>

        </v-row>

      </v-card-text>

      </v-card>


    <div class="text-center mt-3">
      <v-row
        class="fill-height"
        align="center"
        justify="center"
      >
        <template v-for="(item,i) in dayforecast">
          <v-col
            :key="i"
            cols="12"
            md="4"
          >
           
              <v-card
              >
              
                    

                     <v-container>
                       <v-card-text class="text-left">
                         <v-icon>mdi-calendar</v-icon> &nbsp;
                         {{item.dt_txt | convertDateFormat}}&nbsp; {{item.main.temp | kelvinToCel}}&#176;
                       </v-card-text>
                        <v-row>

                          <v-col
                            sm="6"
                          >

                            <div class="d-flex justify-center">
                              <v-img :src="loadImage(item.weather[0]['icon'])" max-height="65" max-width="65"></v-img>
                            </div>

                            <h2>{{item.weather[0]['main']}}</h2>

                            <small>{{item.weather[0]['description']}}</small>

                          </v-col>

                          <v-col
                          >
                          <v-container>
                            <small>
                                <div class="text-left">
                                  <v-icon>mdi-weather-windy</v-icon>
                                  Wind:&nbsp;
                                  {{item.wind['speed'] | meterSec_to_kmph}} kmph
                                </div>

                                <div class="text-left">
                                  <v-icon>mdi-water</v-icon>
                                  Humidity:&nbsp;
                                  {{item.main['humidity']}} %
                                </div>

                                <div class="text-left">
                                  <v-icon>mdi-speedometer-medium</v-icon>
                                  Pressure:&nbsp;
                                 {{item.main['pressure']}} mb
                                </div>

                                <div class="text-left">
                                  <v-icon>mdi-thermometer-low</v-icon>
                                  Feels Like:&nbsp;
                                  {{item.main['feels_like'] | kelvinToCel}}&#176;
                                </div>
                            </small>
                          </v-container>

                          </v-col>
                        </v-row>
                      </v-container>
                  


              </v-card>
          </v-col>
        </template>
      </v-row>
    </div>

  </div>
</template>

<script>
import moment from 'moment';
  export default {
    data: () => ({
      search: 'Cagayan de Oro',
      forecast: [],
      dayforecast: [],
      loading: false,
      dayloading:false
    }),

    methods :{
        async getForecast(){
            this.loading = true;
            try{
            const fetch_list = await this.$axios.get('/Weather/data/2.5/weather?q='+`${this.search}`+'&appid=abec48bcf758f9b536a6cf99bdbcf750');
            
            const pending = await fetch_list.status;

            if(pending == 200){
              this.forecast = fetch_list.data
              this.getdaysForecast();
            }else{
              this.forecast = [];
            }
            }catch(err){
              alert("City not found");
            }
            this.loading = false;
        },

        loadImage : function (img){
            return 'http://openweathermap.org/img/wn/'+`${img}`+'@2x.png';
        },

        removeDuplicates : function(originalArray, prop) {
            var newArray = [];
            var lookupObject  = {};

            for(var i in originalArray) {
                lookupObject[originalArray[i][prop]] = originalArray[i];
            }

            for(i in lookupObject) {
                newArray.push(lookupObject[i]);
            }
              return newArray;
        },

        UpdateDate : function (obj){
          
            Object.values(obj).forEach(function(val){ val.dt_txt = moment(val.dt_txt).format('MMMM D, YYYY'); });
            return obj;
        },

        async getdaysForecast (){
            this.dayloading = true;
              try{
              const fetch_list = await this.$axios.get('/Weather/data/2.5/forecast?q='+`${this.search}`+'&appid=abec48bcf758f9b536a6cf99bdbcf750');
              
              const pending = await fetch_list.status;

              if(pending == 200){
                let modifyObject = this.UpdateDate(fetch_list.data['list'])

                let uniqueArray = this.removeDuplicates(modifyObject, "dt_txt");

                this.dayforecast = uniqueArray;




              }else{
                this.dayforecast = [];
              }
              }catch(err){
                alert("City not found");
              }
            this.dayloading = false;
        }
    },
    filters:{
      kelvinToCel : function (kelv) {
        const calc =  kelv - 273.15;
        return Math.round(calc);
      },
      meterSec_to_kmph : function (meterSec){
        const calc = meterSec * 3.6;
        return Math.round(calc);
      },
      convertDateFormat : function (val){
        return moment(val).format('dddd');
      },
    }
  }
</script>

<style lang="scss" scoped>
.kq{
      width: 600px;
}
</style>