<template>
    <v-container fluid>
        <h1>Chat Bubble</h1>
        <v-form v-model="valid" lazy-validation ref="form">

        <v-text-field outlined :rules="rules.icon" label="Icon" placeholder="https://yourwebsite.com/chaticon.png"></v-text-field>
        <v-text-field outlined :rules="rules.bubbleMessage" label="Bubble Message" placeholder="Hi there, have a question? Text us here."></v-text-field>
        <v-text-field outlined :rules="rules.bubbleImage" label="Bubble Image" placeholder="https://msg.everypages.com/resources/profile.jpg"></v-text-field>

        <v-text-field @click="config.colorScheme.isActive = !config.colorScheme.isActive" v-model="config.colorScheme.hexValue" label="Color Scheme" ></v-text-field>
        <v-color-picker v-if="config.colorScheme.isActive"  :mode.sync="hex" v-model="config.colorScheme.hexValue"></v-color-picker>
        
        <v-text-field @click="config.backgroundColor.isActive = !config.backgroundColor.isActive" v-model="config.backgroundColor.hexValue" label="Background Color" ></v-text-field>
        <v-color-picker v-if="config.backgroundColor.isActive"  :mode.sync="hex" v-model="config.backgroundColor.hexValue"></v-color-picker>
        
        <v-text-field @click="config.textColor.isActive = !config.textColor.isActive" v-model="config.textColor.hexValue" label="Text Color" ></v-text-field>
        <v-color-picker v-if="config.textColor.isActive"  :mode.sync="hex" v-model="config.textColor.hexValue"></v-color-picker>
        
        <v-btn @click="validate" :disabled="!valid" color="primary">
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
                icon: null,
                bubbleMessage: null,
                bubbleImage:null,
                colorScheme: {
                    hexValue: "#589bd6",
                    isActive: false
                },
                backgroundColor: {
                    hexValue: "#9e1a1a",
                    isActive: false
                },
                textColor: {
                    hexValue: "#cf1717",
                    isActive: false
                }
            },
            rules: {
                icon: [v => !!v || 'Icon is required'],
                bubbleMessage: [v => !!v || 'Bubble Message is required'],
                bubbleImage: [v => !!v || 'Bubble Image is required']
            }
        }
    },
    methods:{
        validate(){
            this.$refs.form.validate();
            this.$emit("update", this.config);
        }
    }
}
</script>