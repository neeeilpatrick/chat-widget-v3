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

        <v-expansion-panels
                class="mr-5 mt-3"
                :accordion="true"
                :tile="false"
        >

        <v-expansion-panel>
                <v-expansion-panel-header>Color Scheme</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-text-field v-model="config.color_scheme" label="Color Scheme" ></v-text-field>
                    <v-color-picker :mode.sync="hex" v-model="config.color_scheme"></v-color-picker>
                </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
                <v-expansion-panel-header>Background Color</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-text-field v-model="config.bubble_background" label="Background Color" ></v-text-field>
                    <v-color-picker :mode.sync="hex" v-model="config.bubble_background"></v-color-picker>
                </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
                <v-expansion-panel-header>Text Color</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-text-field v-model="config.bubble_text_color" label="Text Color" ></v-text-field>
                    <v-color-picker :mode.sync="hex" v-model="config.bubble_text_color"></v-color-picker>
                </v-expansion-panel-content>
        </v-expansion-panel>

        </v-expansion-panels>
        
        
        
        
        
        <v-btn @click="validate" :disabled="!valid" class="mt-3" color="primary">
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
        },

    }
}
</script>