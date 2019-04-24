import React from 'react';
import { shallow } from 'enzyme';

import { ChangeTitleForm } from './ChangeTitleForm';

describe('ChangeTitleForm', () => {
    const title = 'hi';
    const changeTitle = jest.fn();
    const wrapper = shallow(<ChangeTitleForm title={title} changeTitle={changeTitle} />);

    describe('Basic', () => {
        it('should render as expected', () => {
            expect(wrapper.find('form')).toHaveLength(1);
        });

        it('Initial state should be equal to props', () => {
            expect(wrapper.state('title')).toEqual(wrapper.instance().props.title);
            expect(wrapper.state('title')).toEqual(title);
        });
    });


    describe('Events', () => {
        const newTitle = 'abcd';
        it('input[type=text] onChange', () => {
            wrapper.find('input[type="text"]').simulate('change', { target: { value: newTitle } });

            expect(wrapper.state('title')).toEqual(newTitle);
            expect(wrapper.instance().props.title).toEqual(title);
        });
        it('input[type=submit] onChange', () => {
            wrapper.find('form').simulate('submit', { preventDefault: () => {} });

            expect(changeTitle.mock.calls).toHaveLength(1);
            expect(changeTitle.mock.calls[0][0]).toEqual(newTitle);
        });
    });
});
