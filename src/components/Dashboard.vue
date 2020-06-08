<template>
    <div>
        <v-card>
            {{generateCodeController}}
            <v-stepper class="elevation-0" >
                <v-stepper-header>

                    <v-stepper-step
                        editable
                        alt-labels
                        step="1"
                        @click="openFeature(true)"
                    >
                        Features
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
                        @click="openFeature(false)"
                    >
                        Widget
                    </v-stepper-step>
                    <v-divider></v-divider>
                    
                    <v-stepper-step
                        editable
                        alt-labels
                        step="4"
                        @click="openFeature(false)"
                    >
                        Generate Code
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items class="elevation-0">
                    

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


                    <v-stepper-content step="1" >
                        <Navbar :locations="locations" @displayLocation="display" />
                        <v-row no-gutters>       
                            <v-col cols="12" sm="8">
                                <v-card height="450pt" class="elevation-0 featureCard stepperCard">
                                    <Features  :data="featuresConfig" @delete="deleteFeatures" @update="features" />
                                </v-card>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-card height="420pt" class="gray lighten-1">
                                    <v-card-text>
                                        <h1 style="text-align:center;">This is view</h1>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="3" >
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

                    <v-stepper-content step="4">
                        <v-row no-gutters>
                            <v-col cols="12" sm="8">
                                <v-card height="auto" class="elevation-0 stepperCard">
                                    <GenerateCode :config="generateCodeController" />
                                </v-card>
                            </v-col>

                            <v-col cols="12" sm="4">
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
    width: auto;
    margin: auto;
}

.featureCard{
    margin-left: 200pt;
    width: 520pt !important;
    overflow-x: hidden;
    overflow-y: auto;
}



</style>

<script>
import ChatBubble from './../components/settings/ChatBubble';
import Features from './../components/settings/Features';
import Widget from './../components/settings/Widget';
import GenerateCode from './../components/settings/GenerateCode'
import Navbar from './../components/Navbar';


export default {
    components: {
        ChatBubble,
        Features,
        Widget,
        Navbar,
        GenerateCode
    },
    props: ["location"],
    data(){
        return{
            chatBubbleConfig: {},
            widgetConfig: {},
            featuresConfig: [],
            locations: [{
                zipcode: "9000",
                address: "CDO",
                id: "132",
                name: "Cagayan de Oro",
                features:[
                {
                    type:"Custom Link",
                    removable:true,
                    params:{
                        buttontext:"1",
                        link:"1"
                    }
                },
                 {
                    type:"Custom Link",
                    removable:true,
                    params:{
                        buttontext:"2",
                        link:"2"
                    }
                }
            ]
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
            var jsonData = {...this.chatBubbleConfig, ...this.widgetConfig, locations: this.locations}
            return jsonData;
        }
    },
    methods: {
        chatBubble(config){
            this.chatBubbleConfig = config; 
        },
        widget(config){
            this.widgetConfig = config;
        },
        features(config, id){
            if(config.type == "Review")
            if(config.params.status == "Enable") this.$set(this.featuresConfig, id, config); 
            else this.$set(this.featuresConfig, id, null); 
            else this.$set(this.featuresConfig, id, config);

            this.updateLocation(this.currentLocation);
        },
        updateLocation(location){
            var id = this.locations.findIndex((value => value.id == location.id));
            var filtered = this.featuresConfig.filter(function (el) { return el != null; });
            this.locations[id].features = filtered;

            console.log(this.locations);
        },
        deleteFeatures(id){
            this.featuresConfig.splice(id, 1);
        },
        addNewLocation(location){
            this.locations.push(location);
        },

        display(location){
            this.currentLocation = location
            if(typeof this.currentLocation.features != "undefined"){
                this.featuresConfig = this.currentLocation.features;
            }
            else{
                this.featuresConfig = [
                {
                    type: 'Chat',
                    removable: false
                    
                },
                {
                    type: 'Review',
                    removable: false,
                }]
            }

        },
        openFeature(toggle){
            this.toggleFeatureNav = toggle;
            // this.$emit('openFeature', toggle);
        }
        
    }
}
</script>