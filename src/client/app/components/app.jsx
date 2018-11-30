import React from 'react';
import { Provider } from 'react-redux';

// import our components
import Example from './atoms/Example';

const App = ({ store }) => (
    <Provider store={store}>
        <div id="content">
            <Example />
        </div>
    </Provider>
);

export default App;
