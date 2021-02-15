import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './components';

document.addEventListener('contextmenu', (event) => {
	event.preventDefault();
});
document.addEventListener('copy', event => {
	event.clipboardData?.setData('text/plain', '');
	event.preventDefault();
})

ReactDOM.render(
	<App />,
	document.getElementById('root'),
);
