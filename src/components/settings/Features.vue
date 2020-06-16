<template>
    <div class="main-container mt-3">
        <v-row>

                    <v-col class="ml-3" cols="12" sm="8">
                        {{ (location!=null ? location.name : "")}}<br>
                        <span style="font-size:12px;">{{ (location!=null ? location.id : "")}}</span>
                    </v-col>

                    <v-col class="ml-10" cols="12" sm="3">
                        <v-btn
                        v-if="features.length!=0"
                        class="float-right mt-1 mr-3"
                        small
                        icon
                        @click="dialog=!dialog">
                            <v-icon>mdi-lead-pencil</v-icon>
                        </v-btn>
                         <v-btn 
                        v-if="features.length!=0"
                        class="float-right mr-3 mt-1"
                        small
                        icon
                        color="red"
                        @click="deleteLocation"
                        >
                            <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                    </v-col>
        </v-row>

        <LocationForm 
            :locations="locations" 
            :location="location"
            :isOpen="dialog" 
            @update="updateLocation" 
            @close="dialog=false"
        />

        <v-container fluid>
            <v-row class="ma-auto">
                <v-col cols="12" sm="6">
                    <v-select
                    v-model="selectedType"
                    :items="featureType"
                    item-text="text"
                    item-value="value"
                    label="Select"
                    outlined
                    dense
                    ></v-select>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-btn @click="add" color="blue darken-4" style="height: 40px;" outlined>Add</v-btn>
                </v-col>
            </v-row>


            <v-expansion-panels
                v-if="renderComponent"
                class="mr-5 mt-3"
                :accordion="true"
                :tile="false"
            >
            <v-expansion-panel
                v-for="(feature, index) in features" 
                :key="index"
            >
                <v-expansion-panel-header>{{feature.type}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <CustomLink 
                    @updateLink="updateFeature" 
                    @deleteLink="deleteFeature" 
                    :config="feature" 
                    :id="index" 
                    v-if="feature.type=='Custom Link'"
                    
                    ></CustomLink>

                    <Chat 
                    @updateChat="updateFeature" 
                    @deleteChat="deleteFeature" 
                    :config="feature" 
                    :id="index" 
                    v-if="feature.type=='Chat'"
                    ></Chat>

                    <Review 
                    @updateReview="updateFeature" 
                    :config="feature" 
                    :id="index" 
                    v-if="feature.type=='Review'"
                    ></Review>

                    <Call
                    @updateCall="updateFeature" 
                    @deleteCall="deleteFeature" 
                    :config="feature" 
                    :id="index" 
                    v-if="feature.type=='Call'">
                    </Call>
                </v-expansion-panel-content>
            </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
    </div>
</template>

<script>
import LocationForm from './../resources/LocationForm';
import CustomLink from '../features/CustomLink';
import Chat from '../features/Chat';
import Call from '../features/Call';
import Review from '../features/Review';

export default {
    props: ['featuresData', 'location', 'locations'],
    components: {
        CustomLink,
        Chat,
        Call,
        Review,
        LocationForm
    },
    data(){
        return {
            selectedType:  null,
            renderComponent: true,
            dialog: false,
            featureType: [
                {
                    text: "Custom Link",
                    value: "Custom Link"
                },
                {
                    text: "Chat",
                    value: "Chat"
                },
                {
                    text: "Call",
                    value: "Call"
                }
            ],
            features: [],
        }
    },
    watch: {
        location() {
            var _self = this;
            _self.features = [];

            this.$nextTick(function () {
                _self.features = _self.featuresData;
            });
        },
    },
    methods: {
        deleteLocation(){
            this.$emit("delete-location", this.location.id);
        },
        add(){
            if(this.selectedType != null) this.features.push({type: this.selectedType, removable:true});
        },
        deleteFeature(id){
            this.features.splice(id, 1); 
            this.$emit("delete", this.features, this.location.id);

            this.renderComponent = false;
            this.$nextTick(() => {

                this.renderComponent = true;
            });   
        },
        updateFeature(config, index){
            this.features[index] = config;
            console.log(this.features[index]);
            this.$emit("update", this.features[index], index, this.location.id);
        },

        updateLocation(location){
            var list = this.locations;
            list.forEach(function(loc, index){
                if(loc.id==location.id){
                    list[index] = location;
                }
            });

            this.$emit("updateList", list);
        }
    },
}
</script>


