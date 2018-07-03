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
});
