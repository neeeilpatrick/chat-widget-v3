<template>
    <div>
        {{generateCodeController}}
        <v-card>
            <v-stepper class="elevation-0" >
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

                <v-stepper-items class="elevation-0">
                    <v-stepper-content step="1" >
                        <v-row no-gutters>
                            <v-col cols-6>
                                <v-card height="auto" class="elevation-0">
                                    <Business />
                                </v-card>
                            </v-col>

                            <v-col cols-6>
                                <v-card height="420pt" class="gray lighten-1">
                                    <v-card-text>
                                        <h1 style="text-align:center;">This is view</h1>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="2" >
                        <v-row no-gutters>
                            <v-col cols-6>
                                <v-card height="auto" class="elevation-0">
                                    <ChatBubble @update="chatBubble" />
                                </v-card>
                            </v-col>

                            <v-col cols-6>
                                <v-card height="420pt" class="gray lighten-1">
                                    <v-card-text>
                                        <h1 style="text-align:center;">This is view</h1>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="3" >
                        <Navbar :locations="locations" @displayLocation="display" />
                        <v-row no-gutters>
                            <v-col cols-6>
                                <v-card height="450pt" class="elevation-0 stepperCard">
                                    <Features />
                                </v-card>
                            </v-col>

                            <v-col cols-6>
                                <v-card height="420pt" class="gray lighten-1">
                                    <v-card-text>
                                        <h1 style="text-align:center;">This is view</h1>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="4" >
                        <v-row no-gutters>
                            <v-col cols-6>
                                <v-card height="auto" class="elevation-0 stepperCard">
                                    <Widget @update="widget" />
                                </v-card>
                            </v-col>

                            <v-col cols-6>
                                <v-card height="450pt" class="gray lighten-1">
                                    <v-card-text>
                                        <h1 style="text-align:center;">This is view</h1>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
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
import Navbar from './../components/Navbar';


export default {
    components: {
        Business,
        ChatBubble,
        Features,
        Widget,
        Navbar
    },
    props: ["location"],
    data(){
        return{
            chatBubbleConfig: {},
            widgetConfig: {},
            locations: [{
                zipcode: "9000",
                address: "CDO",
                id: "132",
                name: "Cagayan de Oro"
            },{
                zipcode: "9001",
                address: "Lanao del Norte",
                id: "ldn",
                name: "Candis, Tubod LDN"
            }]
        }
    },
    computed: {
        generateCodeController(){
            var jsonData = {...this.chatBubbleConfig, ...this.widgetConfig}
            var jsonFormatCode =`<script>var config = ${JSON.stringify(jsonData)}</ script> \n \n <script src="https://msg.everypages.com/prompted-chat/v2/chatwidget.js"></ script>`;
            return jsonFormatCode;
        }
    },
    methods: {
        chatBubble(config){
            this.chatBubbleConfig = config; 
        },
        widget(config){
            this.widgetConfig = config;
        },
        addNewLocation(location){
            this.locations.push(location);
        },

        display(location){
            this.currentLocation = location
        },
        openFeature(toggle){
            this.toggleFeatureNav = toggle;
            // this.$emit('openFeature', toggle);
        }
        
    }
}
</script>