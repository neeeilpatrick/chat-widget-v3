<template>
  <v-app>
    <v-content>
      <Dashboard @openFeature="toggleFeatureNav" :location="currentLocation"/>
    </v-content>
  </v-app>
</template>

<script>
import Dashboard from './components/Dashboard'

export default {
  name: 'App',

  components: {
    Dashboard
  },

  data: () => ({

  }),
  methods: {
  }
};
</script>
