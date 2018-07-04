<template>
    <div>
        <h1>Daniel Kuck's Amazing Weather App</h1>
        <search :start-search-term="searchTerm" @search="setSearchTerm" />
        <forecast-list :location="searchTerm" />
    </div>
</template>

<script>
import Search from './Search.vue';
import ForecastList from './ForecastList.vue';

export default {
    components: {
        Search, 
        ForecastList,
    },
    data() {
        return {
            searchTerm: 'New York',
        };
    },
    methods: {
        setSearchTerm(searchTerm) {
            this.searchTerm = searchTerm;
        },
    },
}
</script>
