require('jsdom-global')();
import { createLocalVue, shallowMount } from '@vue/test-utils';
import ForecastList from '../../frontend/ForecastList.vue';
import assert from 'assert';
import expect from 'expect';
import VueResource from 'vue-resource';
import VueResourceMocker from 'vue-resource-mocker';
import sampleResponse from './sample-response.json';
import waitTicks from './wait-ticks.js';

describe('ForecastList', function () {

    let localVue, httpMocker;

    beforeEach(function () {
        localVue = createLocalVue();
        localVue.use(VueResource);
        httpMocker = new VueResourceMocker();
        localVue.use(httpMocker);
    });

    /**
     * @LWR 2. A section MUST exist to display the results of a search.
     */
    it('mounts', function () {
        const wrapper = shallowMount(ForecastList, {localVue});
        assert(wrapper.isVueInstance());
    });

    /**
     * @LWR 2.e. When the location changes, this component MUST pull new data 
     * from the backend.
     */
    it('pulls from the backend when loaded', function (done) {
        let caughtRequest;
        httpMocker.setRoutes({
            GET: {
                '/api/weather-search': function (request) {
                    caughtRequest = request;
                    return sampleResponse;
                },
            },
        });
        const wrapper = shallowMount(ForecastList, {
            localVue,
            propsData: {
                location: 'Trenton',
            },
        });
        assert(caughtRequest);
        assert(/\/api\/weather-search/.test(caughtRequest.url));
        expect(caughtRequest.query.location).toEqual('Trenton');
        waitTicks(wrapper.vm, 2)
            .then(() => {
                expect(wrapper.vm.weather).toEqual(sampleResponse);
            })
            .then(done, done);
    });
});
