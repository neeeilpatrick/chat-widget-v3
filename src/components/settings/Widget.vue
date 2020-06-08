<template>
    <v-container fluid>
        <v-form lazy-validation v-model="valid" ref="form">
            <v-radio-group v-model="config.image_style" row>
                <v-radio label="Picture" value="picture"></v-radio>
                <v-radio label="Icon" value="icon"></v-radio>
                <v-radio label="No Image" value="no-image"></v-radio>
            </v-radio-group>

            <v-text-field 
                    v-if="config.image_style=='picture'"
                    v-model="config.image_url"
                    :rules="rules.image_url"
                    label="Image Link"
                    placeholder="https://msg.everypages.com/resources/profile.jpg"
                    outlined
                ></v-text-field>

            <v-text-field 
                    v-model="config.header_line_1"
                    :rules="rules.header_line_1"
                    label="Header"
                    placeholder="Hello!"
                    outlined
                ></v-text-field>

            <v-text-field 
                    v-model="config.header_line_2"
                    :rules="rules.header_line_2"
                    label="Subheader"
                    placeholder="What can we help you with?"
                    outlined
                ></v-text-field>

            <v-text-field 
                    v-model="config.welcome_message"
                    :rules="rules.welcome_message"
                    label="Welcome Message"
                    placeholder="Welcome! Click one of the buttons to get started!"
                    outlined
                ></v-text-field>

            <v-text-field 
                    v-model="powered_by_title"
                    label="PoweredBy Title"
                    placeholder="Go High Level"
                    outlined
                ></v-text-field>

            <v-text-field 
                    v-model="powered_by_link"
                    label="PoweredBy Link"
                    placeholder="https://gohighlevel.com/home-page"
                    outlined
                ></v-text-field>

        </v-form>

        <v-btn class="mr-3" outlined  @click="$emit('switchScreen', 2)">
            Back
        </v-btn>
        <v-btn depressed color="primary" outlined :disabled="!valid" @click="validate">Next</v-btn>

    </v-container>
</template>

<script>
export default {
    data(){
        return {
            valid: true,
            increment: 0,
            config: {
                image_style: "picture",
                image_url: "",
                header_line_1: "",
                header_line_2: "",
                welcome_message: "",
                powered_by: "",
            },
            powered_by_title: "",
            powered_by_link: "",
            rules: {
                image_url:  [ v => !!v || 'Image link is required' ],
                header_line_1:  [ v => !!v || 'Header is required' ],
                header_line_2:  [ v => !!v || 'Subheader is required' ],
                welcome_message: [ v => !!v || 'Welcome message is required' ]
            }
        }
    },
    methods: {
        validate(){
            var isValid = this.$refs.form.validate();
            var poweredByInterpolated = `<a href='${this.powered_by_link}' target='_blank'>${this.powered_by_title}</a>`;
            this.config.powered_by = poweredByInterpolated;


            if(isValid) this.$emit("update", this.config);
            this.$emit('switchScreen', 4)
        }
    }
}
</script>

<style scoped>

</style>
