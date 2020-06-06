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
                class="mr-5 mt-3"
                :accordion="true"
                :popout="true"
                :tile="false"
            >
            <v-expansion-panel
                v-for="feature in features" :key="feature.id"
            >
                <v-expansion-panel-header>{{feature.type}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                <CustomLink @updateLink="updateFeature" @deleteLink="deleteFeature" :config="feature" v-if="feature.type=='Custom Link' && feature.id != null"></CustomLink>
                <Chat @updateChat="updateFeature" @deleteChat="deleteFeature" :config="feature" v-if="feature.type=='Chat' && feature.id != null"></Chat>
                <Review @updateReview="updateFeature" :config="feature" v-if="feature.type=='Review' && feature.id != null"></Review>
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
    components: {
        CustomLink,
        Chat,
        Review
    },
    data(){
        return {
            selectedType: null,
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
            features: [
                {
                    id:1,
                    type: 'Chat',
                    removable: false
                    
                },
                {
                    id:2,
                    type: 'Review',
                    removable: false,
                }
            ],
        }
    },
    methods: {
        add(){
            var id = new Date().getTime();
            this.features.push({id: id, type: this.selectedType, removable:true});    
        },
        deleteFeature(id){
            var arr = this.features.filter(value => value.id !== id);
            this.features = arr;
            this.$emit("delete", id);
        },
        updateFeature(config){
            var id =this.features.findIndex((value => value.id == config.id));
            this.features[id] = config;

            this.$emit("update", this.features[id]);
        }
    },
}
</script>

