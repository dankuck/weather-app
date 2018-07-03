require('jsdom-global')();
import { shallowMount } from '@vue/test-utils';
import Search from '../../frontend/Search.vue';
import assert from 'assert';
import expect from 'expect';

describe('Search', function () {

    /**
     * @LWR 1. A section of the page MUST exist to enter the name of a city.
     */
    it('mounts', function () {
        const wrapper = shallowMount(Search, {});
        assert(wrapper.isVueInstance());
    });

    /**
     * @LWR 1.a. The section MUST have a text box to enter the name of a city.
     */
    it('has an input', function (done) {
        const wrapper = shallowMount(Search, {
            propsData: {
                'startSearchTerm': 'Toronto',
            },
        });
        wrapper.vm.$nextTick()
            .then(() => {
                const inputs = wrapper.findAll('input').wrappers;
                expect(inputs.length).toEqual(1);
                expect(inputs[0].element.value).toEqual('Toronto');
            })
            .then(done, done);
    });

    /**
     * @LWR 1.b. The section MUST have a search button next to it.
     */
    it('has a search button', function (done) {
        const wrapper = shallowMount(Search, {
            propsData: {
                'startSearchTerm': 'Toronto',
            },
        });
        wrapper.vm.$nextTick()
            .then(() => {
                const inputs = wrapper.findAll('button').wrappers;
                expect(inputs.length).toEqual(1);
                expect(inputs[0].text()).toEqual('Search');
            })
            .then(done, done);
    });

    /**
     * @LWR 1.c. Pressing enter or clicking the search button MUST cause a 
     * search operation.
     */
     it('emits up on search click', function (done) {
        const wrapper = shallowMount(Search, {
            propsData: {
                'startSearchTerm': 'Toronto',
            },
        });
        wrapper.vm.$nextTick()
            .then(() => {
                const button = wrapper.findAll('button').wrappers[0];
                button.trigger('click');
                const { search } = wrapper.emitted();
                assert(search);
                expect(search.length).toEqual(1);
                expect(search[0]).toEqual(['Toronto']);
            })
            .then(done, done);
     });

    /**
     * @LWR 1.c. Pressing enter or clicking the search button MUST cause a 
     * search operation.
     */
     it('emits up on search click', function (done) {
        const wrapper = shallowMount(Search, {
            propsData: {
                'startSearchTerm': 'Toronto',
            },
        });
        wrapper.vm.$nextTick()
            .then(() => {
                const input = wrapper.findAll('input').wrappers[0];
                input.trigger('keyup', {keyCode: 13});
                const { search } = wrapper.emitted();
                assert(search);
                expect(search.length).toEqual(1);
                expect(search[0]).toEqual(['Toronto']);
            })
            .then(done, done);
     });
});
