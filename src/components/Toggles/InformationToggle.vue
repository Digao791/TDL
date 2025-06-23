<template>
    <div class="box">
        <button id="infoToggle" @click="$emit('toggle')">
            <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
                <path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 8h12M6 12h12M6 16h12"/>
            </svg>
        </button>
    </div>
</template>

<script>

export default {

    data() {
        return {
            isToggled: false
        }
    },

    methods: {
        toggle() {
            this.isToggled ^= this.isToggled
        }
    }
}

</script>


<style>
#infoToggle {
position: absolute;
  top: 75px;
  right: 15px;
  background-color: rgba(236, 233, 233, 0.774);
  border: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-sizing: border-box;
  transition: transform 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

#infoToggle:hover {
    transform: scale(1.125);
}



</style>