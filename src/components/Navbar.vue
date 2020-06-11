<template>
    <nav>
        <v-navigation-drawer
        class="elavation-0"
        absolute
        >
            <div v-if="locations.length==0" class="no-location">No Locations</div>
            <div v-if="locations.length!=0" >
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
            </div>
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
            @close="dialog=false"
        />
    </nav>
</template>


<script>
import LocationForm from './resources/LocationForm'
export default {
    props: ["locations", "select"],
    components: {
        LocationForm
    },
    data(){
        return {
            dialog: true,
            selected: null,
        }

    },


    watch: {
        select(value){
            this.selected = value;
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
            
            this.selected = location.id;
            this.$emit("display", location);
        }, 

        updateLocation(location){
            this.$emit('update', location);
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

.no-location {
    padding: 13px;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
}
</style>