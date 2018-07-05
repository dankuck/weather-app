<template>
    <div class="form-row search">
        <div class="form-group col-12 col-md-10">
            <input v-model="term" placeholder="City Name" class="form-control form-control-lg" @keyup.enter="search" />
        </div>
        <div class="form-group col-12 col-md-2">
            <button type="button" class="btn btn-primary btn-lg" @click="search">Search</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['startSearchTerm'],
    data() {
        return {
            term: this.startSearchTerm,
        };
    },
    methods: {
        search() {
            this.$emit('search', this.term);
        },
    },
}
</script>
