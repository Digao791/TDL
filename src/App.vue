<template>
  <div id ="mainBox" class="container bg-dark d-block">
    <Menu></Menu>
    <Map></Map>
  </div>
</template>

<script>
import Menu from './components/Menu.vue';
import Map from './components/Map.vue';
export default{

  components: {
    Menu,
    Map
  },

  data(){
    return {

    };
  }


}

</script>

<style>

#mainBox{
  display: grid;
  width: 100vw;
  min-width: 50vw;
  height: 90vh;
  min-height: 50vh;

  margin-top: 1%;
  overflow: auto;

  border-radius: 1%;
}

</style>