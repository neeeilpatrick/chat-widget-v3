<template>
    <div class="main-container">
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

        <v-card v-for="feature in features" :key="feature.id">
            <CustomLink @updateLink="updateFeature" @deleteLink="deleteFeature" :config="feature" v-if="feature.type=='custom-link' && feature.id != null"></CustomLink>
            <Chat @updateChat="updateFeature" @deleteChat="deleteFeature" :config="feature" v-if="feature.type=='chat' && feature.id != null"></Chat>
            <Review @updateReview="updateFeature" :config="feature" v-if="feature.type=='review' && feature.id != null"></Review>
        </v-card>

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
                    value: "custom-link"
                },
                {
                    text: "Chat",
                    value: "chat"
                }
            ],
            features: [
                {
                    id:1,
                    type: 'chat',
                    removable: false
                    
                },
                {
                    id:2,
                    type: 'review',
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

<style scoped>

</style>