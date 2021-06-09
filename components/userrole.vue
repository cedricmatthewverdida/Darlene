<template>
  <div>


    <v-alert
      prominent
      v-if="!$auth.loggedIn"
      type="error"
    >
      <v-row align="center">
        <v-col class="grow">
          You are accessing it as a guest you cannot submit or train a AI loggin is required
        </v-col>
        <v-col class="shrink">
          <v-btn  text to="/">
            <v-icon>mdi-login</v-icon>&nbsp;
            Click to login
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <div class="mt-5">

      <div class="d-flex flex-row">

        <v-combobox
            :disabled="searchStat"
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
            :loading="load"
           dense
        ></v-combobox>

          <v-btn
            fab
            depressed
            v-if="searchStat"
            @click="Resets"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>

        </div>
        <div class="d-flex flex-row mb-6">
          
          <v-select
            v-model="activecategory"
            :disabled="!searchmode"
            :items="category"
            label="Category"
            dense
            rounded
            solo
            class="mt-2 qq"
          ></v-select>

          <v-switch class="ml-3"
            :disabled="searchStat"
            v-model="searchmode"
            inset
            :label="`Search mode: ${this.searchmode ? 'Advanced search' : 'Normal search'}`"
          ></v-switch>

        </div>
    </div>

    

    
    <div v-if="tweetObj.length != 0">
    <template>

          <v-slide-group
            v-model="Approve"
            center-active
            show-arrows
          >
            <v-slide-item
              v-for="(tweet,n) in listof_tweetsandcheckifnotdefaultorsorted"
              :key="n"
              v-slot="{ toggle }"
            >
              <v-card
                
                class="ma-4"
                height="460"
                width="300"

              >

              <v-card-title>
                


                <v-icon small color="red">
                  mdi-cards-heart
                </v-icon><span class="caption ml-2 mr-2">{{tweet.faveCount}}</span>

                <v-icon small>
                  mdi-twitter-retweet
                </v-icon><span class="caption ml-2 mr-2">{{tweet.rtCount}}</span>
                
                <v-icon small>
                  mdi-label-outline
                </v-icon><span class="caption ml-2">{{tweet.label}}</span>

                <v-spacer></v-spacer>
                
                <v-btn
                  class="mx-2"
                  icon
                  small
                  :href="tweet.tweetLink" target="_blank"
                >
                  <v-icon>
                    mdi-link
                  </v-icon>
                </v-btn>


                <v-btn
                  v-if="$auth.loggedIn"
                  class="mx-2"
                  icon
                  small
                  @click="()=> {
                    EditClassification = true,
                    activeToEditClass = n
                  }"
                  color="danger"
                >
                  <v-icon>
                    mdi-circle-edit-outline
                  </v-icon>
                </v-btn>



                <v-btn
                  v-if="$auth.loggedIn"
                  class="mx-2"
                  icon
                  small
                  @click="()=> {
                    addToList(n),
                    snackbar = true
                  }"
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
                  height="40"
                  width="100"
                >

                  <v-avatar size="70">
                    <v-img
                    rounded
                    :src="tweet.imageUrl"
                    :lazy-src="tweet.imageUrl">
                    </v-img>
                  </v-avatar>
                
                <div class="pa-1 caption">
                  <v-icon small>
                    mdi-clock-time-eight-outline
                  </v-icon><span class="caption ml-2">{{tweet.tweetTime | dateDayAgo}}</span>
                
                    @{{tweet.tweetAuthor}}
                 </div>
                </v-sheet>

                <v-sheet
                  height="190"
                  width="400"
                  class="pa-5"
                  style="cursor:pointer;"
                  @click="toggle"
                >

                {{tweet.tweetText | limitString}}

                </v-sheet>
                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>
    </template>
    </div>
    <div class="d-flex justify-center" v-else>
      <v-img 
      max-height="500"
      max-width="800"
      :src="require('@/assets/searching.png')">

      </v-img>
    </div>


    <v-container class="mb-10">
        <div class="float-end">
          <Approvetweets :list="Approvelist" v-if="Approvelist.length != 0"/>
        </div>
    </v-container>

    

    <v-dialog
        v-model="EditClassification"
        persistent
        max-width="500px"
    >
        <v-card>
          <v-card-title>
            Edit Classification
          </v-card-title>
          <v-card-text class="pa-5">

            <v-select
            v-model="editClassText"
            :items="category"
            label="Classifications"
            dense
            rounded
            solo
            class="mt-2"
          ></v-select>


          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="EditClassification = false"
            >
              Close
            </v-btn>

            <v-btn
              :disabled="editClassText == ''"
              color="primary"
              text
              @click="()=> {
                addToList_edited_key(),
                EditClassification = false,
                snackbar = true
              }"
            >
              Add to archive
            </v-btn>

          </v-card-actions>
        </v-card>
    </v-dialog>

        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
          rounded="pill"
          color="deep-purple accent-4"
        >
        <v-icon>
          mdi-twitter
        </v-icon>

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
  import moment from 'moment';
  import Approvetweets from '~/components/approvetweet.vue'
  export default {
    components : {
      Approvetweets
    },
    data: () => ({
      EditClassification: false,
      activeToEditClass: null,
      editClassText: '',
      snackbar: false,
      searchmode: false,
      searchStat: false,
      text: 'Added to tweet list!',
      timeout: 1000,
      search: '',
      tweetObj: [],
      Approve:null,
      Approvelist:[],
      items: [
          '#TyphoonDante',
          '#RescuePH',
          '#ReliefPH',
          '#SafeNow',
          '#SafeNow',
      ],
      category: [
          'Others',
          'Announcement',
          'Call for Help',
          'Casualty and Damage'
      ],
      activecategory: '',
      load: false
    }),

    methods:{
      
      async getTweet (){
        this.searchStat = true;
        if(this.searchmode && this.activecategory == ''){
          this.activecategory = "Others";
        }
        try{
        this.load = true;
        const tweets = await this.$axios.get('/Tweet/?title='+`${this.validatestring}`+'&style='+`${this.fetch_default_or_sorted}`);
        
         const ListofTweets = await tweets.data;

        if(tweets.status == 200){
          this.tweetObj = ListofTweets;
        }

        }catch {
          this.searchStat = false;
          alert("Failed to fetch");
        }
        this.load = false;
      },

      addToList : function (key){

          let Data = this.listof_tweetsandcheckifnotdefaultorsorted[key];

          this.Approvelist.push(
            Data
          )
          return this.$delete(this.listof_tweetsandcheckifnotdefaultorsorted, key);
      },
      addToList_edited_key : function (){
          
          let Data = this.listof_tweetsandcheckifnotdefaultorsorted[this.activeToEditClass];

          Data.label = this.convert_to_abrevations

            this.editClassText = '';

          this.Approvelist.push(
            Data
          )

        return this.$delete(this.listof_tweetsandcheckifnotdefaultorsorted, this.activeToEditClass);

      },
      Resets : function (){
        this.searchStat = false;
        this.tweetObj = [];
      },

    },
    computed:{
      validatestring : function (){
        return this.search.replace("#", "%23");
      },


      listof_tweetsandcheckifnotdefaultorsorted : function (){
        if(this.searchmode){
          if(this.activecategory == "Anouncement")
            return this.tweetObj.CA.tweets;
          if(this.activecategory == "Others")
            return this.tweetObj.O.tweets; 
          if(this.activecategory == "Casualty and Damage")
            return this.tweetObj.CD.tweets; 
          if(this.activecategory == "Call for Help")
            return this.tweetObj.CH.tweets;
          if(this.activecategory == '')
            return this.tweetObj.tweets;
        }else{
          return this.tweetObj.tweets;
        }
      },

      convert_to_abrevations : function (){

          if(this.editClassText == "Announcement")
            return this.editClassText = "CA";
          if(this.editClassText == "Others")
            return this.editClassText = "O";
          if(this.editClassText == "Casualty and Damage")
            return this.editClassText = "CD";
          if(this.editClassText == "Call for Help")
            return this.editClassText = "CH"
      },

      fetch_default_or_sorted : function () {
        return !this.searchmode ? "DEFAULT" : "SORTED";
      }

    },

    filters:{
      limitString : function (str){
        
        var trimmedString = str.substring(0, 100);

        return trimmedString + '...';

      },
      
      dateDayAgo : function (val){
        return moment(val).fromNow();
      },

      convertDateFormat : function (val){
        return moment(val).format('MMMM D, YYYY');
      },

    }

  }
</script>

<style lang="scss" scoped>
.qq{
  max-width: 250px;
}
</style>