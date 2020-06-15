<template>
  <v-app>
    <v-content>
      <Dashboard/>
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
};
</script>

<style>
.v-content__wrap{
    background-color: #1b1b2f;
}

.theme--light.v-input input, .theme--light.v-input textarea{
    color: gray;
}

.v-text-field{
    font-size: 10pt !important;
    padding: 0pt !important;
}

input[type=text]{
  padding: 0pt !important;
}
</style>
