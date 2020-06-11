<template>
     <div class="mt-10">
        <v-container fluid>
            <v-form lazy-validation ref="form">
            <v-text-field
            prepend-inner-icon="mdi-card-text"
            v-model="params.button_text"
            label="Button Text"
            @change="add"
            :rules="rules.button_textRule"
            dense
            outlined
            required
          ></v-text-field>

          <v-text-field
          prepend-inner-icon="mdi-link"
          v-model="params.phone_number"
            label="Link"
            @change="add"
            :rules="rules.phone_number"
            dense
            outlined
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
                button_text: "",
                phone_number: ""
            },
            rules: {
                button_textRule: [v => !!v || 'Button Text is required'],
                phone_number: [v => !!v || 'Link is required']
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
            if(isValid) this.$emit("updateCall", this.config, this.id);
        },
        deleteLink(id){
            this.$emit("deleteCall", id);
        }
    },
}
</script>