<template>
  <v-app>
    <Navbar :locations="locations" @updateLocations="addNewLocation" @displayLocation="display" />

    <v-content>
      <Dashboard :location="currentLocation"/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard'

export default {
  name: 'App',

  components: {
    Navbar,
    Dashboard
  },

  data: () => ({
    currentLocation: null,
    locations: [{
                zipcode: "9000",
                address: "CDO",
                id: "132",
                name: "Cagayan de Oro"
            },{
                zipcode: "9001",
                address: "Lanao del Norte",
                id: "ldn",
                name: "Candis, Tubod LDN"
            }]
  }),
  methods: {
    addNewLocation(location){
      this.locations.push(location);
    },

    display(location){
      this.currentLocation = location
    }
  }
};
</script>
