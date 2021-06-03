<template>

    <v-card
    elevation="4"
    shaped
   class="mx-auto mt-15"
    max-width="500"
    :loading="creating"

    >
    <v-card-text class="text-center mt-3">
        <h1>
            Create Account
        </h1>
    </v-card-text>
    
        <v-container class="pa-5">

                    <v-container v-if="createSuccess != undefined">
                        <v-alert
                        border="left"
                        :type="CreateStatus == 'Account succesfuly created' ?  'success': 'error'"
                        >
                            {{CreateStatus}}
                        </v-alert>
                    </v-container>
                <v-form v-model="valid">
                  <v-container>
                   
                        <v-text-field
                          v-model="userInfo.name"
                          :rules="nameRules"
                          label="Fullname"
                          required
                          outlined
                        ></v-text-field>

                        <v-text-field
                          v-model="userInfo.email"
                          :rules="emailRules"
                          label="E-mail"
                          required
                          outlined
                        ></v-text-field>

                        <v-text-field
                          v-model="userInfo.pass"
                          :rules="PassRules"
                          label="Password"
                          required
                          outlined
                          :type="passwordType ? 'text' : 'password'"
                          :append-icon="passwordType ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="passwordType = !passwordType"
                        ></v-text-field>
                      
                        
                    <v-btn
                    block
                    class="mt-1"
                    color="primary"
                    large
                    @click="register_user"
                    :disabled="!valid"
                    >
                      Register
                    </v-btn>

                  </v-container>
                </v-form>
        </v-container>
    </v-card>

</template>

<script>
    export default {
        data: () => ({
            valid: false,
            creating: false,
            createSuccess: undefined,
            CreateStatus: null,
            passwordType: false,

            userInfo : {
                name: '',
                email: '',
                pass: '',
                role: ''
            },
            
            nameRules: [
                v => !!v || 'Name is required'
            ],

            PassRules: [
                v => !!v || 'Password is required'
            ],
            
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        }),

        methods:{
            async register_user(){

                this.creating = true;

                const status = await fetch('http://localhost:3000/api/auth/register',{
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({
                        name: this.userInfo.name,
                        email: this.userInfo.email,
                        pass: this.userInfo.pass,
                        role: this.userInfo.role
                    })
                });

                const pendingStat = await status;
                if(pendingStat.status === 200){
                    this.createSuccess =  true;
                    this.CreateStatus =  "Account succesfuly created";
                }else{
                    this.createSuccess = false;
                    this.CreateStatus =  "Account already exist";
                }
                this.creating = false;
                console.log(status)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>