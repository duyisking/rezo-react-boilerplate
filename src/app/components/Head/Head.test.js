import React from 'react';
import { mount } from 'enzyme';
import { Helmet } from 'react-helmet';

import { Head } from './Head';

describe('Head', () => {
    const title = 'Hello';
    const description = 'ABC';
    const keywords = '123';
    const canonical = '321';
    const url = 'google.com';
    const type = 'article';
    const imageUrl = 'none';

    const wrapper = mount(
        <Head
            title={title}
            description={description}
            keywords={keywords}
            canonical={canonical}
            url={url}
            type={type}
            imageUrl={imageUrl}
        />,
    );
    const helmet = Helmet.peek();

    it('should render as expected', () => {
        expect(wrapper.find(Helmet)).toHaveLength(1);
        expect(helmet.title).toEqual(title);
    });
});
