require('jsdom-global')();
import { shallowMount } from '@vue/test-utils';
import Search from '../../frontend/Search.vue';
import assert from 'assert';
import expect from 'expect';

describe('Search', function () {

    // @LWR 1. A section of the page MUST exist to enter the name of a city.
    it('mounts', function () {
        let wrapper = shallowMount(Search, {});
        assert(wrapper.isVueInstance());
    });

    // @LWR 1.a. The section MUST have a text box to enter the name of a city.
    it('has an input', function (done) {
        let wrapper = shallowMount(Search, {
            propsData: {
                'searchTerm': 'Toronto',
            },
        });
        wrapper.vm.$nextTick()
            .then(() => {
                let inputs = wrapper.findAll('input').wrappers;
                expect(inputs.length).toEqual(1);
                expect(inputs[0].element.value).toEqual('Toronto');
            })
            .then(done, done);
    });

    // @LWR 1.b. The section MUST have a search button next to it.
    it('has a search button', function (done) {
        let wrapper = shallowMount(Search, {
            propsData: {
                'searchTerm': 'Toronto',
            },
        });
        wrapper.vm.$nextTick()
            .then(() => {
                let inputs = wrapper.findAll('button').wrappers;
                expect(inputs.length).toEqual(1);
                expect(inputs[0].text()).toEqual('Search');
            })
            .then(done, done);
    });
});
