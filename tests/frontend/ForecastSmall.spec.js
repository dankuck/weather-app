require('jsdom-global')();
import { shallowMount } from '@vue/test-utils';
import ForecastSmall from '../../frontend/ForecastSmall.vue';
import assert from 'assert';
import expect from 'expect';
import sampleResponse from './sample-response.json';

describe('ForecastSmall', function () {

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
        const wrapper = shallowMount(ForecastSmall, {
            propsData: {
                period: sampleResponse.list[0],
            },
        });
        assert(/2018-07-04 03:00:00/.test(wrapper.text()));
        assert(/Clouds/.test(wrapper.text()));
        assert(/297\/298/.test(wrapper.text()));
        expect(wrapper.findAll('img').length).toEqual(1);
    });
});
