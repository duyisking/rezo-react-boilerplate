import React from 'react';
import { shallow } from 'enzyme';

import GlobalStyle from './GlobalStyle';

describe('GlobalStyle', () => {
    const wrapper = shallow(<GlobalStyle />);

    it('should render as expected', () => {
        expect(wrapper).toBe(true);
    });
});
