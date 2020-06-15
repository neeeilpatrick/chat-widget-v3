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
            <v-col  cols="12" sm="4">
                <div v-bind:style="{background: config.color_scheme}" @click="color_scheme_active = !color_scheme_active; bubble_background_active = false; bubble_text_color_active = false" id="colorScheme"></div>
                <p style="text-align:center; font-size: 10pt;">Color Scheme</p>
                <div class="colorPicker">
                    <v-color-picker v-if="color_scheme_active" :mode.sync="hex" v-model="config.color_scheme"></v-color-picker>
                </div>
            </v-col>

            <v-col cols="12" sm="4">
                <div  v-bind:style="{background: config.bubble_background}" @click="bubble_background_active = true; color_scheme_active = false; bubble_text_color_active = false"  id="colorBackground"></div>
                <p style="text-align:center; font-size: 10pt;">Bubble Background</p>
                <div class="colorPicker">
                    <v-color-picker v-if="bubble_background_active" :mode.sync="hex" v-model="config.bubble_background"></v-color-picker>
                </div>
            </v-col>

            <v-col cols="12" sm="4">
                <div v-bind:style="{background: config.bubble_text_color}" @click="bubble_text_color_active = !bubble_text_color_active; color_scheme_active = false; bubble_background_active = false"  id="colorBubble"></div>
                <p style="text-align:center; font-size: 10pt;">Bubble Text Color</p>
                <div class="colorPicker">
                    <v-color-picker v-if="bubble_text_color_active" :mode.sync="hex" v-model="config.bubble_text_color"></v-color-picker>
                </div>
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
        height: 15pt;
        width: 15pt;
        margin: auto !important;

}

.colorPicker{
    position: absolute;
    z-index: 5;
    bottom: 180pt;
}

.v-icon.v-icon{
    font-size: 15px !important;
}

</style>