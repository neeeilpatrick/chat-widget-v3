<template>
    <v-container class="mt-5 pl-12 pr-12" fluid>
        <v-form lazy-validation ref="form">

        <v-text-field 
            class="mb-3"
            prepend-inner-icon="mdi-image-edit"
            dense
            outlined
            v-model="config.svg" 
            label="Icon"
            @change="validate"
            @click="config.svg = ''"
            placeholder="https://yourwebsite.com/chaticon.png">
        </v-text-field>

        <v-text-field 
            class="mb-3"
            prepend-inner-icon="mdi-message-alert"
            dense
            outlined
            v-model="config.bubble_message" 
            label="Bubble Message"
            @change="validate"
            @click="config.bubble_message = ''"
            placeholder="Hi there, have a question? Text us here.">
        </v-text-field>

        <v-text-field 
            class="mb-3"
            prepend-inner-icon="mdi-image-area-close"
            dense
            outlined
            v-model="config.bubble_image" 
            label="Bubble Image"
            @change="validate"
            @click="config.bubble_image = ''"
            placeholder="https://msg.everypages.com/resources/profile.jpg">
        </v-text-field>

        <v-row>
            <v-col cols="4">
                <v-switch dense outlined v-model="config.bubble_on_mobile" label="Appear On Mobile"></v-switch>
            </v-col>
        </v-row>
        </v-form>

        <v-row v-click-outside="hideColorPicker">
            <v-col cols="12" sm="4">
                <v-card>
                    <v-container fluid>
                    <v-row>
                        <v-col cols="12" sm="8">
                            <p style="font-size: 10pt;">Color Scheme</p>
                            <p style="font-size: 10pt;">{{config.color_scheme}}</p>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <div v-bind:style="{background: config.color_scheme}" @click="color_scheme_active = !color_scheme_active; bubble_background_active = false; bubble_text_color_active = false" id="colorScheme"></div>
                        </v-col>
                    </v-row>
                    </v-container>
                    
                    <div class="colorPicker">
                        <v-color-picker v-if="color_scheme_active" v-model="config.color_scheme"></v-color-picker>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="12" sm="4">
              <v-card>
                  <v-container fluid>
                  <v-row>
                      <v-col cols="12" sm="8">
                            <p style="font-size: 10pt;">Bubble Background</p>
                            <p style="font-size: 10pt;"> {{config.bubble_background}}</p>
                      </v-col>

                      <v-col cols="12" sm="4">
                          <div  v-bind:style="{background: config.bubble_background}" @click="bubble_background_active = true; color_scheme_active = false; bubble_text_color_active = false"  id="colorBackground"></div>
                      </v-col>
                  </v-row>   
                  </v-container>

                    <div class="colorPicker">
                        <v-color-picker v-if="bubble_background_active" v-model="config.bubble_background"></v-color-picker>
                    </div>
              </v-card>
            </v-col>

            <v-col cols="12" sm="4">
               <v-card>
                   <v-container fluid>
                   <v-row>
                       <v-col cols="12" sm="8">
                            <p style="font-size: 10pt;">Bubble Text Color</p>
                            <p style="font-size: 10pt;">{{config.bubble_text_color}}</p>
                       </v-col>

                       <v-col cols="12" sm="4">
                            <div v-bind:style="{background: config.bubble_text_color}" @click="bubble_text_color_active = !bubble_text_color_active; color_scheme_active = false; bubble_background_active = false"  id="colorBubble"></div>
                       </v-col>
                   </v-row>
                   </v-container>

                    <div class="colorPicker">
                        <v-color-picker v-if="bubble_text_color_active" v-model="config.bubble_text_color"></v-color-picker>
                    </div>
               </v-card>
            </v-col>
        </v-row>
       
    </v-container>
</template>

<script>
import ClickOutside from 'vue-click-outside' 

export default {
    directives: {
        ClickOutside
    },
    data(){
        return {
            config: {
                svg: "",
                bubble_image: "",
                bubble_message: "",
                bubble_on_mobile: false,
                color_scheme: "#589bd6",
                bubble_background: "#9e1a1a", 
                bubble_text_color: "#cf1717",
                 
            },
            color_scheme_active: false,
            bubble_background_active: false,
            bubble_text_color_active: false,
        }
    },
    methods:{
        validate(){
            if(this.config.svg.length <=0) this.config.svg = 'https://yourwebsite.com/chaticon.png';
            if(this.config.bubble_message.length <=0) this.config.bubble_message = 'Hi there, have a question? Text us here.';
            if(this.config.bubble_image.length <=0) this.config.bubble_image = 'https://msg.everypages.com/resources/profile.jpg';
            
            this.$emit("update", this.config);      
        },
        hideColorPicker(){
            this.color_scheme_active = false;
            this.bubble_background_active = false;
            this.bubble_text_color_active = false;  
        }
    }
}
</script>

<style scoped>
#colorScheme, #colorBackground, #colorBubble{
        background: beige;
        border-radius: 50%;
        border: solid 1px gray;
        height: 20pt;
        width: 20pt;
        margin-top: 5pt !important;


}

.colorPicker{
    position: absolute;
    z-index: 5;
    bottom: 30pt;
}

.v-icon.v-icon{
    font-size: 15px !important;
}

.v-application p{
    margin: 0pt !important;
}

</style>