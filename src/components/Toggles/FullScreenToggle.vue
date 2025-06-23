<template>
    <div class="box">
        <button id="fullscreen-button" v-on:click="toggle">
            <svg viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 
            7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
            </svg>
            <svg viewBox="0 0 24 24">
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 
            11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            button: '',
            isToggled: false,
        }
    },

    methods: {
        toggle() {
            if (!this.isToggled) {
                document.body.requestFullscreen();
                this.isToggled = true
            } else {
                document.exitFullscreen();
                this.isToggled = false
            }
        }
    }

}
</script>

<style>
#fullscreen-button {
    position: absolute;
    top:  15px;
    right:  15px;
    /* background: rgba(0,0,0,0.05); */
    background-color: rgba(236, 233, 233, 0.774);
    border:  0;
    width:  40px;
    height:  40px;
    border-radius: 50%;
    box-sizing: border-box;
    transition:  transform .3s;
    cursor:  pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 20;
}

#fullscreen-button:hover {
    transform: scale(1.125);
}
#fullscreen-button svg:nth-child(2) { 
    display: none;
}
[fullscreen] #fullscreen-button svg:nth-child(1) {
    display: none;
}
[fullscreen] #fullscreen-button svg:nth-child(2) {
    display: inline-block;
}
</style>