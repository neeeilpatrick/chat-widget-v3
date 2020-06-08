<template>
    <v-container fluid>
        <v-form v-model="valid" lazy-validation ref="form">

        <v-text-field outlined v-model="config.svg" :rules="rules.icon" label="Icon" placeholder="https://yourwebsite.com/chaticon.png"></v-text-field>
        <v-text-field outlined v-model="config.bubble_message" :rules="rules.bubbleMessage" label="Bubble Message" placeholder="Hi there, have a question? Text us here."></v-text-field>
        <v-text-field outlined v-model="config.bubble_image" :rules="rules.bubbleImage" label="Bubble Image" placeholder="https://msg.everypages.com/resources/profile.jpg"></v-text-field>

        <v-row>
            <v-col cols="4">
                <v-switch v-model="config.bubble_on_mobile" label="Appear On Mobile"></v-switch>
            </v-col>
        </v-row>


            <v-row>
                <v-col cols="12" sm="4">
                    <div v-bind:style="{background: config.color_scheme}" @click="color_scheme_active = !color_scheme_active; bubble_background_active = false; bubble_text_color_active = false" id="colorScheme"></div>
                    <div class="colorPicker">
                        <v-color-picker @change="editColorScheme" v-if="color_scheme_active" :mode.sync="hex" v-model="config.color_scheme"></v-color-picker>
                    </div>
                </v-col>

                <v-col cols="12" sm="4">
                    <div v-bind:style="{background: config.bubble_background}" @click="bubble_background_active = !bubble_background_active; color_scheme_active = false; bubble_text_color_active = false"  id="colorBackground"></div>
                    <div class="colorPicker">
                        <v-color-picker v-if="bubble_background_active" :mode.sync="hex" v-model="config.bubble_background"></v-color-picker>
                    </div>
                </v-col>

                <v-col cols="12" sm="4">
                    <div v-bind:style="{background: config.bubble_text_color}" @click="bubble_text_color_active = !bubble_text_color_active; color_scheme_active = false; bubble_background_active = false"  id="colorBubble"></div>
                    <div class="colorPicker">
                        <v-color-picker v-if="bubble_text_color_active" :mode.sync="hex" v-model="config.bubble_text_color"></v-color-picker>
                    </div>
                </v-col>
            </v-row>
        
        <v-btn class="mr-3 mt-3" outlined  @click="$emit('switchScreen', 1)">
            Back
        </v-btn>
        <v-btn @click="validate" outlined :disabled="!valid" class="mt-3" color="primary">
             Next
        </v-btn>
        </v-form>
       
    </v-container>
</template>

<script>
export default {
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
    methods:{
        validate(){
            var isValid = this.$refs.form.validate();
            if(isValid) this.$emit("update", this.config);
            this.$emit('switchScreen', 3)
        },
        editColorScheme(){
            document.getElementById("colorScheme").style.backgroundColor = this.config.color_scheme;
        }

    }
}
</script>

<style scoped>
#colorScheme, #colorBackground, #colorBubble{
        background: beige;
        border-radius: 50%;
        border: solid 2px;
        height: 50pt;
        width: 50pt;
        margin: auto !important;

}

.colorPicker{
    position: absolute;
    z-index: 2;
    bottom: 185pt;
}

</style>