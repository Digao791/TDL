<template>
    <div class="mainWindow" v-show="infoToggle">
        <div class="informationBox">
            <h3>Filtering</h3>

            <!-- Affiliation Dropdown -->
            <div class="field-group">
                <label>Affiliation</label>
                <select v-model="selectedAffiliation">
                    <option value="" disabled>Select Affiliation</option>
                    <option v-for="option in affiliationOptions" :key="option" :value="option">{{ option }}</option>
                </select>
            </div>

            <!-- Environment Grid Checkboxes -->
            <div class="field-group">
                <label>Environment</label>
                <div class="grid-checkboxes">
                    <label v-for="env in environmentOptions" :key="env">
                        <input type="checkbox" v-model="selectedEnvironment" :value="env" />
                        {{ env }}
                    </label>
                </div>
            </div>

            <!-- Buttons -->
            <div class="button-row">
                <button @click="applyFilter">Search</button>
                <button @click="cancelFilter">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import ms from "milsymbol"
export default {
    props: ['infoToggle', 'unitList'],

    data() {
        return {
            selectedAffiliation: "",
            affiliationOptions: ["Friend", "Hostile", "Neutral", "Unknown"],
            environmentOptions: ["Land", "Air", "Surface", "Space", "Ground", "Subsurface"], // adicione mais aqui se quiser
            selectedEnvironment: [],
        };
    },

    methods: {
        getSymbol(unit) {
            let symbol = new ms.Symbol(unit.options._symbol.options.sidc)
            return symbol.asSVG()
        },
        applyFilter() {

            let filters = {
                selectedAffiliation: this.selectedAffiliation,
                selectedEnvironment: this.selectedEnvironment,
            }
            this.$emit('filters', filters)
        },
        cancelFilter() {
            this.selectedAffiliation = "";
            this.selectedEnvironment = [];
        }
    }
}
</script>

<style>
.mainWindow {
    position: absolute;
    top: 10px;
    right: 70px;
    height: auto;
    width: 250px;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 40;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.informationBox {
    margin-top: 0px;
    padding: 10px 15px;
    box-sizing: border-box;
    overflow-y: auto;
}

.field-group {
    margin-bottom: 15px;
}

.field-group label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
}

select {
    width: 100%;
    padding: 4px;
}

.grid-checkboxes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* 2 colunas */
    gap: 6px;
}

.button-row {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

.button-row button {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    transition: background-color 0.2s;
}

.button-row button:hover {
    background-color: #0056b3;
}
</style>
