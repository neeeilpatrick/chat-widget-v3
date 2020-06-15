<template>
    <div>
      <v-container fluid>
            <v-form lazy-validation ref="form">
                <v-col class="d-flex" cols="12" sm="6">
                    <v-select
                    @change="add"
                    v-model="params.status"
                    :items="statusItems"
                    label="Status"
                    outlined
                    dense
                    required
                    ></v-select>
                </v-col>

                <v-text-field
                v-if="params.status == 'Enable'"
                @change="add"
                @click="params.button_text = ''"
                label="Button Text"
                v-model="params.button_text"
                dense
                outlined
                required
                >    
                </v-text-field>

                <v-textarea
                v-if="params.status == 'Enable'"
                @change="add"
                @click="params.responses.initial = ''"
                label="Review Message"
                v-model="params.responses.initial"
                dense
                outlined
                rows="5"
                required
                ></v-textarea>

                <v-card v-for="(link, index) in params.links" :key="link.id">
                    <v-container v-if="params.status == 'Enable'" fluid >
                        <h4>Links</h4>
                        <v-text-field
                        @change="add"
                        @click="link.name = ''"
                        :label="'Name ' + (index+1)"
                        v-model="link.name"
                        dense
                        outlined
                        required
                        >    
                        </v-text-field>

                        <v-text-field
                        @change="add"
                        @click="link.thumbnail = ''"
                        :label="'Thumbnail ' + (index+1)"
                        v-model="link.thumbnail"
                        dense
                        outlined
                        required
                        >    
                        </v-text-field>

                        <v-text-field
                        @change="add"
                        @click="link.link = ''"
                        :label="'Link' + (index+1)"
                        v-model="link.link"
                        dense
                        outlined
                        required
                        >    
                        </v-text-field>

                        <v-btn v-if="link.removable" @click="params.links.splice(index, 1)" outlined color="red">Remove Link</v-btn>
                    </v-container>
                </v-card>
                <v-btn v-if="params.status == 'Enable'" class="mt-5" @click="addLink()" outlined color="blue">Add Link</v-btn>
            </v-form>
      </v-container>
    </div>
</template>

<script>
export default {
    props: ['config', 'id'],
    data(){
        return {
            statusItems: ['Enable', 'Disable'],
            params:{
                status: null,
                button_text: "",
                responses: {
                    initial: ""
                },
                links: [
                    {
                        name: "",
                        thumbnail: "",
                        link: "",
                        removable: false
                    }
                ]
            },
        }
    },
    mounted(){
        if(typeof this.config.params !="undefined"){
            this.params = this.config.params;
        }
    },
    methods: {
        add(){
            if(this.params.button_text.length <= 0) this.params.button_text = "Leave a review";
            if(this.params.responses.initial.length <= 0) this.params.responses.initial = "We always aim to help everyone. Please let us know if we fell short, so we can send your concern straight to the top.";
            if(this.params.links[0].name.length <= 0) this.params.links[0].name = "Google";
            if(this.params.links[0].thumbnail.length <= 0) this.params.links[0].thumbnail = "https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png";
            if(this.params.links[0].link.length <= 0) this.params.links[0].link = "https://google.com";

            this.config.params = this.params;
            this.$emit("updateReview", this.config, this.id);
            
        },
        addLink(){
            this.params.links.push({name: null, thumbnail: null,link: null, removable: true});
        },
        deleteLink(id){
            var arr = this.params.links.filter(value => value.id !== id);
            this.params.links = arr;
            this.config.params = this.params;
            this.$emit("updateReview", this.config);
        }
    }
}
</script>
