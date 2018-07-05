require('jsdom-global')();
import { shallowMount, createLocalVue } from '@vue/test-utils';
import App from '../../frontend/App.vue';
import Search from '../../frontend/Search.vue';
import ForecastList from '../../frontend/ForecastList.vue';
import ForecastDetail from '../../frontend/ForecastDetail.vue';
import assert from 'assert';
import expect from 'expect';
import VueResource from 'vue-resource';
import VueResourceMocker from 'vue-resource-mocker';
import sampleResponse from './sample-response.json';
import waitTicks from './wait-ticks.js';

describe('App', function () {

    let localVue, httpMocker, lastRequest;

    beforeEach(function () {
        localVue = createLocalVue();
        localVue.use(VueResource);
        httpMocker = new VueResourceMocker();
        localVue.use(httpMocker);
        httpMocker.setRoutes({
            GET: {
                '/api/weather-search': function (request) {
                    lastRequest = request;
                    return sampleResponse;
                },
            },
        });
    });

    it('mounts', function () {
        const wrapper = shallowMount(App, {localVue});
        assert(wrapper.isVueInstance());
    });

    it('has the title', function () {
        const wrapper = shallowMount(App, {localVue});
        assert(/Daniel Kuck's Amazing Weather App/.test(wrapper.text()));
    });

    /**
     * @LWR 1.d. When the location changes, this component MUST pull new data 
     * from the backend.
     */
    it('pulls from the backend when loaded', function (done) {
        const wrapper = shallowMount(App, {localVue});
        assert(lastRequest);
        assert(/\/api\/weather-search/.test(lastRequest.url));
        expect(lastRequest.query.location).toEqual('New York');
        waitTicks(wrapper.vm, 2)
            .then(() => {
                expect(wrapper.vm.weather).toEqual(sampleResponse);
            })
            .then(done, done);
    });

    /**
     * @LWR 1.d. When the location changes, this component MUST pull new data 
     * from the backend.
     */
    it('pulls from the backend when changed', function (done) {
        const wrapper = shallowMount(App, {localVue});
        assert(lastRequest); // that's one
        lastRequest = null;
        waitTicks(wrapper.vm, 2)
            .then(() => {
                wrapper.setData({
                    searchTerm: 'Boise',
                });
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
     * @LWR 1.e. When a search is conducted a title header on this section 
     * MUST display the location found.
     */
    it('shows the title', function (done) {
        const wrapper = shallowMount(App, {localVue});
        waitTicks(wrapper.vm, 2)
            .then(() => {
                assert(/New York/.test(wrapper.text()));
            })
            .then(done, done);
    });

    /**
     * @LWR 1.e.a. If no matching location is found, the title MAY reflect the 
     * search bar.
     *
     * @LWR 1.e.b. If no matching location is found, a message to that effect 
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
        const wrapper = shallowMount(App, {localVue});
        wrapper.setData({
            searchTerm: 'Trenton',
        });
        waitTicks(wrapper.vm, 2)
            .then(() => {
                assert(/Trenton/.test(wrapper.text()));
                assert(/No such city/.test(wrapper.text()));
            })
            .then(done, done);
    });

    /**
     * @LWR 1.c. Pressing enter or clicking the search button MUST cause a 
     * search operation.
     */
    it('the Search component sets the searchTerm', function () {
        const wrapper = shallowMount(App, {localVue});
        const search = wrapper.find(Search);
        assert(search.isVueInstance());
        search.vm.$emit('search', 'Des Moines');
        expect(wrapper.vm.searchTerm).toEqual('Des Moines');
    });

    /**
     * @LWR 1.d. When the location changes, this component MUST pull new data 
     * from the backend.
     */
    it('the App passes the search term to a ForecastList', function (done) {
        const wrapper = shallowMount(App, {localVue});
        waitTicks(wrapper.vm, 2)
            .then(() => {
                const list = wrapper.find(ForecastList);
                assert(list.isVueInstance());
                expect(list.vm.periods).toEqual(wrapper.vm.weather.list);
            })
            .then(done, done);
    });

    /**
     * @LWR 2.d. The weather forecast list items MUST display a more detailed 
     * view when clicked.
     */
    it('the ForecastList component sets the selectedPeriod', function (done) {
        const wrapper = shallowMount(App, {localVue});
        waitTicks(wrapper.vm, 2)
            .then(() => {
                const list = wrapper.find(ForecastList);
                assert(list.isVueInstance());
                const period = {};
                list.vm.$emit('click', period);
                expect(wrapper.vm.selectedPeriod).toEqual(period);
            })
            .then(done, done);
    });

    /**
     * @LWR 2.d.e. The detailed view MUST have an X to close the detailed view.
     */
    it('the ForecastDetail closes', function () {
        const wrapper = shallowMount(App, {localVue});
        wrapper.setData({selectedPeriod: {}});
        const detail = wrapper.find(ForecastDetail);
        assert(detail.isVueInstance());
        detail.vm.$emit('close');
        expect(wrapper.findAll(ForecastDetail).length).toEqual(0);
    });
});
