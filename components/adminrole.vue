<template>
    <div>

       <div>
            <v-alert
            v-model="alert"
            dismissible
            color="cyan"
            border="left"
            elevation="2"
            colored-border
            icon="mdi-twitter"
            >
            You've got <strong>{{userSave.length}}</strong> new updates on your Dashboard!.
            </v-alert>

        </div>

        <v-card
        elevation="2"
        class="mt-5"
        >

        <v-card-title>
            Persons who submitted
            <v-spacer></v-spacer>
            <v-btn @click="TrainMe = true" text>
                <v-icon small class="mr-2">mdi-robot-outline</v-icon>
                Train AI.
            </v-btn>
        </v-card-title>

        <v-container>


                    

                

                    <v-slide-group
                        center-active
                        show-arrows
                    >
                    <v-slide-item
                        v-for="(user, key) in userSave"
                        :key="key"
                        v-slot="{ active,toggle }"
                    >
                        <v-btn
                        class="mx-2"
                        :input-value="active"
                        active-class="purple white--text"
                        depressed
                        rounded
                        @click="toggle; setActive(key);"
                        >
                        <v-icon small>mdi-account-outline</v-icon>
                        {{user.user_id}}
                        </v-btn>
                    </v-slide-item>
                    </v-slide-group>


                    <div v-if="tweetObj.length != 0">
                        <template>

                            <v-slide-group
                                v-model="Approve"
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
                                    width="350"

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
                                        removef_from_tweeter_object(n),
                                        snackbar = true
                                    }"
                                    color="danger"
                                    >
                                    <v-icon>
                                        mdi-delete-circle-outline
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

                    <div v-else>

                        <v-sheet
                        class="text-center pa-15"
                        >
                        <v-icon large>mdi-hand-pointing-up</v-icon>
                        Load User Submitted Tweets
                        </v-sheet>

                    </div>

                        
                            
                                <v-btn
                                    rounded
                                    v-if="tweetObj.length != 0"
                                    @click="submit_object_in_AI"
                                    :loading="loading"
                                >
                                    <v-icon small class="pa-1">
                                        mdi-content-save-outline
                                    </v-icon>
                                    Save Dataset
                                </v-btn>

        </v-container>

                        

        </v-card>





        <v-card
        elevation="2"
        class="mt-5"
        >

        <v-card-title>Registered Users</v-card-title>

        <v-simple-table class="pa-5">
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">
                    FullName
                </th>
                <th class="text-left">
                    Email
                </th>
                <th class="text-left">
                    Role
                </th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="(userreg,key) in users"
                :key="key"
                >
                <td>{{ userreg.user_name }}</td>
                <td>{{ userreg.user_email }}</td>
                <td>{{ userreg.role }}</td>

                </tr>
            </tbody>
            </template>
        </v-simple-table>


        </v-card>





    <v-container class="mb-10">
        <div class="float-end">
          <Approvetweets :list="Approvelist" v-if="Approvelist.length != 0"/>
        </div>
    </v-container>




        <v-dialog
        v-model="TrainMe"
        persistent
        max-width="500px"
    >
        <v-card shaped :loading="TrainMeStatus">
          <v-card-title>
            Training AI
          </v-card-title>
          <v-card-text class="pa-5 text-center">

           {{TrainMeText}}


          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="TrainMe = false"
              :disabled="TrainMeStatus"
            >
              Close
            </v-btn>

            <v-btn
              :disabled="TrainMeStatus"
              color="primary"
              text
              @click="perform_Train_Ai"
            >
              Execute
            </v-btn>

          </v-card-actions>
        </v-card>
    </v-dialog>

    

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
                edit_label_of_tweeter_object(),
                EditClassification = false,
                snackbar = true
              }"
            >
              Edit Label
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
    import Approvetweets from '~/components/approvetweet.vue';
    export default {
        components : {
          Approvetweets
        },
        data: () => ({
            TrainMe: false,
            TrainMeText: "Performing this action may take a several minute",
            TrainMeStatus:false,
            alert: true,
            selectedItem: 1,
            activekey: null,
            activeindex: null,
            userSave: [],
            EditClassification: false,
            activeToEditClass: null,
            editClassText: '',
            snackbar: false,
            searchmode: false,
            searchStat: false,
            text: 'Action Update Success',
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
            load: false,
            loading: false,
            users:[]
        }),

        methods : {

            async delete_from_database(){

                this.creating = true;

                const status = await fetch('http://localhost:3000/api/auth/remove_data_save',{
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({
                        id: this.activekey
                    })
                });

                const pendingStat = await status;
                if(pendingStat.status === 200){
                    alert("Deleted")
                }else{
                    alert("Failed")
                }
                this.creating = false;
                console.log(status)
            },
            async submit_object_in_AI(){

                this.loading = true;

                try{

               
                    
                this.tweetObj.forEach(element => {
                    delete element.imageUrl
                });
                
                const fetch_list = await this.$axios.get('/Tweet/add/', {
                    params: {
                        data: JSON.stringify(this.tweetObj)
                    }
                })
                
                const pending = await fetch_list.status;

                    if(pending == 200){
                        this.delete_from_database();
                        alert("Submitted Success")
                        this.$delete(this.userSave, this.activeindex);
                        this.tweetObj = []
                    }

                }catch(err){
                alert("Failed Submit");
                }
                
                this.loading = false;
            },
            remove_slashed_n : function(str){
                return str.replace("\n", '');
            },
            setActive : function (key) {
                const Obj = this.userSave[key]
                this.tweetObj = Obj.saves;
                this.activekey = Obj.id;
                this.activeindex = key
            },
            async get_all_saves (){
                this.searchStat = true;
                
                try{
                this.load = true;
                const saveObj = await this.$axios.get('http://localhost:3000/api/auth/approvetweetslist');
                
                const Objsavedata = await saveObj.data;

                    if(saveObj.status == 200){
                        this.userSave = Objsavedata;
                    }

                }catch {
                alert("Failed to fetch reload is the option");
                }
                this.load = false;
            },
            
      
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

            async getAllUsers (){

                const users = await this.$axios.get('http://localhost:3000/api/auth/registereduserlist');
                
                const userlist = await users.data;
                this.users = userlist;
            },

            async perform_Train_Ai (){

                this.TrainMeStatus = true;

                try{
                
                this.TrainMeText = "Please wait AI Training is being process"
                const training = await this.$axios.get('/Tweet/trainModel/');
                

                if(training.status == 200){
                    this.TrainMeText = "Training Done!"
                }

                }catch {
                
                    this.TrainMeText = "Error Training :("
                
                }
                this.TrainMeStatus = false;
            },

            removef_from_tweeter_object : function (key){
                return this.$delete(this.tweetObj, key);
            },


            edit_label_of_tweeter_object : function (){
                
                let Data = this.tweetObj[this.activeToEditClass];

                Data.label = this.convert_to_abrevations
                this.editClassText = '';
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

        },
        mounted(){
            this.get_all_saves();
            this.getAllUsers();
        }
    }
</script>

<style lang="scss" scoped>

</style>