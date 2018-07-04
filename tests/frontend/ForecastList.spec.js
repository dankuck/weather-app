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
        let lastRequest;
        httpMocker.setRoutes({
            GET: {
                '/api/weather-search': function (request) {
                    lastRequest = request;
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
        assert(lastRequest);
        assert(/\/api\/weather-search/.test(lastRequest.url));
        expect(lastRequest.query.location).toEqual('Trenton');
        waitTicks(wrapper.vm, 2)
            .then(() => {
                expect(wrapper.vm.weather).toEqual(sampleResponse);
            })
            .then(done, done);
    });

    /**
     * @LWR 2.e. When the location changes, this component MUST pull new data 
     * from the backend.
     */
    it('pulls from the backend when changed', function (done) {
        let lastRequest;
        httpMocker.setRoutes({
            GET: {
                '/api/weather-search': function (request) {
                    lastRequest = request;
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
        assert(lastRequest); // that's one
        lastRequest = null;
        waitTicks(wrapper.vm, 2)
            .then(() => {
                wrapper.setProps({location: 'Boise'});
                return waitTicks(wrapper.vm, 2);
            })
            .then(() => {
                assert(lastRequest); // the second one!
                expect(lastRequest.query.location).toEqual('Boise');
                expect(wrapper.vm.weather).toEqual(sampleResponse);
            })
            .then(done, done);
    });

    /**
     * @LWR 2.b. When a search is conducted a title header on this section 
     * MUST display the location found.
     */
    it('shows the title', function (done) {
        httpMocker.setRoutes({
            GET: {
                '/api/weather-search': function (request) {
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
        waitTicks(wrapper.vm, 2)
            .then(() => {
                // The sampleResponse gives "New York" even though we asked for "Trenton".
                // This is useful to test that we show the value from the right place
                assert(/New York/.test(wrapper.text()));
            })
            .then(done, done);
    });

    /**
     * @LWR 2.b.a. If no matching location is found, the title MAY reflect the 
     * search bar.
     *
     * @LWR 2.b.b. If no matching location is found, a message to that effect 
     * MUST be shown.
     */
    it('falls back to the location and shows an error', function (done) {
        httpMocker.setRoutes({
            GET: {
                '/api/weather-search': function (request) {
                    return request.respondWith({error: 'No such city'}, {status: 500});
                },
            },
        });
        const wrapper = shallowMount(ForecastList, {
            localVue,
            propsData: {
                location: 'Trenton',
            },
        });
        waitTicks(wrapper.vm, 2)
            .then(() => {
                assert(/Trenton/.test(wrapper.text()));
                assert(/No such city/.test(wrapper.text()));
            })
            .then(done, done);
    });

    /**
     * @LWR 2.c. The weather forecast MUST be shown as a list of time periods.
     * 
     * @LWR 2.c.b. Each list item MUST display an abbreviated date and time.
     * 
     * @LWR 2.c.c. Each list item MUST display a description of the forecast.
     * 
     * @LWR 2.c.d. Each list item MUST display a high and low temperature.
     */
    it('shows the list', function (done) {
        httpMocker.setRoutes({
            GET: {
                '/api/weather-search': function () {
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
        waitTicks(wrapper.vm, 2)
            .then(() => {
                assert(/2018-07-04 03:00:00/.test(wrapper.text()));
                assert(/2018-07-04 06:00:00/.test(wrapper.text()));
                assert(/Clouds/.test(wrapper.text()));
                assert(/Rain/.test(wrapper.text()));
                assert(/297\/298/.test(wrapper.text()));
                assert(/296\/297/.test(wrapper.text()));
                expect(wrapper.findAll('img').length).toEqual(2);
            })
            .then(done, done);
    });
});
