<template>
    <div class="mt-10">
        <v-container fluid>
            <v-form lazy-validation ref="form">
                <v-text-field
                    v-model="params.buttontext"
                    label="Button Text"
                    @change="add"
                    :rules="rules.buttontext"
                    required
                ></v-text-field>

                 <v-text-field
                    v-model="params.responses.initial"
                    label="Initial Message"
                    @change="add"
                    :rules="rules.initial"
                    required
                ></v-text-field>

                 <v-text-field
                    v-model="params.phone_number"
                    label="Phone Number"
                    @change="add"
                    :rules="rules.phone_number"
                    required
                ></v-text-field>

                 <v-text-field
                    v-model="params.responses.confirmation.default"
                    label="Confirmation Message"
                    @change="add"
                    :rules="rules.confirmationdefault"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="params.responses.confirmation.away"
                    label="Away Message"
                    @change="add"
                    :rules="rules.confirmationaway"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="params.responses.confirmation.here"
                    label="Here Message"
                    @change="add"
                    :rules="rules.confirmationhere"
                    required
                ></v-text-field>

                <v-col class="d-flex" cols="12" sm="6">
                    <v-select
                    v-model="params.responses.prefix.status"
                    :items="prefixStatus"
                    label="Status"
                    @change="add"
                    :rules="rules.prefixstatus"
                    outlined
                    ></v-select>
                </v-col>

                <v-text-field
                    v-model="params.responses.prefix.away"
                    label="Away Prefix"
                    @change="add"
                    :rules="rules.prefixaway"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="params.responses.prefix.here"
                    label="Here Prefix"
                    @change="add"
                    :rules="rules.prefixhere"
                    required
                ></v-text-field>
            </v-form>
            <v-btn v-if="config.removable" @click="deleteChat(config.id)" outlined color="red">Delete</v-btn>
        </v-container>
    </div>
</template>

<script>
export default {
     props: ["config"],
     data(){
         return{
            prefixStatus: ['Enable', 'Disable'],
            params: {
                buttontext: "",
                phone_number: "",
                responses: {
                    initial: "",
                    confirmation: {
                        away: "",
                        here: "",
                        default: ""
                    },
                    prefix: {
                        here: "",
                        away: "",
                        status: ""
                    }
                }
            },
            rules: {
                buttontext: [v => !!v || 'Button Text is required'],
                initial: [v => !!v || 'Initial Message is required'],
                phone_number: [v => !!v || 'Phone Number is required'],
                confirmationdefault: [v => !!v || 'Confirmation Message is required'],
                confirmationaway: [v => !!v || 'Away Message is required'],
                confirmationhere: [v => !!v || 'Here Message is required'],
                prefixstatus: [v => !!v || 'Prefix Status is required'],
                prefixaway: [v => !!v || 'Prefix Away is required'],
                prefixhere: [v => !!v || 'Prefix Here is required']
            }
         }
     },
     mounted(){
        if(typeof this.config.params !="undefined"){
            this.params = this.config.params;
        }
     },
     methods: {
         add(){
            var isValid = this.$refs.form.validate();

            this.config.params = this.params;
            if(isValid)this.$emit("updateChat", this.config);
         },
         deleteChat(id){
            this.$emit("deleteChat", id);
         }
     }
}
</script>