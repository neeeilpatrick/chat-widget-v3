<template>
    <v-container fluid>
        <h1>Widget</h1>
        

        <v-form lazy-validation v-model="valid" ref="form">

            <v-radio-group v-model="config.imageStyle" row>
                <v-radio label="Picture" value="picture"></v-radio>
                <v-radio label="Icon" value="icon"></v-radio>
                <v-radio label="No Image" value="no-image"></v-radio>
            </v-radio-group>

            <v-text-field 
                    v-if="config.imageStyle=='picture'"
                    v-model="config.imageLink"
                    :rules="rules.imageLink"
                    label="Image Link"
                    placeholder="https://msg.everypages.com/resources/profile.jpg"
                    outlined
                ></v-text-field>

            <v-text-field 
                    v-model="config.header"
                    :rules="rules.header"
                    label="Header"
                    placeholder="Hello!"
                    outlined
                ></v-text-field>

            <v-text-field 
                    v-model="config.subheader"
                    :rules="rules.subheader"
                    label="Subheader"
                    placeholder="What can we help you with?"
                    outlined
                ></v-text-field>

            <v-text-field 
                    v-model="config.welcomeMessage"
                    :rules="rules.welcomeMessage"
                    label="Welcome Message"
                    placeholder="Welcome! Click one of the buttons to get started!"
                    outlined
                ></v-text-field>

            <v-text-field 
                    v-model="config.poweredByTitle"
                    label="PoweredBy Title"
                    placeholder="Go High Level"
                    outlined
                ></v-text-field>

            <v-text-field 
                    v-model="config.poweredByLink"
                    label="PoweredBy Link"
                    placeholder="https://gohighlevel.com/home-page"
                    outlined
                ></v-text-field>

        </v-form>

        <v-btn depressed color="primary" :disabled="!valid" @click="validate">Next</v-btn>

    </v-container>
</template>

<script>
export default {
    data(){
        return {
            valid: true,
            config: {
                imageStyle: "picture",
                imageLink: "",
                header: "",
                subheader: "",
                welcomeMessage: "",
                poweredByTitle: "",
                poweredByLink: ""
            },
            rules: {
                imageLink:  [ v => !!v || 'Image link is required' ],
                header:  [ v => !!v || 'Header is required' ],
                subheader:  [ v => !!v || 'Subheader is required' ],
                welcomeMessage: [ v => !!v || 'Welcome message is required' ]
            }
        }
    },
    methods: {
        validate(){
            this.$refs.form.validate();
            this.$emit('update', this.config);
        }
    }
}
</script>

<style scoped>

</style>