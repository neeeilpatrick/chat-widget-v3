<template>
    <v-container fluid>
        <v-textarea
          label="Generated Code"
          v-model="jsonFormatCode"
          auto-grow
          outlined
          rows="15"
          row-height="25"
          shaped
        ></v-textarea>

        <v-btn @click="show">Copy</v-btn>
    </v-container>
</template>

<script>
export default {
    props: ['config'],
    data(){
        return{
            jsonFormatCode: "",
            finalConfig: {}
        }
    },
    methods:{
        show(){
            this.jsonFormatCode =`<script>
            
var config = ${JSON.stringify(this.config)}

</ script>

<script src="https://msg.everypages.com/prompted-chat/v2/chatwidget.js"></ script>`;


        }
    }
}
</script>