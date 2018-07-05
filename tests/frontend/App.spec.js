require('jsdom-global')();
import { shallowMount } from '@vue/test-utils';
import App from '../../frontend/App.vue';
import Search from '../../frontend/Search.vue';
import ForecastList from '../../frontend/ForecastList.vue';
import ForecastDetail from '../../frontend/ForecastDetail.vue';
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
        const search = wrapper.find(Search);
        assert(search.isVueInstance());
        search.vm.$emit('search', 'Des Moines');
        expect(wrapper.vm.searchTerm).toEqual('Des Moines');
    });

    /**
     * @LWR 2.e. When the location changes, this component MUST pull new data 
     * from the backend.
     */
    it('the App passes the search term to a ForecastList', function () {
        const wrapper = shallowMount(App, {});
        const list = wrapper.find(ForecastList);
        assert(list.isVueInstance());
        expect(list.vm.location).toEqual('New York');
    });

    /**
     * @LWR 2.d. The weather forecast list items MUST display a more detailed 
     * view when clicked.
     */
    it('the ForecastList component sets the selectedPeriod', function () {
        const wrapper = shallowMount(App, {});
        const list = wrapper.find(ForecastList);
        assert(list.isVueInstance());
        const period = {};
        list.vm.$emit('click', period);
        expect(wrapper.vm.selectedPeriod).toEqual(period);
    });

    /**
     * @LWR 2.d.e. The detailed view MUST have an X to close the detailed view.
     */
    it('the ForecastDetail closes', function () {
        const wrapper = shallowMount(App, {});
        wrapper.setData({selectedPeriod: {}});
        const detail = wrapper.find(ForecastDetail);
        assert(detail.isVueInstance());
        detail.vm.$emit('close');
        expect(wrapper.findAll(ForecastDetail).length).toEqual(0);
    });
});
