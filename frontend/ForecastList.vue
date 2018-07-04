<template>
    <div>
        <h2>{{ weather && weather.city && weather.city.name || location }}</h2>
        <div v-if="weatherError === true">
            Could not access weather data for {{ location }}.
        </div>
        <div v-else-if="weatherError">
            {{ weatherError }}
        </div>
        <div v-else-if="weather">
            <forecast-small 
                v-for="period in weather.list"
                :period="period"
                :key="period.dt"
            >
            </forecast-small>
        </div>
    </div>
</template>

<script>
import ForecastSmall from './ForecastSmall.vue';

export default {
    components: {ForecastSmall},
    props: ['location'],
    data() {
        return {
            weather: null,
            weatherError: false,
        };
    },
    mounted() {
        this.refresh();
    },
    watch: {
        location() {
            this.refresh();
        },
    },
    methods: {
        refresh() {
            this.weather = null;
            this.weatherError = false;
            this.$http.get('/api/weather-search?location=' + encodeURIComponent(this.location))
                .then(
                    ({ body }) => this.weather = body,
                    ({ body }) => this.weatherError = body.error || true
                );
        },
    },
}
</script>
