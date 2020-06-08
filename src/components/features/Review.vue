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
                    :rules="rules.status"
                    outlined
                    required
                    ></v-select>
                </v-col>

                <v-text-field
                @change="add"
                label="Button Text"
                :rules="rules.buttontext"
                v-model="params.buttontext"
                required
                >    
                </v-text-field>

                <v-textarea
                @change="add"
                label="Review Message"
                :rules="rules.initial"
                v-model="params.responses.initial"
                rows="5"
                required
                ></v-textarea>

                <v-card  v-for="(link, index) in params.links" :key="link.id">
                    <v-container fluid >
                        <h4>Links</h4>
                        <v-text-field
                        @change="add"
                        :label="'Name ' + (index+1)"
                        :rules="rules.linksName"
                        v-model="link.name"
                        required
                        >    
                        </v-text-field>

                        <v-text-field
                        @change="add"
                        :label="'Thumbnail ' + (index+1)"
                        :rules="rules.linksThumbnail"
                        v-model="link.thumbnail"
                        required
                        >    
                        </v-text-field>

                        <v-text-field
                        @change="add"
                        :label="'Link' + (index+1)"
                        :rules="rules.linksLink"
                        v-model="link.link"
                        required
                        >    
                        </v-text-field>

                        <v-btn v-if="link.removable" @click="params.links.splice(index, 1)" outlined color="red">Remove Link</v-btn>
                    </v-container>
                </v-card>
                <v-btn class="mt-5" @click="addLink()" outlined color="blue">Add Link</v-btn>
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
                buttontext: "",
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
            rules: {
                status: [v => !!v || 'Status is required'],
                buttontext: [v => !!v || 'Button Text is required'],
                initial: [v => !!v || 'Review Message is required'],
                linksName: [v => !!v || 'Review Message is required'],
                linksThumbnail: [v => !!v || 'Review Message is required'],
                linksLink: [v => !!v || 'Review Message is required'],
            }
        }
    },
    mounted(){
        if(typeof this.config.params !="undefined"){
            this.params = this.config.params;
        }
    },
    methods: {
        add(){
            var isValid = this.$refs.form.validate();
            this.config.params = this.params;
            if(isValid){
                this.$emit("updateReview", this.config, this.id);
            }
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