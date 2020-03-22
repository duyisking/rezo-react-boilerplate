import React from 'react';
import { storiesOf } from '@storybook/react';
import TestComponent from './TestComponent';

storiesOf('TestComponent', module)
    .add('Initial', () => (
        <TestComponent />
    ));
