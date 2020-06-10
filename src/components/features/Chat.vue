<template>
    <div class="mt-10">
        <v-container fluid>
            <v-form lazy-validation ref="form">
                <v-text-field
                    prepend-inner-icon="mdi-card-text"
                    v-model="params.button_text"
                    label="Button Text"
                    @change="add"
                    :rules="rules.button_text"
                    dense
                    outlined
                    required
                ></v-text-field>

                 <v-text-field
                    prepend-inner-icon="mdi-message-arrow-right"
                    v-model="params.responses.initial"
                    label="Initial Message"
                    @change="add"
                    :rules="rules.initial"
                    dense
                    outlined
                    required
                ></v-text-field>

                 <v-text-field
                    prepend-inner-icon="mdi-card-account-phone"
                    v-model="params.phone_number"
                    label="Phone Number"
                    @change="add"
                    :rules="rules.phone_number"
                    dense
                    outlined
                    required
                ></v-text-field>

                 <v-text-field
                    prepend-inner-icon="mdi-thumb-up"
                    v-model="params.responses.confirmation.default"
                    label="Confirmation Message"
                    @change="add"
                    :rules="rules.confirmationdefault"
                    dense
                    outlined
                    required
                ></v-text-field>

                <v-text-field
                    prepend-inner-icon="mdi-exit-run"
                    v-model="params.responses.confirmation.away"
                    label="Away Message"
                    @change="add"
                    :rules="rules.confirmationaway"
                    dense
                    outlined
                    required
                ></v-text-field>

                <v-text-field
                    prepend-inner-icon="mdi-walk"
                    v-model="params.responses.confirmation.here"
                    label="Here Message"
                    @change="add"
                    :rules="rules.confirmationhere"
                    dense
                    outlined
                    required
                ></v-text-field>

                <v-col class="d-flex" cols="12" sm="6">
                    <v-select
                    v-model="params.responses.prefix.status"
                    :items="prefixStatus"
                    label="Status"
                    @change="add"
                    :rules="rules.prefixstatus"
                    dense
                    outlined
                    ></v-select>
                </v-col>

                <v-text-field
                    v-if="params.responses.prefix.status == 'Enable'"
                    v-model="params.responses.prefix.away"
                    label="Away Prefix"
                    @change="add"
                    :rules="rules.prefixaway"
                    dense
                    outlined
                    required
                ></v-text-field>

                <v-text-field
                    v-if="params.responses.prefix.status == 'Enable'"
                    v-model="params.responses.prefix.here"
                    label="Here Prefix"
                    @change="add"
                    :rules="rules.prefixhere"
                    dense
                    outlined
                    required
                ></v-text-field>
            </v-form>
            <v-btn v-if="config.removable" @click="deleteChat(id)" outlined color="red">Delete</v-btn>
        </v-container>
    </div>
</template>

<script>
export default {
     props: ["config", "id"],
     data(){
         return{
            prefixStatus: ['Enable', 'Disable'],
            params: {
                button_text: "",
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
                        status: "Enable"
                    }
                }
            },
            rules: {
                button_text: [v => !!v || 'Button Text is required'],
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
            if(isValid)this.$emit("updateChat", this.config, this.id);
         },
         deleteChat(id){
            this.$emit("deleteChat", id);
         }
     }
}
</script>