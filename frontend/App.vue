<template>
    <div>
        <h1>Daniel Kuck's Amazing Weather App</h1>
        <search 
            :start-search-term="searchTerm" 
            @search="setSearchTerm" 
        />
        <div class="row">
            <div class="col-12">
                <h2>{{ weather && weather.city && weather.city.name || searchTerm }}</h2>
            </div>
        </div>
        <div class="weather-error alert alert-danger" v-if="weatherError === true">
            Could not access weather data for {{ searchTerm }}.
        </div>
        <div class="weather-error alert alert-danger" v-else-if="weatherError">
            {{ weatherError }}
        </div>
        <forecast-list 
            v-if="weather && !selectedPeriod"
            :periods="weather.list" 
            @click="setSelectedPeriod" 
        />
        <forecast-detail 
            v-if="selectedPeriod" 
            :period="selectedPeriod" 
            @close="selectedPeriod = null" 
        />
    </div>
</template>

<script>
import Search from './Search.vue';
import ForecastList from './ForecastList.vue';
import ForecastDetail from './ForecastDetail.vue';

export default {
    components: {
        Search, 
        ForecastList,
        ForecastDetail,
    },
    data() {
        return {
            searchTerm: 'New York',
            selectedPeriod: null,
            weather: null,
            weatherError: false,
        };
    },
    mounted() {
        this.fetchWeather();
    },
    watch: {
        searchTerm() {
            this.selectedPeriod = null;
            this.fetchWeather();
        },
    },
    methods: {
        setSearchTerm(searchTerm) {
            this.searchTerm = searchTerm;
        },
        setSelectedPeriod(selectedPeriod) {
            this.selectedPeriod = selectedPeriod;
        },
        fetchWeather() {
            this.weather = null;
            this.weatherError = false;
            this.$http.get('/api/weather-search?units=imperial&location=' + encodeURIComponent(this.searchTerm))
                .then(
                    ({ body }) => this.weather = body,
                    ({ body }) => this.weatherError = body.error || true
                );
        },
    },
}
</script>
