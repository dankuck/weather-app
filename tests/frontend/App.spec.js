require('jsdom-global')();
import { shallowMount } from '@vue/test-utils';
import App from '../../frontend/App.vue';
import Search from '../../frontend/Search.vue';
import assert from 'assert';
import expect from 'expect';

describe('App', function () {

    it('mounts', function () {
        const wrapper = shallowMount(App, {});
        assert(wrapper.isVueInstance());
    });

    it('has the title', function () {
        const wrapper = shallowMount(App, {});
        assert(/Daniel Kuck's Amazing Weather App/.test(wrapper.text()));
    });

    /**
     * @LWR 1.c. Pressing enter or clicking the search button MUST cause a 
     * search operation.
     */
    it('the Search component sets the searchTerm', function () {
        const wrapper = shallowMount(App, {});
        const search = wrapper.vm.$children[0];
        search.$emit('search', 'Des Moines');
        expect(wrapper.vm.searchTerm).toEqual('Des Moines');
    });

    /**
     * @LWR 2.e. When the location changes, this component MUST pull new data 
     * from the backend.
     */
    it('the App passes the search term to a ForecastList', function () {
        const wrapper = shallowMount(App, {});
        const forecast = wrapper.vm.$children[1];
        expect(forecast.location).toEqual('New York');
    });

    /**
     * @LWR 2.d. The weather forecast list items MUST display a more detailed 
     * view when clicked.
     */
    it('the ForecastList component sets the selectedPeriod', function () {
        const wrapper = shallowMount(App, {});
        const list = wrapper.vm.$children[1];
        const period = {};
        list.$emit('click', period);
        expect(wrapper.vm.selectedPeriod).toEqual(period);
    });
});
