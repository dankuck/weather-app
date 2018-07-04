<template>
    <div @click="$emit('click')" class="col-lg-3 col-md-6 col-12">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">
                    {{ time }}
                </h5>
                <div class="card-text">
                    <div>
                        <img :src="icon" />
                    </div>
                    {{ period.weather[0].main }} - 
                    {{ Math.round(period.main.temp_min) }}&deg;/{{ Math.round(period.main.temp_max) }}&deg;
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment-timezone';

export default {
    props: ['period'],
    computed: {
        icon() {
            return `http://openweathermap.org/img/w/${this.period.weather[0].icon}.png`;
        },
        time() {
            return moment.utc(this.period.dt_txt).local().format('ddd h:mm:ss a');
        },
    },
}
</script>
