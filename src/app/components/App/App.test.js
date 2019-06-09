
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import App from './App';

describe('App', () => {
    const tree = renderer.create(<App />).toJSON();

    it('should render as expected', () => {
        expect(tree).toMatchSnapshot();
    });
});
