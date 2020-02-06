import React from 'react';
import { render } from 'react-dom';

//Styles
import reset from './index.css';
import css from './styles.css';

import { App } from './App';

// setup fake backend
//import { configureFakeBackend } from './_helpers';
//configureFakeBackend();

render(
    <App />,
    document.getElementById('app')
);