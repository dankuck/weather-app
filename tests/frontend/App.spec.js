import { shallow } from '@vue/test-utils';
import App from '../../frontend/App.vue';
import assert from 'assert';

describe('App', function () {

    let wrapper;

    beforeEach(function () {
        wrapper = shallow(App, {});
    });

    it('mounts', function () {
        assert(wrapper.isVueInstance());
    });
});
