<template>
    <div class="main-container">
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
import CustomLink from '../features/CustomLink';
import Chat from '../features/Chat';
import Review from '../features/Review';

export default {
    props: ['data'],
    components: {
        CustomLink,
        Chat,
        Review
    },
    data(){
        return {
            selectedType: null,
            renderComponent: true,
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
    mounted(){
        this.$emit("update", this.features);
    },
    methods: {
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
        }
    },
}
</script>

