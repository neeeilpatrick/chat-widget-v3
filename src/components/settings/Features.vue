<template>
    <div class="main-container">

        
        {{ (location!=null ? location.name : "")}}
        <v-btn v-if="location!=null" @click="dialog=!dialog">
            Edit Location
        </v-btn>

        <v-btn 
            v-if="location!=null"
            @click="deleteLocation"
        >
            Delete Location
        </v-btn>

        <LocationForm 
            :locations="locations" 
            :location="location"
            :isOpen="dialog" 
            @update="updateLocation" 
            @close="dialog=false"
        />

        <v-container fluid>
            <v-row>
                <v-col class="d-flex" cols="12" sm="6">
                    <v-select
                    v-model="selectedType"
                    :items="featureType"
                    item-text="text"
                    item-value="value"
                    label="Select"
                    outlined
                    ></v-select>
                </v-col>

                <v-col class="d-flex" cols="12" sm="6">
                    <v-btn @click="add" class="mt-2 blue lighten-2">Add</v-btn>
                </v-col>
            </v-row>


            <v-expansion-panels
                v-if="renderComponent"
                class="mr-5 mt-3"
                :accordion="true"
                :popout="true"
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
import Review from '../features/Review';

export default {
    props: ['data', 'location', 'locations'],
    components: {
        CustomLink,
        Chat,
        Review,
        LocationForm
    },
    mounted(){
        this.$emit("update", this.features);
    }, 
    data(){
        return {
            selectedType: null,
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
                }
            ],
            features: [],
        }
    },
    watch:{
        data: {
            deep: true,
             handler(data){
                var _self = this;
                _self.features = [];
                data.forEach((value, index) => {
                       _self.$set(_self.features, index, value );
                });
            }
        }
    },
    methods: {
        deleteLocation(){
            this.$emit("delete-location", this.location.id);
        },
        add(){
            this.features.push({type: this.selectedType, removable:true});    
        },
        deleteFeature(id){
            this.$emit("delete", id);
            this.features.splice(id, 1); 

            this.renderComponent = false;
            this.$nextTick(() => {

                this.renderComponent = true;
            });   
        },
        updateFeature(config, index){
            this.features[index] = config;
            this.$emit("update", config, index);
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

