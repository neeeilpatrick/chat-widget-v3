<template>
    <div class="mt-10">
        <v-container fluid>
            <v-form lazy-validation ref="form">
                <v-text-field
                    prepend-inner-icon="mdi-card-text"
                    v-model="params.button_text"
                    label="Button Text"
                    @change="add"
                    @click="params.button_text = ''"
                    dense
                    placeholder="Connect with us!"
                    outlined
                    required
                ></v-text-field>

                 <v-text-field
                    prepend-inner-icon="mdi-message-arrow-right"
                    v-model="params.responses.initial"
                    label="Initial Message"
                    @change="add"
                    @click="params.responses.initial = ''"
                    dense
                    placeholder="Please enter your information and we'll send you a text!"
                    outlined
                    required
                ></v-text-field>

                 <v-text-field
                    prepend-inner-icon="mdi-card-account-phone"
                    v-model="params.phone_number"
                    label="Phone Number"
                    @change="add"
                    @click="params.phone_number = ''"
                    dense
                    placeholder="(800) 555-1212"
                    outlined
                    required
                ></v-text-field>

                 <v-text-field
                    prepend-inner-icon="mdi-thumb-up"
                    v-model="params.responses.confirmation.default"
                    label="Confirmation Message"
                    @change="add"
                    @click="params.responses.confirmation.default = ''"
                    dense
                    placeholder="We received your message."
                    outlined
                    required
                ></v-text-field>

                <v-text-field
                    prepend-inner-icon="mdi-exit-run"
                    v-model="params.responses.confirmation.away"
                    label="Away Message"
                    @change="add"
                    @click="params.responses.confirmation.away = ''"
                    dense
                    placeholder="Someone will text you when we get back in"
                    outlined
                    required
                ></v-text-field>

                <v-text-field
                    prepend-inner-icon="mdi-walk"
                    v-model="params.responses.confirmation.here"
                    label="Here Message"
                    @change="add"
                    @click="params.responses.confirmation.here = ''"
                    dense
                    placeholder="Someone will reach you shortly"
                    outlined
                    required
                ></v-text-field>

                <v-col class="d-flex" cols="12" sm="6">
                    <v-select
                    v-model="params.responses.prefix.status"
                    :items="prefixStatus"
                    label="Status"
                    @change="add"
                    @click="params.responses.prefix.status = ''"
                    dense
                    outlined
                    ></v-select>
                </v-col>

                <v-text-field
                    v-if="params.responses.prefix.status == 'Enable'"
                    v-model="params.responses.prefix.away"
                    label="Away Prefix"
                    @change="add"
                    @click="params.responses.prefix.away = ''"
                    dense
                    placeholder="WebChatAway"
                    outlined
                    required
                ></v-text-field>

                <v-text-field
                    v-if="params.responses.prefix.status == 'Enable'"
                    v-model="params.responses.prefix.here"
                    label="Here Prefix"
                    @change="add"
                    @click="params.responses.prefix.here = ''"
                    dense
                    placeholder="WebChatHere"
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
         }
     },
     mounted(){
        if(typeof this.config.params !="undefined"){
            this.params = this.config.params;
        }
     },
     methods: {
         add(){
            if(this.params.button_text.length <= 0) this.params.button_text = "Connect with us!";
            if(this.params.phone_number.length <= 0) this.params.phone_number = "(800) 555-1212";
            if(this.params.responses.initial.length <= 0) this.params.responses.initial = "Please enter your information and we'll send you a text!";
            if(this.params.responses.confirmation.away.length <= 0) this.params.responses.confirmation.away = "Someone will text you when we get back in";
            if(this.params.responses.confirmation.here.length <= 0) this.params.responses.confirmation.here = "Someone will reach you shortly";
            if(this.params.responses.confirmation.default.length <= 0) this.params.responses.confirmation.default = "We received your message.";
            if(this.params.responses.prefix.here.length <= 0) this.params.responses.prefix.here = "WebChatHere";
            if(this.params.responses.prefix.away.length <= 0) this.params.responses.prefix.away = "WebChatAway";

            this.config.params = this.params;
            this.$emit("updateChat", this.config, this.id);
         },
         deleteChat(id){
            this.$emit("deleteChat", id);
         }
     }
}
</script>

<style scoped>
.v-icon.v-ivon{
    font-size: 15px !important;
}
</style>