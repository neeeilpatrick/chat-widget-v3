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
   
    width: auto  ;
    height: auto;
    margin-top: 200px;
    margin: 0;
    padding: 0;
    background-color: #dae1e7;
}
</style>
