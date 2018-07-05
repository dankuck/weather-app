require('jsdom-global')();
import { shallowMount } from '@vue/test-utils';
import ForecastDetail from '../../frontend/ForecastDetail.vue';
import assert from 'assert';
import expect from 'expect';
import sampleResponse from './sample-response.json';

describe('ForecastDetail', function () {

    /**
     * @LWR 2.d. The weather forecast list items MUST display a more detailed 
     * view when clicked.
     */
    it('should mount', function () {
        const wrapper = shallowMount(ForecastDetail, {
            propsData: {
                period: sampleResponse.list[0],
            },
        });
        assert(wrapper.vm.period);
    });

    /**
     * @LWR 2.d.a. The detailed view MUST display the weather icon.
     * 
     * @LWR 2.d.b. The detailed view MUST display a verbose date and time.
     *
     * @LWR 2.d.c. The detailed view MUST display the high and low.
     *
     * @LWR 2.d.d. The detailed view MUST display the humidity.
     */
    it('should have an icon', function () {
        const wrapper = shallowMount(ForecastDetail, {
            propsData: {
                period: sampleResponse.list[0],
            },
        });
        expect(wrapper.findAll('img').length).toEqual(1);
        assert(/Tuesday, July 3rd 2018, 11:00:00 pm/.test(wrapper.text()));
        assert(/298°F/.test(wrapper.text()));
        assert(/297°F/.test(wrapper.text()));
        assert(/70%/.test(wrapper.text()));
    });
});
