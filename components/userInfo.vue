<template>
  <div>

    

        <v-list-item
          router
          exact
          @click="loadInfo"
          v-if="$auth.loggedIn"
        >
          <v-list-item-action>
            <v-icon>mdi-account-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Account
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>



    <v-dialog
        v-model="dialog2"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            Account Credential
          </v-card-title>
          <v-card-text class="pa-5">

                <!-- Name -->
            <div class="d-flex flex-row">
                
            <v-text-field
                v-model="AccountName"
                solo
                rounded
                readonly
                label="Prepend inner"
                prepend-inner-icon="mdi-account"
            ></v-text-field>
            <v-btn
                fab
                icon
                @click="dialog3 = !dialog3"
            >
              <v-icon>mdi-pen</v-icon>
            </v-btn>
            </div>
                <!-- Name -->

          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="dialog2 = false"
            >
              Close
            </v-btn>

            <v-btn
              color="primary"
              text
              @click="dialog4 = !dialog4"
            >
              Change password
            </v-btn>

          </v-card-actions>
        </v-card>
    </v-dialog>


    <v-dialog
        v-model="dialog3"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span>Update Fullname</span>
          </v-card-title>

          <v-card-text class="pa-5">

                <v-text-field
                    v-model="AccountNameTmp"
                    solo
                    rounded
                    label="Enter Name"
                    prepend-inner-icon="mdi-account"
                ></v-text-field>

          </v-card-text>

            

          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="dialog3 = false"
            >
              Cancel
            </v-btn>

            <v-btn
              color="primary"
              text
              @click="updateName"
              :loading="updatingName"
              :disabled="ifNameEmpty"
            >
              Save
            </v-btn>

          </v-card-actions>
        </v-card>
    </v-dialog>

    

    <v-dialog
        v-model="dialog4"
        max-width="500px"
    >
        <v-card>
          <v-card-title>
            <span>Change Password</span>
          </v-card-title>

          <v-card-text class="pa-5">

                <v-text-field
                    v-model="Password"
                    solo
                    rounded
                    type="password"
                    label="Enter new password"
                    prepend-inner-icon="mdi-form-textbox-password"
                ></v-text-field>

          </v-card-text>

            

          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="dialog4 = false"
            >
              Cancel
            </v-btn>

            <v-btn
              color="primary"
              text
              @click="updatePassword"
              :loading="updatingName"
              :disabled="ifNotEmpty"
            >
              Save
            </v-btn>

          </v-card-actions>
        </v-card>
    </v-dialog>

      

  </div>
</template>


<script>
  export default {
    data () {
      return {
        AccountName: '',
        AccountNameTmp: '',
        updatingName: false,
        CreateStatus: undefined,
        Password: '',
        dialog2: false,
        dialog3: false,
        dialog4: false
      }
    },
    methods: {
        loadInfo: function (){
            this.dialog2 = true;
            if(this.$auth.loggedIn){
                this.AccountName = this.$auth.user[0].logs[0].user_name
            }
        },
        async updateName(){

                this.updatingName = true;

                const status = await fetch('http://localhost:3000/api/auth/updatename',{
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({
                        name: this.AccountNameTmp,
                        id: this.$auth.user[0].logs[0].user_id
                    })
                });

                const pendingStat = await status;
                if(pendingStat.status === 200){
                    this.CreateStatus =  "Name updated Successfuly";
                    this.AccountName = this.AccountNameTmp;
                }else{
                    this.CreateStatus =  "Failed to update";
                }
                this.updatingName = false;
                console.log(status)
        },

        async updatePassword(){

                this.updatingName = true;

                const status = await fetch('http://localhost:3000/api/auth/updatepassword',{
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({
                        pass: this.Password,
                        id: this.$auth.user[0].logs[0].user_id
                    })
                });

                const pendingStat = await status;
                if(pendingStat.status === 200){
                    this.CreateStatus =  "Password Updated!";
                }else{
                    this.CreateStatus =  "Failed to update!";
                }
                this.updatingName = false;
                console.log(status)
        }
    },
    computed: {
        ifNameEmpty : function (){
            return this.AccountNameTmp != '' ? false : true;
        },
        ifNotEmpty : function (){
            return this.Password != '' ? false : true;
        }
    },
  }
</script>