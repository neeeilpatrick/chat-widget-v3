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
        v-model="copyStatus"
        hide-overlay
        persistent
        width="300"
        >
            <v-card
                color="#27496d"
                dark
                class="ma-auto"
                style="text-align: center;"
            >
                Successfully copied config to Clipboard
        </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
 
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

export default {
    props: ['config', 'loader'],
    data(){
        return{
            copyStatus: false,
            jsonFormatCode: "",
            finalConfig: {}
        }
    },
    watch: {
        loader: function(val){
            if(!val){
    this.jsonFormatCode =`<script>
            
var config = ${JSON.stringify(this.config)}
</ script>

<script src="https://msg.everypages.com/prompted-chat/v2/chatwidget.js"></ script>`;
            }
        }
    },
    methods:{
        show(){
            this.doCopy();
        },
        doCopy() {
            var _self = this;
            _self.$copyText(_self.jsonFormatCode).then(function (e) {
            _self.copyStatus = true;
                console.log(e);
                setTimeout(() => { _self.copyStatus = false }, 2000);
            }, function (e) {
                alert('Can not copy')
                console.log(e)
            })
      }
    }
}
</script>