<template>

    <v-card
    elevation="4"
    shaped
   class="mx-auto pa-5 mt-15"
    max-width="500"

    >
    <v-card-text class="text-center">
        <h1>
            Register
        </h1>
    </v-card-text>
        <v-container>
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
                    @click="submitForm(userInfo)"
                    :disabled="!valid"
                    >
                      {{ buttonText }}
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
            passwordType: false,
            userInfo : {
                name: '',
                email: '',
                pass: '',
                role: 'user'
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

        props:[
            "submitForm",
            "buttonText",
            "hasName"
        ]
    }
</script>

<style lang="scss" scoped>

</style>