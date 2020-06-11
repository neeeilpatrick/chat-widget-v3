<template>
    <div> 
        <v-card style="border-radius:0px;" class="mt-6 mr-10 ml-10 elavation-23">
            <v-stepper v-model="stepElement" class="elevation-0" >
                <v-card class="stepperHeaderCard">
                <v-stepper-header>

                    <v-stepper-step
                        :complete="stepElement > 1"
                        alt-labels
                        step="1"
                        @click="swithStep(1)"
                    >
                        <span class="stepperLabel">Features</span>
                    </v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step
                        :complete="stepElement > 2"
                        alt-labels
                        step="2"
                        @click="swithStep(2)"
                    >
                    <span class="stepperLabel">Proactive Chat Bubble</span>
                        
                    </v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step
                        :complete="stepElement > 3"
                        alt-labels
                        step="3"
                        @click="$refs.ChatBubble.validate();"
                    >
                    <span class="stepperLabel">Widget</span>
                        
                    </v-stepper-step>
                    <v-divider></v-divider>
                    
                    <v-stepper-step
                        alt-labels
                        step="4"
                        @click="$refs.widget.validate();"
                    >
                    <span class="stepperLabel">Generate Code</span>
                        
                    </v-stepper-step>
                </v-stepper-header>
                </v-card>

                <v-stepper-items class="elevation-0">
                    

                    <v-stepper-content step="2" >
                        <v-row no-gutters>
                            <v-col cols="12" sm="8">
                                <v-card class="stepperCard elevation-0 elevation-2">
                                    <ChatBubble 
                                    ref="ChatBubble" 
                                    @switchScreen="swithStep" 
                                    @nextBtnStatus="nextButtonStatus" 
                                    @update="chatBubble" />
                                </v-card>
                            </v-col>

                            <v-col cols="12" sm="4" >
                                <v-card height="420pt" class="gray elevation-0 stepperCard lighten-1">
                                    <v-card-text>
                                        <h1 style="text-align:center;">This is view</h1>
                                    </v-card-text>
                                </v-card>
                                <v-col cols="12" sm="12">
                                        <v-btn color="#142850" class="ml-10 mt-3" outlined  @click="swithStep(1)">
                                            Back
                                        </v-btn>
                                        <v-btn color="#142850" :disabled="!nextBtnChatBubble" class="float-right mr-8 mt-3" outlined @click="$refs.ChatBubble.validate();">
                                            Next
                                        </v-btn>
                                </v-col>
                            </v-col>
                        </v-row>
                    </v-stepper-content>


                    <v-stepper-content step="1" >
                        <Navbar
                            :select="selectedLocation.id"
                            :locations="locations" 
                            @update="updateLocation" 
                            @display="showLocation"
                            />
                        <v-row no-gutters>       
                            <v-col cols="12" sm="8">
                                <v-card class="featureCard elevation-0 stepperCard">
                                    <Features  
                                        :location="selectedLocation"
                                        :locations="locations"
                                        :data="featuresConfig" 
                                        @delete="deleteFeatures" 
                                        @delete-location="deleteLocation"
                                        @updateList="updateList"
                                        @switchScreen="swithStep"
                                        @update="features" />
                                </v-card>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-card height="420pt" class="gray elevation-0 stepperCard lighten-1">
                                    <v-card-text>
                                        <h1 style="text-align:center;">This is view</h1>
                                    </v-card-text>
                                </v-card>
                                <v-row>
                                    <v-col cols="12" sm="12">
                                        <v-btn color="#142850" class="float-right mr-8 mt-3" outlined @click="swithStep(2)">
                                            Next
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="3" >
                        <v-row no-gutters>
                            <v-col cols="12" sm="8">
                                <v-card class="stepperCard elevation-0">
                                    <Widget 
                                    ref="widget" 
                                    @nextBtnStatus="nextButtonStatus" 
                                    @switchScreen="swithStep" 
                                    @update="widget" />
                                </v-card>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-card height="420pt" class="gray elevation-0 stepperCard lighten-1">
                                    <v-card-text>
                                        <h1 style="text-align:center;">This is view</h1>
                                    </v-card-text>
                                </v-card>
                                <v-col cols="12" sm="12">
                                        <v-btn color="#142850" class="ml-10 mt-3" outlined  @click="swithStep(2)">
                                            Back
                                        </v-btn>
                                        <v-btn :disabled="!nextBtnWidget"  color="#142850" class="float-right mr-8 mt-3" outlined @click="$refs.widget.validate();">
                                            Next
                                        </v-btn>
                                </v-col>
                            </v-col>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="4">
                        <v-row no-gutters>
                            <v-col cols="12" sm="8">
                                <v-card height="auto" class="elevation-0 stepperCard">
                                    <GenerateCode  
                                    @switchScreen="swithStep" 
                                    :config="generateCodeController" />
                                </v-card>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-card height="445pt" class="gray mb-12 stepperCard lighten-1">
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
    width: auto !important;
    margin-right: 25pt;
    margin-top: 20pt;
    margin-left: 25pt;
    cursor: pointer;
    overflow-x: hidden;
    overflow-y: auto;
    height: 450pt;
    margin-bottom: 10px;
}

.featureCard{
    margin-left: 200pt;
}

.stepperCard::-webkit-scrollbar {
    width: 3px;
    background-color: #F5F5F5;
    visibility: hidden;
} 

.stepperCard::-webkit-scrollbar-thumb {
    background-color: #1565C0;

}

.stepperCard::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
}

.stepperLabel{
    color: #dae1e7;
}

.v-stepper__step--active{
    color:red !important;
}

.v-stepper__header{
    margin-left: 250pt;
    margin-right: 250pt;
    cursor: pointer;
    box-shadow: none !important;
}

.stepperHeaderCard{
   background-color: #27496d;
   border-radius: 0px !important;
}
.v-stepper__content {
    box-shadow: none;
    width: auto  ;
    height: auto;
    margin: 0;
    padding: 0;
    background-color: #dae1e7;
} 


.v-icon.v-icon{
    font-size: 15px !important;
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
    data(){
        return{
            nextBtnChatBubble: false,
            nextBtnWidget: false,
            stepElement: 1,
            chatBubbleConfig: {},
            widgetConfig: {},
            selectedLocation: {},
            featuresConfig: [],
            locations: []
        }
    },
    
    computed: {
        generateCodeController(){
            var jsonData = {...this.chatBubbleConfig, ...this.widgetConfig, locations: this.locations}
            return jsonData;
        }
    },
    methods: {
        swithStep(id){
            this.stepElement = id
        },
        nextButtonStatus(status, type){
            if(type == "chat-bubble") this.nextBtnChatBubble = status;
            if(type == "widget") this.nextBtnWidget = status;
        },
        deleteLocation(id){
            var _self= this;
            this.locations.forEach(function(location, index){
                if(location.id==id) _self.locations.splice(index, 1);
            });
            

            if(this.locations.length!=0) _self.selectedLocation = _self.locations[0];
            else _self.selectedLocation = {};
        },
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

            this.updateConfig(this.selectedLocation);
        },
        updateConfig(location){
            
            var id = this.locations.findIndex((value => value.id == location.id));
            var filtered = this.featuresConfig.filter(function (el) { return el != null; });
            
            console.log(this.locations);
            if(typeof this.locations[id].features=='undefined') this.locations[id].features = null;
            this.locations[id].features = filtered;


            console.log(this.locations);
        },
        deleteFeatures(id){
            this.featuresConfig.splice(id, 1);
        },
        addNewLocation(location){
            this.locations.push(location);
        },

        updateLocation(location){
            this.locations.push(location);
        },

        updateList(locations){
            var _self =this;
            _self.locations = locations;
            _self.locations.forEach(function(location){
                if(location.id==_self.selectedLocation.id) 
                    _self.selectedLocation = location;
            });
        },
        showLocation(location){
            this.selectedLocation = location;

            if(typeof this.selectedLocation.features != "undefined"){
                this.featuresConfig = this.selectedLocation.features;
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
        }
        
    }
}
</script>