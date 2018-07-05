<template>
    <div class="row">
        <forecast-small 
            v-for="period in periods"
            :period="period"
            :key="period.dt"
            @click="$emit('click', period)"
        >
        </forecast-small>
    </div>
</template>

<script>
import ForecastSmall from './ForecastSmall.vue';

export default {
    components: {ForecastSmall},
    props: ['periods'],
}
</script>
