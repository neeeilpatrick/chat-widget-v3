<template>
    <v-dialog v-model="dialog" persistent :max-width="maxWidth">
        <v-card>
            <v-card-title class="headline" v-if="!isEdit">Add a New Location</v-card-title>
            <v-card-title class="headline" v-if="isEdit">Update Location</v-card-title>
            <v-card-text>
                
                <v-form v-model="valid" lazy-validation ref="form">
                    <v-text-field  
                        label="Location ID"
                        v-model="store.id"
                        required   
                        :rules="locationRules"
                        outlined
                        dense 
                        :disabled="isEdit"
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
                    
                    <Timezone 
                        :timezone="store.timezone" 
                        @updateTimezone="updateTimezone" />

                    <v-text-field
                        label="Zipcode"
                        v-model="store.zipcode"
                        :rules="rules.zipcode"
                        outlined 
                        dense
                        required    
                    ></v-text-field> 


                    <v-checkbox
                        v-model="isBusinessHours"
                        label="Business Hours"
                        ></v-checkbox>

                    <business-hours 
                        v-if="isBusinessHours" 
                        :days="days" 
                        @updated-hours="updatedHours"></business-hours>
                </v-form>
                
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-5" text v-if="!isEdit" @click="addLocation()" :disabled="!valid">Add</v-btn>
                <v-btn color="blue darken-5" text v-if="isEdit" @click="addLocation()" :disabled="!valid">Update</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script>
import Timezone from './Timezone';
export default {
    props: ["isOpen", "locations", "location"],
    components: {
        Timezone
    },
    data(){
        return {
            maxWidth: "300",
            dialog: false,
            valid:  true,
            isEdit: false,
            isBusinessHours: false,
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
            days: {},
            daysDefault: {
                sunday: [
                    { 
                        open: '',
                        close: '',
                        id: '5ca5578b0c5c7',
                        isOpen: true
                    }
                ],
                monday: [
                    {
                        open: '',
                        close: '',
                        id: '5ca5578b0c5d1',
                        isOpen: true
                    }
                ],
                tuesday: [
                    {
                        open: '',
                        close: '',
                        id: '5ca5578b0c5d2',
                        isOpen: true
                    }
                ],
                wednesday: [
                    {
                        open: '',
                        close: '',
                        id: '5ca5578b0c5df',
                        isOpen: true
                    }
                ],
                thursday: [
                    {
                        open: '',
                        close: '',
                        id: '5ca5578b0c5e6',
                        isOpen: true
                    }
                ],
                friday: [
                    {
                        open: '',
                        close: '',
                        id: '5ca5578b0c5ec',
                        isOpen: true
                    }
                ],
                saturday: [
                    {
                        open: '',
                        close: '',
                        id: '5ca5578b0c5f8',
                        isOpen: true
                    }
                ]
            }
        }

    },

    mounted(){
        this.dialog = this.isOpen;
        this.days = this.daysDefault;
    },

    watch: {
        isBusinessHours(value){
            if(value) {
                this.maxWidth = "700";
                this.locations.businessHours = this.daysDefault;
            }
            else{
                this.maxWidth = "300";
                this.locations.businessHours = false;
                
            }
        },

        isOpen(value){
            this.dialog = value;
            
            
            if(value && this.location!=null){
                console.log(this.location);
                this.isEdit = true;
                this.store = {
                    zipcode: this.location.zipcode,
                    address: this.location.address,
                    id: this.location.id,
                    businessHours: this.location.businessHours,
                    name: this.location.name
                }

                if(typeof this.location.businessHours=='undefined' || this.location.businessHours==false){
                    this.isBusinessHours = false;
                    this.days = this.daysDefault;
                } else {
                    this.days = this.location.businessHours;
                    this.isBusinessHours = true;
                }
            }
        }
    },



    computed: {
        locationRules: function(){
            var _self = this;
            var rules = [];



            var locationString = !!_self.store.id && _self.store.id!="";
            (  locationString ? rules.push(true) : "Location ID is required");



            // Check for duplicate
            var isExist = false;

            _self.locations.forEach(function(location){
                if(location.id==_self.store.id) isExist = true;
            });

            if(isExist && this.isEdit!=true) rules.push("Location ID already exists!");
            else rules.push(true);

            return rules;
        }
    },


    methods: {

        close(){
            this.dialog = false;
            this.$emit("close", false);
        },
        updatedHours(hours){
            var _self = this;
            Object.keys(hours).forEach(function(day){
                _self[day] = hours[day];
            });

            if(_self.isBusinessHours){
                _self.store.businessHours = _self.days;
            }
        },

        updateTimezone(timezone){
            this.store.timezone = timezone;
        },

   

        addLocation(){
            var isFormValid = this.$refs.form.validate();
            if(isFormValid){
                console.log(this.store);
                this.$emit("update", this.store);

                this.store = {
                    zipcode: "",
                    address: "",
                    id: "",
                    businessHours: false,
                    name: ""
                }

                this.isBusinessHours = false;
                this.$refs.form.reset();
                this.days = this.daysDefault;
                this.close();
            }
        },

        selectLocation(location){
            console.log(location);
            this.selected = location.id;
            this.$emit("update", location);
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