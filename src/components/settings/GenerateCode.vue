<template>
    <v-container class="mt-5" fluid>
        <v-textarea
            class="generatedCode"
          label="Generated Code"
          v-model="jsonFormatCode"
          style="height: 500px;"
          outlined
          rows="15"
          row-height="25"
        ></v-textarea>
        <v-btn 
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

<style scoped>
#input-130::-webkit-scrollbar {
    width: 3px;
    background-color: #F5F5F5 !important;
    visibility: hidden !important;
} 

#input-130::-webkit-scrollbar-thumb {
    background-color: #1565C0 !important;

}

#input-130::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3) !important;
    background-color: #F5F5F5 !important;
}
</style>