import ReactDOM from 'react-dom';
import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';
import App from './Routes';

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk)
		)
	);

ReactDOM.render(
	 <Provider store={store}><Router>
	<App />
	</Router></Provider>,
	document.getElementById('root'));