<template>
    <div>
        <h1>Daniel Kuck's Amazing Weather App</h1>
        <search 
            :start-search-term="searchTerm" 
            @search="setSearchTerm" 
        />
        <forecast-list 
            :location="searchTerm" 
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
        };
    },
    methods: {
        setSearchTerm(searchTerm) {
            this.searchTerm = searchTerm;
        },
        setSelectedPeriod(selectedPeriod) {
            this.selectedPeriod = selectedPeriod;
        },
    },
}
</script>
