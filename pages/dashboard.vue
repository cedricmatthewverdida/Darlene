<template>
  <div>

    <div class="d-flex flex-row pa-10">

        <v-combobox
            v-model="search"
            :items="items"
            label="Search keyword"
            hide-details 
            placeholder="...." 
            persistent-hint
            filled
            prepend-inner-icon="mdi-magnify"
            rounded 
            @keyup.enter="getTweet"
            clearable
            :loading="load"
           dense
        ></v-combobox>
    </div>

    <template>

          <v-slide-group
            v-model="Approve"
            class="pa-4"
            center-active
            show-arrows
          >
            <v-slide-item
              v-for="(tweet,n) in tweetObj"
              :key="n"
              v-slot="{ toggle }"
            >
              <v-card
                
                class="ma-4"
                height="460"
                width="300"

              >

              <v-card-title>
                

                <v-btn
                  class="mx-2"
                  fab
                  small
                  :href="tweet.tweetLink" target="_blank"
                >
                  <v-icon>
                    mdi-link
                  </v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                
                <v-btn
                  class="mx-2"
                  fab
                  small
                  @click="toggle"
                  color="danger"
                >
                  <v-icon>
                    mdi-check
                  </v-icon>
                </v-btn>


              </v-card-title>
              
                <v-row
                  class="fill-height pa-5 text-center"
                  align="center"
                  justify="center"
                >
              

           
                
                <v-sheet
                  height="50"
                  width="100"
                >

                  <v-avatar size="70">
                    <v-img
                    rounded
                    :src="tweet.imageUrl"
                    :lazy-src="tweet.imageUrl">
                    </v-img>
                  </v-avatar>
                  <div class="pa-3 caption">@{{tweet.name}}/</div>
                </v-sheet>

                <v-sheet
                  height="190"
                  width="400"
                  class="pa-5"
                  style="cursor:pointer;"
                >

                {{tweet.tweet}}

                </v-sheet>

                


                
                
                <!--                 
                  <v-scale-transition>
                    <v-icon
                      v-if="active"
                      color="white"
                      size="48"
                      v-text="'mdi-close-circle-outline'"
                    ></v-icon>
                  </v-scale-transition> 
                -->

                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>
    </template>



    

  </div>
</template>

<script>
  
  export default {

    data: () => ({
      search: '',
      tweetObj: [],
      Approve:null,
      items: [
          '#TyphoonDante',
          '#RescuePH',
          '#ReliefPH',
          '#SafeNow',
          '#SafeNow',
      ],
      load: false
    }),

    methods:{

      async getTweet (){
        try{
        this.load = true;
        const tweets = await this.$axios.get('/Tweet/?title='+`${this.validatestring}`);
        
         const ListofTweets = await tweets.data;

        if(tweets.status == 200){
         
          this.tweetObj = ListofTweets.tweets;
        }

        }catch {
          alert("Failed to fetch");
        }
        this.load = false;
      },

    },
    computed:{
      validatestring : function (){
        return this.search.replace("#", "%23");
      }
    }

  }
</script>

<style lang="scss" scoped>

</style>