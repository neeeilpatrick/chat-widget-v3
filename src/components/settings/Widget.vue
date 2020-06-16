<template>
    <v-container class="mt-12 pl-12 pr-12" fluid>
        <v-form lazy-validation v-model="valid" ref="form">
            <v-radio-group
                     dense v-model="config.image_style" row>
                <v-radio label="Picture" value="picture"></v-radio>
                <v-radio label="Icon" value="icon"></v-radio>
                <v-radio label="No Image" value="no-image"></v-radio>
            </v-radio-group>

            <v-text-field
                    class="mb-3"
                    prepend-inner-icon="mdi-file-image"
                    @click="config.image_url = ''"
                    @change="validate"
                    v-if="config.image_style=='picture'"
                    v-model="config.image_url"
                    dense
                    label="Image Link"
                    placeholder="https://msg.everypages.com/resources/profile.jpg"
                    outlined
                ></v-text-field>

            <v-text-field
                    class="mb-3"
                    prepend-inner-icon="mdi-format-line-style"
                    @click="config.header_line_1 = ''"
                    @change="validate"
                    v-model="config.header_line_1"
                    dense
                    label="Header"
                    placeholder="Hello!"
                    outlined
                ></v-text-field>

            <v-text-field
                    class="mb-3"
                    prepend-inner-icon="mdi-format-font"
                    @click="config.header_line_2 = ''"
                    @change="validate"
                    v-model="config.header_line_2"
                    dense
                    label="Subheader"
                    placeholder="What can we help you with?"
                    outlined
                ></v-text-field>

            <v-text-field
                    class="mb-3"
                    prepend-inner-icon="mdi-android-messages"
                    @click="config.welcome_message = ''"
                    @change="validate"
                    v-model="config.welcome_message"
                    dense
                    label="Welcome Message"
                    placeholder="Welcome! Click one of the buttons to get started!"
                    outlined
                ></v-text-field>

            <v-text-field
                    class="mb-3"
                    prepend-inner-icon="mdi-format-title"
                    v-model="powered_by_title"
                    dense
                    label="PoweredBy Title"
                    placeholder="Go High Level"
                    outlined
                ></v-text-field>

            <v-text-field
                    class="mb-3"
                    prepend-inner-icon="mdi-cellphone-link"
                    v-model="powered_by_link"
                    dense
                    label="PoweredBy Link"
                    placeholder="https://gohighlevel.com/home-page"
                    outlined
                ></v-text-field>
        </v-form>
    </v-container>
</template>

<script>
export default {
    props: ['importConfig'],
    data(){
        return {
            valid: true,
            increment: 0,
            config: {
                image_style: "picture",
                bubble: true,
                image_url: "",
                header_line_1: "",
                header_line_2: "",
                welcome_message: "",
                powered_by: "",
            },
            powered_by_title: "",
            powered_by_link: "",
        }
    },
    watch: {
        importConfig(){
            if(typeof this.importConfig != "undefined"){
                this.config = this.importConfig;
            }
        }
    },
    methods: {
        validate(){
            if(this.config.image_style == 'picture')
            if(this.config.image_url.length <= 0) this.config.image_url = 'https://msg.everypages.com/resources/profile.jpg';
            
            if(this.config.header_line_1.length <= 0) this.config.header_line_1 = 'Hello!';
            if(this.config.header_line_2.length <= 0) this.config.header_line_2 = 'What can we help you with?';
            if(this.config.welcome_message.length <= 0) this.config.welcome_message = 'Welcome! Click one of the buttons to get started!';
            if(this.powered_by_link.length <= 0) this.powered_by_link = 'https://gohighlevel.com/home-page';
            if(this.powered_by_title.length <= 0) this.powered_by_title = 'Go High Level';


            var poweredByInterpolated = `<a href='${this.powered_by_link}' target='_blank'>${this.powered_by_title}</a>`;
            this.config.powered_by = poweredByInterpolated;

            this.$emit("update", this.config);
            
        },
    }
}
</script>

<style scoped>
.v-icon.v-ivon{
    font-size: 15px !important;
}
</style>