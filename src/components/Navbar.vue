<template>
    <nav>
        <v-navigation-drawer
        absolute
        >

            <v-btn 
                v-for="location in locations" 
                text
                outlined
                block
                tile
                color="blue"
                :key="location.id"
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


        <LocationForm 
            :locations="locations" 
            :isOpen="dialog" 
            @update="updateLocation" 
            @edit="editLocation"
            @close="dialog=false"
        />
    </nav>
</template>


<script>
import LocationForm from './resources/LocationForm'
export default {
    props: ["locations"],
    components: {
        LocationForm
    },
    data(){
        return {
            dialog: false,
            selected: null,
        }

    },

    
    mounted(){
       if(this.locations.length!=0 && this.selected==null){
            this.selectLocation(this.locations[0]);
       }
    },

    methods: {

        

        updateTimezone(timezone){
            this.store.timezone = timezone;
        },

        checkIfSelected(id){
            return (id==this.selected);
        },

        selectLocation(location){
            console.log(location);
            this.selected = location.id;
            this.$emit("display", location);
        }, 

        updateLocation(location){
            this.$emit('update', location);
        },

        editLocation(){

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