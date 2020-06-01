<template>
    <nav>
        <v-navigation-drawer
        app
        >

            <v-btn 
                v-for="location in locations" 
                :key="location.id"
                text
                outlined
                block
                tile
                color="blue"
                :class="{active: checkIfSelected(location.id)}"
                @click="selectLocation(location)"
                >
                {{ location.name }}
            </v-btn>

            <v-btn 
                text 
                outlined
                block
                tile
                color="blue"
                @click="dialog=true"
                class="add-location">
                    <v-icon class="ma-1" left>mdi-map-marker-plus</v-icon>Add Location
            </v-btn>
            
        </v-navigation-drawer>


        <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">Add a New Location</v-card-title>
                <v-card-text>
                    <v-form v-model="valid" lazy-validation ref="form">
                        <v-text-field  
                            label="Location ID"
                            v-model="store.id"
                            :rules="locationRules"
                            required    
                        ></v-text-field>

                        <v-text-field
                            label="Storename"
                            v-model="store.name"
                            :rules="rules.storename"
                            required    
                        ></v-text-field>

                        <v-text-field
                            label="Address"
                            v-model="store.address"
                            :rules="rules.address"
                            required    
                        ></v-text-field>
                        
                        <v-text-field
                            label="Zipcode"
                            v-model="store.zipcode"
                            :rules="rules.zipcode"
                            required    
                        ></v-text-field> 
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="dialog=false">Cancel</v-btn>
                    <v-btn color="blue darken-5" text @click="addLocation()" :disabled="!valid">Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </nav>
</template>


<script>
export default {
    props: ["locations"],

    data(){
        return {
            dialog: false,
            valid: true,
            selected: null,
            rules: {
                storename: [ v => !!v || 'Storename is required' ],
                address: [ v => !!v || 'Address is required' ],
                zipcode: [ v => !!v || 'Zipcode is required' ],
            },
            store: {
                zipcode: "",
                address: "",
                id: "",
                name: ""
            }
        }

    },

    computed: {
        locationRules: function(){
            var _self = this;
            var rules = [];


            var locationString = !!_self.store.id;
            (  locationString ? rules.push(true) : "Location ID is required");

            // Check for duplicate
            var isExist = false;
            _self.locations.forEach(function(location){
                if(location.id==_self.store.id) isExist = true;
            });

            if(isExist) rules.push("Location ID already exists!");
            else rules.push(true);

            return rules;
        }
    },


    methods: {
        checkIfSelected(id){
            return (id==this.selected);
        },
        addLocation(){
            this.$refs.form.validate();
            this.$emit("updateLocations", this.store);
            this.dialog = false;

            this.store = {
                zipcode: "",
                address: "",
                id: "",
                name: ""
            }
        },

        selectLocation(location){
            console.log(location);
            this.selected = location.id;
            this.$emit("displayLocation", location);
        }
    }
}
</script>

<style scoped>
    
.add-location .v-icon {
    font-size: 15px;
}

.add-location {
    border: none;
}

.active {
    background: red !important;
}
</style>