<template>
 
      <v-dialog
        transition="dialog-top-transition"
        max-width="900"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            rounded
            large
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
          <sup class="overline">{{list.length}}</sup>
          <v-icon>mdi-archive-outline</v-icon>
            Archive
          </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>


 
            <v-container>
                <template>
                    <v-timeline>
                        <v-timeline-item
                        v-for="(tweet,n) in list"
                        :key="n"
                        large
                        >
                        <template v-slot:icon>
                            <v-avatar>
                            <img :src="tweet.imageUrl" :Lazy-src="tweet.imageUrl">
                            </v-avatar>
                        </template>
                        <template v-slot:opposite>
                            <span>@{{tweet.tweetAuthor}}</span>
                        </template>
                        <v-card class="elevation-2">
                            <v-card-text>
        
                                <p>

                                <v-btn
                                icon
                                color="deep-purple accent-4"
                                small
                                @click="removeFromList(n)"
                                >

                                <v-icon>mdi-trash-can-outline</v-icon>

                                </v-btn> <br>
                                  <v-container>
                                    {{tweet.tweetText}}
                                  </v-container>
                                </p>
                                <v-container>
                                  <small class="mt-5 text-center caption">
                                    <v-icon small color="red">
                                      mdi-cards-heart
                                    </v-icon><span class="caption ml-2 mr-2">{{tweet.faveCount}}</span>

                                    <v-icon small>
                                      mdi-twitter-retweet
                                    </v-icon><span class="caption ml-2 mr-2">{{tweet.rtCount}}</span>
                                    <v-icon small>
                                      mdi-clock-time-eight-outline
                                    </v-icon><span class="caption ml-2">{{tweet.tweetTime | dateDayAgo}}</span>
                                    <v-icon small>
                                      mdi-label-outline
                                    </v-icon><span class="caption ml-2">{{tweet.label}}</span>
                                    <br>
                                    {{tweet.tweetLink}}
                                  </small>
                                </v-container>
                            </v-card-text>
                            
                        </v-card>
                        </v-timeline-item>
                    </v-timeline>
                </template>
            </v-container>



            <v-card-actions class="justify-end">
                <v-btn
                    text
                    @click="()=> {
                    createTweets(),
                    dialog.value = false
                  }"
                >Submit</v-btn>
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

</template>


<script>
import moment from 'moment';
    export default {
        props:{
            list: Array
        },
        data: () => ({
          creating : false
        }),
        methods:{

            removeFromList : function (key){
                return this.$delete(this.list, key);
            },

            async createTweets(){

                this.creating = true;
                const status = await fetch('http://localhost:3000/api/auth/tweetsave',{
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({
                        id: this.$auth.user[0].logs[0].user_name,
                        tweets: this.list
                    })
                });

                const pendingStat = await status;
                if(pendingStat.status === 200){
                    alert("Inserted")
                }else{
                    alert("Failed")
                }
                this.creating = false;
                console.log(status)
            }
        },
        filters:{
          dateDayAgo : function (val){
            return moment(val).fromNow();
          },
        }
    }
</script>
