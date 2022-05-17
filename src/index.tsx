import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals'

import {configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import {slice} from './useStore'

import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './assets/css/grid.css'
import './assets/css/theme.css'
import './assets/css/index.css'

import Layout from './components/layout/Layout'

const store = configureStore({reducer: slice.reducer});

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<Layout />
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
