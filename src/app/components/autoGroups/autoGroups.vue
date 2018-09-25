<template>
    <div>
        <div class="container">
            <h1>Выберите ваш автомобиль</h1>
            <search></search>
            <div class="auto_groups">
                <div class="preloader" v-if="!this.loaded"></div>
                <div v-if="this.loaded" v-masonry transition-duration="0.3s" item-selector=".auto-group">
                    <autoGroup  v-masonry-tile
                                v-for="auto_group in auto_arr_group_filtered" 
                                :key="auto_group.auto_group_id"
                                :auto_group="auto_group"
                                :totalCount="auto_arr_group_filtered.length">
                    </autoGroup>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import bus from '../../bus.js';
import cyrillicTransform from '../../helpers/cyrillicTransform.js';
import {VueMasonryPlugin} from 'vue-masonry';

import search from './search/search.vue';
import autoGroup from './autoGroup/autoGroup.vue';

export default {
    data() {
        return {
            auto_arr: [],
            auto_arr_group: [],

            auto_arr_group_filtered: [],
            letters: [],
            auto_group_id: 0,

            loaded: false
        }
    },
    created() {
        axios.get('../../../data/auto.json').then(response => {
            /**
             * Заполняем массив отсортированными данными по названию автомобиля
             */
            this.auto_arr = response.data.sort((a, b) => {
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                }
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                }
                return 0;
            });
            
            /**
             * Заполняем массив используемых первых букв у названия автомобиля
             */
            this.auto_arr.map(auto => {
                if( this.letters.indexOf(auto.title.toLowerCase()[0]) == -1 ) {
                     this.letters.push(auto.title.toLowerCase()[0]);
                }
            });

            /**
             * Группируем автомобили по первой букве в названии
             */
            this.letters.forEach(letter => {

                let auto_group = {
                    auto_group_id: this.auto_group_id,
                    title: letter,
                    cars: []
                };

                this.auto_arr.forEach(auto => {
                    if(auto.title.toLowerCase()[0] == letter) {
                        auto_group.cars.push(auto);
                    }
                });

                this.auto_arr_group.push(auto_group);

                this.auto_group_id++;
            });
            
            setTimeout(() => {
                 this.loaded = true;
            }, 500);
        });

        this.auto_arr_group_filtered = this.auto_arr_group;

        bus.$on('filtering', this.filteringGroup);
    },
    methods: {
        filteringGroup(title) {

            let letter = {
                eng: cyrillicTransform(title),
                ru: title
            };

            this.auto_arr_group_filtered = this.auto_arr_group.filter(group => {
                if (letter.eng == '' && letter.ru == '') {
                    return true;
                } else {
                    return group.title.toLowerCase()[0] == letter.eng.toLowerCase()[0] || group.title.toLowerCase()[0] == letter.ru.toLowerCase()[0];
                }
            });

            //grid('.auto_groups');
        }
    },
    components: {
        search,
        autoGroup
    }
}
</script>