<template>
  <div id ="mainBox" class="100vh 100vw">
    <Menu></Menu>
    <Map @unit="onUnitsUpdate" :filters="filters"></Map>

    <FullScreenToggle></FullScreenToggle>
    <InformationToggle @toggle="isInfoVisible = !isInfoVisible"></InformationToggle>
    <InformationView :infoToggle="isInfoVisible" :unitList="unitList" @closeInfo="isInfoVisible = false" @filters="filtersRequest"></InformationView>
  </div>
</template>

<script>
import Menu from './components/Menu.vue';
import Map from './components/Map.vue';
import FullScreenToggle from './components/Toggles/FullScreenToggle.vue';
import InformationToggle from './components/Toggles/InformationToggle.vue';
import InformationView from './components/InformationView.vue';

export default{

  components: {
    Menu,
    Map,
    FullScreenToggle,
    InformationToggle,
    InformationView
  },

  data(){
    return {
      isInfoVisible: false,
      unitList: [],
      filters: {selectedAffiliation: '', selectedEnviroment: []}
    };
  },

  methods:{
    onUnitsUpdate(unitsArray){
    this.unitList = unitsArray;
    },
    filtersRequest(filters){
      this.filters = {...filters};
    }
  }
}

</script>

<style>

#mainBox{
  display: block;
  position: relative;
  width: 100vw;
  min-width: 50vw;
  height: 100vh;
  min-height: 50vh;
  background-color: dark;
  overflow: visible;
}

</style>