<template>
    <div class="auto-group" v-if="hasCars">
        <div class="auto-group__title">
            {{this.auto_group.title}}
        </div>
        <autoList :cars="filtering_cars"></autoList>
    </div>
</template>
<script>
import bus from '../../../bus.js';
import cyrillicTransform from '../../../helpers/cyrillicTransform.js';

import autoList from './autoList/autoList.vue';

export default {
    props: {
        auto_group: {
            type: Object,
            default:  function() { return {} }
        },
        totalCount: Number
    },
    data() {
        return {
            cars: this.auto_group.cars,
            filtering_cars: this.auto_group.cars,
        }
    },
    created() {
        bus.$on('filtering', this.filteringCars);
    },
    computed: {
        hasCars() {
            return this.filtering_cars.length > 0;
        }
    },
    methods: {
        filteringCars(title) {
            let letter = {
                eng: cyrillicTransform(title),
                ru: title
            };

            this.filtering_cars = this.cars.filter(car => {
                if (letter.eng == '' && letter.ru == '') {
                    return true;
                } else {
                    return car.title.toLowerCase().indexOf(letter.eng.toLowerCase()) > -1 || car.title.toLowerCase().indexOf(letter.ru.toLowerCase()) > -1;
                }
            });

        }
    },
    components: {
        autoList
    }
}
</script>
