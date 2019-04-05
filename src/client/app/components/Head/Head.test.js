import React from 'react';
import { shallow } from 'enzyme';
import { Helmet } from 'react-helmet';

import { Head } from './Head';

describe('Head', () => {
    const wrapper = shallow(<Head />);

    it('should render as expected', () => {
        expect(wrapper.find(Helmet)).toHaveLength(1);
    });
    it('should have one title', () => {
        expect(wrapper.find('title')).toHaveLength(1);
    });
});
