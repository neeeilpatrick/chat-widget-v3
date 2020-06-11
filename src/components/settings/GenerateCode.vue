<template>
    <v-container class="mt-5" fluid>
        <v-textarea
          label="Generated Code"
          v-model="jsonFormatCode"
          auto-grow
          outlined
          rows="15"
          row-height="25"
        ></v-textarea>

        <v-btn class="mr-3" outlined  @click="$emit('switchScreen', 3)">
            Back
        </v-btn>
        <v-btn 
        :disabled="dialog"
        :loading="dialog"
        outlined
        @click="show">Copy</v-btn>
        
        <v-dialog
        v-model="dialog"
        hide-overlay
        persistent
        width="300"
        >
        <v-card
            color="#27496d"
            dark
        >
            <v-card-text>
            Please stand by
            <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
            ></v-progress-linear>
            </v-card-text>
        </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    props: ['config'],
    data(){
        return{
            dialog: false,
            jsonFormatCode: "",
            finalConfig: {}
        }
    },
    methods:{
        show(){
            this.dialog = true;

            setTimeout(() => {
this.jsonFormatCode =`<script>
            
var config = ${JSON.stringify(this.config)}
</ script>

<script src="https://msg.everypages.com/prompted-chat/v2/chatwidget.js"></ script>`;
            this.dialog = false;
            }, 3000);
        }
    }
}
</script>