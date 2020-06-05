<template>
    <div>
        <v-row>
            <v-col class="d-flex" cols="12" sm="6">
                <v-select
                :items="featureType"
                label="Select"
                outlined
                ></v-select>
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
                <v-btn class="mt-2 blue lighten-2">Add</v-btn>
            </v-col>
        </v-row>

        <v-card v-for="feature in features" :key="feature">
            <CustomLink v-if="feature.type=='custom-link'"></CustomLink>
        </v-card>

    </div>
</template>

<script>
import CustomLink from '../features/CustomLink';

export default {
    components: {
        CustomLink
    },
    data(){
        return {
            featureType: ['Custom Link'],
            features: [
                {
                    id: null,
                    type: "custom-link",
                }
            ]
        }
    },
    methods: {
        add(){

            this.features.push({})
        }
    },
}
</script>