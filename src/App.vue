<template>
  <v-app>
    <Navbar :locations="locations" @updateLocations="addNewLocation" @displayLocation="display" />

    <v-content>
      <Dashboard/>
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
};
</script>
