require('jsdom-global')();
import { shallowMount } from '@vue/test-utils';
import ForecastList from '../../frontend/ForecastList.vue';
import assert from 'assert';
import expect from 'expect';
import sampleResponse from './sample-response.json';

describe('ForecastList', function () {

    /**
     * @LWR 2. A section MUST exist to display the results of a search.
     */
    it('mounts', function () {
        const wrapper = shallowMount(ForecastList, {});
        assert(wrapper.isVueInstance());
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
    it('shows the list', function () {
        const wrapper = shallowMount(ForecastList, {
            propsData: {
                periods: sampleResponse.list,
            },
        });
        expect(wrapper.vm.$children.length).toEqual(2);
    });

    /**
     * @LWR 2.c.e. Each list item MUST emit when clicked.
     */
    it('emits when clicked', function () {
        const wrapper = shallowMount(ForecastList, {
            propsData: {
                periods: sampleResponse.list,
            },
        });
        
        wrapper.vm.$children[0].$emit('click');
        const clicks = wrapper.emitted().click;
        assert(clicks);
        expect(clicks.length).toEqual(1);
        expect(clicks[0][0].dt_txt).toEqual("2018-07-04 03:00:00");
    });
});
