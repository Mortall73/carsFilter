<template>
    <ul class="auto-group__list">
        <transition-group name="item-down" appear>
            <li class="auto-group__car-title" v-for="car in cars" :key="car.id">
                <a :href="`#${car.id}`" class="auto-group__car-link">{{car.title}}</a>
            </li>
        </transition-group>
    </ul>
</template>
<script>
export default {
    props: {
        cars: {
            type: Array,
            default:  function() { return {} }
        },
    }
}
</script>
