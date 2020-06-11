<template>
    <v-container class="mt-5 pl-12 pr-12" fluid>
        <v-form v-model="valid" lazy-validation ref="form">

        <v-text-field 
            class="mb-3"
            prepend-inner-icon="mdi-image-edit"
            dense
            outlined
            v-model="config.svg" 
            :rules="rules.icon" 
            label="Icon"
            @change="nextButtonActive" 
            placeholder="https://yourwebsite.com/chaticon.png">
        </v-text-field>

        <v-text-field 
            class="mb-3"
            prepend-inner-icon="mdi-message-alert"
            dense
            outlined
            v-model="config.bubble_message" 
            :rules="rules.bubbleMessage" 
            label="Bubble Message"
            @change="nextButtonActive" 
            placeholder="Hi there, have a question? Text us here.">
        </v-text-field>

        <v-text-field 
            class="mb-3"
            prepend-inner-icon="mdi-image-area-close"
            dense
            outlined
            v-model="config.bubble_image" 
            :rules="rules.bubbleImage" 
            label="Bubble Image"
            @change="nextButtonActive" 
            placeholder="https://msg.everypages.com/resources/profile.jpg">
        </v-text-field>

        <v-row>
            <v-col cols="4">
                <v-switch dense outlined v-model="config.bubble_on_mobile" label="Appear On Mobile"></v-switch>
            </v-col>
        </v-row>
        </v-form>

        <v-row>
            <v-col cols="12" sm="4">
                <div v-click-outside="hideColorPicker" v-bind:style="{background: config.color_scheme}" @click="color_scheme_active = !color_scheme_active; bubble_background_active = false; bubble_text_color_active = false" id="colorScheme"></div>
                <p style="text-align:center; font-size: 10pt;">Color Sceme</p>
                <div class="colorPicker">
                    <v-color-picker v-show="color_scheme_active" :mode.sync="hex" v-model="config.color_scheme"></v-color-picker>
                </div>
            </v-col>

            <v-col cols="12" sm="4">
                <div v-click-outside="hideColorPicker" v-bind:style="{background: config.bubble_background}" @click="bubble_background_active = !bubble_background_active; color_scheme_active = false; bubble_text_color_active = false"  id="colorBackground"></div>
                <p style="text-align:center; font-size: 10pt;">Bubble Background</p>
                <div class="colorPicker">
                    <v-color-picker v-show="bubble_background_active" :mode.sync="hex" v-model="config.bubble_background"></v-color-picker>
                </div>
            </v-col>

            <v-col cols="12" sm="4">
                <div v-click-outside="hideColorPicker" v-bind:style="{background: config.bubble_text_color}" @click="bubble_text_color_active = !bubble_text_color_active; color_scheme_active = false; bubble_background_active = false"  id="colorBubble"></div>
                <p style="text-align:center; font-size: 10pt;">Bubble Text Color</p>
                <div class="colorPicker">
                    <v-color-picker v-show="bubble_text_color_active" :mode.sync="hex" v-model="config.bubble_text_color"></v-color-picker>
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
            valid: true,
            config: {
                svg: null,
                bubble_image: null,
                bubble_message: null,
                bubble_on_mobile: false,
                color_scheme: "#589bd6",
                bubble_background: "#9e1a1a", 
                bubble_text_color: "#cf1717",
                 
            },
            color_scheme_active: false,
            bubble_background_active: false,
            bubble_text_color_active: false,
            rules: {
                icon: [v => !!v || 'Icon is required'],
                bubbleMessage: [v => !!v || 'Bubble Message is required'],
                bubbleImage: [v => !!v || 'Bubble Image is required']
            }
        }
    },
    mounted(){
        this.popupItem = this.$el
    },
    methods:{
        validate(){
            var isValid = this.$refs.form.validate();
            if(isValid){
                this.$emit("update", this.config);
                this.$emit('switchScreen', 3);
            }
        },
        nextButtonActive(){
            var isValid = this.$refs.form.validate();
            if(isValid) this.$emit("nextBtnStatus", true, "chat-bubble")
            else this.$emit("nextBtnStatus", false, "chat-bubble")
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
        border: solid 1px;
        height: 15pt;
        width: 15pt;
        margin: auto !important;

}

.colorPicker{
    position: absolute;
    z-index: 2;
    bottom: 250pt;
}

.v-icon.v-icon{
    font-size: 15px !important;
}

</style>