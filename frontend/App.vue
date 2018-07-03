<template>
    <div>
        <h1>Daniel Kuck's Amazing Weather App</h1>
        <search :start-search-term="searchTerm" @search="setSearchTerm" />
    </div>
</template>

<script>
import Search from './Search.vue';

export default {
    components: {Search},
    data() {
        return {
            searchTerm: 'New York City',
        };
    },
    methods: {
        setSearchTerm(searchTerm) {
            this.searchTerm = searchTerm;
        },
    },
}
</script>
