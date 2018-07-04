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
            <div v-for="period in weather.list">
                {{ period.dt_txt }}
                {{ period.weather[0].main }}
                {{ Math.round(period.main.temp_min) }}/{{ Math.round(period.main.temp_max) }}
                <img :src="period.weather[0].icon" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
