<template>
    <div class="search-panel">
        <input type="text" name="auto_name" placeholder="ФИЛЬТР" :value="this.search_word" @input="this.filteringAuto"  >
    </div>
</template>
<script>
import bus from '../../../bus.js';

export default {
    data() {
        return {
            search_word: ''
        }
    },
    methods: {
        filteringAuto(event) {
            this.search_word = event.target.value;
            bus.$emit('filtering', this.search_word );
        }
    }
}
</script>
