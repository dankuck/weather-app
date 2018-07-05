<template>
    <div>
        <img :src="icon" />
        {{ time }}
        Low: {{ Math.round(period.main.temp_min) }}&deg;F
        High: {{ Math.round(period.main.temp_max) }}&deg;F
        Humidity: {{ period.main.humidity }}%
        <button @click="$emit('close')">&times;</button>
    </div>
</template>

<script>
import moment from 'moment-timezone';

export default {
    props: ['period'],
    computed: {
        icon() {
            return `http://openweathermap.org/img/w/${this.period.weather[0].icon}.png`;
        },
        time() {
            return moment.utc(this.period.dt_txt).local().format('dddd, MMMM Do YYYY, h:mm:ss a');
        },
    },
}
</script>
