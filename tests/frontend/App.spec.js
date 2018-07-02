require('jsdom-global')();
import { shallowMount } from '@vue/test-utils';
import App from '../../frontend/App.vue';
import assert from 'assert';

describe('App', function () {

    it('mounts', function () {
        let wrapper = shallowMount(App, {});
        assert(wrapper.isVueInstance());
    });

    it('has the title', function () {
        let wrapper = shallowMount(App, {});
        assert(/Daniel Kuck's Amazing Weather App/.test(wrapper.text()));
    });
});
