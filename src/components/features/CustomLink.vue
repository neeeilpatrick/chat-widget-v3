<template>
    <div class="mt-10">
        <v-container fluid>
            <v-form lazy-validation ref="form">
            <v-text-field
            v-model="params.buttontext"
            label="Button Text"
            @change="add"
            :rules="rules.buttontextRule"
            required
          ></v-text-field>

          <v-text-field
          v-model="params.link"
            label="Link"
            @change="add"
            :rules="rules.linkRule"
            required
          ></v-text-field>
          </v-form>
          <v-btn v-if="config.removable" @click="deleteLink(id)" outlined color="red">Delete</v-btn>
        </v-container>
    </div>
</template>

<script>
export default {
    props: ["config", "id"],
    data(){
        return{
            params: {
                buttontext: "",
                link: ""
            },
            rules: {
                buttontextRule: [v => !!v || 'Button Text is required'],
                linkRule: [v => !!v || 'Link is required']
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
            if(isValid) this.$emit("updateLink", this.config, this.id);
        },
        deleteLink(id){
            this.$emit("deleteLink", id);
        }
    },
}
</script>