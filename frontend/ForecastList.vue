<template>
    <div>x</div>
</template>

<script>
export default {
    props: ['location'],
    data() {
        return {
            weather: null,
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
            this.$http.get('/api/weather-search?location=' + encodeURIComponent(this.location))
                .then(
                    ({ body }) => this.weather = body,
                    ({ error }) => this.weatherError = error || true
                );
        },
    },
}
</script>
