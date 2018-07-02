<template>
    <div class="form-row">
        <div class="form-group col-md-10">
            <input v-model="term" placeholder="City Name" class="form-control" />
        </div>
        <div class="form-group col-md-2">
            <button type="button" class="btn btn-primary btn-lg">Search</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['searchTerm'],
    data() {
        return {
            term: this.searchTerm,
        };
    },
    watch: {
        searchTerm() {
            this.term = this.searchTerm;
        },
    },
}
</script>
