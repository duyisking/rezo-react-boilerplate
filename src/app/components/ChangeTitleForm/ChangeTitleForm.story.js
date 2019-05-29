import React from 'react';
import { storiesOf } from '@storybook/react';
import { ChangeTitleForm } from './ChangeTitleForm';

storiesOf('ChangeTitleForm', module)
    .add('Initial', () => (
        <ChangeTitleForm />
    ));
