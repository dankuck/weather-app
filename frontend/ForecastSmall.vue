<template>
    <div @click="$emit('click')" class="col-sm-1">
        {{ period.dt_txt }}
        {{ period.weather[0].main }}
        {{ Math.round(period.main.temp_min) }}/{{ Math.round(period.main.temp_max) }}
        <img :src="period.weather[0].icon" />
    </div>
</template>

<script>
export default {
    props: ['period'],
    computed: {

    },
}
</script>
