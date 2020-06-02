<template>
    <div>
        <v-card>
            <v-stepper>
                <v-stepper-header>
                    <v-stepper-step
                        editable
                        alt-labels
                        step="1"
                        @click="openFeature(false)"
                    >
                        Business Settings
                    </v-stepper-step>
                    <v-divider></v-divider>


                    <v-stepper-step
                        editable
                        alt-labels
                        step="2"
                        @click="openFeature(false)"
                    >
                        Proactive Chat Bubble
                    </v-stepper-step>
                    <v-divider></v-divider>


                    <v-stepper-step
                        editable
                        alt-labels
                        step="3"
                        @click="openFeature(true)"
                    >
                        Features
                    </v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step
                        editable
                        alt-labels
                        step="4"
                        @click="openFeature(false)"
                    >
                        Widget
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1" >
                        <v-card height="auto" class="stepperCard">
                            <Business />
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="2" >
                        <v-card height="auto" class="stepperCard">
                            <ChatBubble @update="chatBubble" />
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="3" >
                        <v-card height="auto" class="stepperCard">
                            <Features />
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="4" >
                        <v-card height="auto" class="stepperCard">
                            <Widget @update="widget" />
                        </v-card>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-card>
    </div>
</template>

<style scoped>
.stepperCard{
    height: auto;
    width: 500pt;
    margin: auto;
}
</style>

<script>
import Business from './../components/settings/Business';
import ChatBubble from './../components/settings/ChatBubble';
import Features from './../components/settings/Features';
import Widget from './../components/settings/Widget';


export default {
    components: {
        Business,
        ChatBubble,
        Features,
        Widget
    },
    props: ["location"],
    methods: {
        chatBubble(config){
            this.location.chatBuble = config;
        },
        widget(config){
            this.location.widget = config;
        },
        openFeature(toggle){
            this.$emit('openFeature', toggle);
        }
    }
}
</script>