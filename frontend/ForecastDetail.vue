<template>
    <div class="row">
        <div class="col-12">
            <div class="card forecast-detail">
                <div class="card-body">
                    <div class="card-text">
                        <div class="form-group row">
                            <div class="col-md-1 col-12">
                                <img :src="icon" />
                            </div>
                            <h4 class="col-md-10 col-6">
                                {{ time }}
                            </h4>
                            <div class="col-md-1 col-6">
                                <button class="close" @click="$emit('close')">&times;</button>
                            </div>
                        </div>
                        <div class="description">
                            {{ period.weather[0].description }}
                        </div>
                        <div class="quality form-group row">
                            <label class="col-6 col-md-3 col-lg-2 col-form-label">Low</label>
                            <div class="col-6 col-md-9 col-lg-10">
                                <span class="form-control-plaintext">{{ Math.round(period.main.temp_min) }}&deg;F</span>
                            </div>
                        </div>
                        <div class="quality form-group row">
                            <label class="col-6 col-md-3 col-lg-2 col-form-label">High</label>
                            <div class="col-6 col-md-9 col-lg-10">
                                <span class="form-control-plaintext">{{ Math.round(period.main.temp_max) }}&deg;F</span>
                            </div>
                        </div>
                        <div class="quality form-group row">
                            <label class="col-6 col-md-3 col-lg-2 col-form-label">Humidity</label>
                            <div class="col-6 col-md-9 col-lg-10">
                                <span class="form-control-plaintext">{{ period.main.humidity }}%</span>
                            </div>
                        </div>
                    </div>
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
            return moment.utc(this.period.dt_txt).local().format('dddd, MMMM Do YYYY, h:mm:ss a');
        },
    },
}
</script>
