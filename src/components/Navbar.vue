<template>
    <nav>
        <v-navigation-drawer
        permanent
        absolute
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


        <v-dialog v-model="dialog" persistent max-width="300">
            <v-card>
                <v-card-title class="headline">Add a New Location</v-card-title>
                <v-card-text>
                    
                    <v-form v-model="valid" lazy-validation ref="form">
                        <v-text-field  
                            label="Location ID"
                            v-model="store.id"
                            :rules="locationRules"
                            outlined
                            dense
                            required    
                        ></v-text-field>

                        <v-text-field
                            label="Location Name"
                            v-model="store.name"
                            :rules="rules.storename"
                            outlined
                            dense
                            required    
                        ></v-text-field>

                        <v-text-field
                            label="Address"
                            v-model="store.address"
                            :rules="rules.address"
                            outlined
                            dense
                            required    
                        ></v-text-field>
                        
                        <Timezone @updateTimezone="updateTimezone" />

                        <v-text-field
                            label="Zipcode"
                            v-model="store.zipcode"
                            :rules="rules.zipcode"
                            outlined 
                            dense
                            required    
                        ></v-text-field> 


                        <v-checkbox
                            v-model="businessHours"
                            label="Business Hours"
                            ></v-checkbox>
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
import Timezone from './resources/Timezone';
export default {
    props: ["locations"],
    components: {
        Timezone
    },
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
                name: "",
                timezone: "America/Los_Angeles",
                businessHours: false
            },
            days: {
                sunday: [
                    {
                    open: '',
                    close: '',
                    id: '5ca5578b0c5c7',
                    isOpen: false
                    }
                ],
                monday: [
                    {
                    open: '0800',
                    close: '1700',
                    id: '5ca5578b0c5d1',
                    isOpen: true
                    }
                ],
                tuesday: [
                    {
                    open: '0800',
                    close: '1700',
                    id: '5ca5578b0c5d8',
                    isOpen: true
                    }
                ],
                wednesday: [
                    {
                    open: '0800',
                    close: '1700',
                    id: '5ca5578b0c5df',
                    isOpen: true
                    }
                ],
                thursday: [
                    {
                    open: '0800',
                    close: '1700',
                    id: '5ca5578b0c5e6',
                    isOpen: true
                    }
                ],
                friday: [
                    {
                    open: '0800',
                    close: '1700',
                    id: '5ca5578b0c5ec',
                    isOpen: true
                    },
                    {
                    open: '1900',
                    close: '2200',
                    id: '5ca5578b0c5f2',
                    isOpen: true
                    }
                ],
                saturday: [
                    {
                    open: '24hrs',
                    close: '24hrs',
                    id: '5ca5578b0c5f8',
                    isOpen: true
                    }
                ]
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
        updateTimezone(timezone){
            alert(timezone);
        },
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
    opacity: .3;
}
</style>