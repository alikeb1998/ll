import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

import {Home, Reader} from '../pages';

export const RootRouter = () => {
	return (
		<Router>
			<div>
				<Switch>
					<Route path='/' exact>
						<Home />
					</Route>
					<Route path='/reader' exact>
						<Reader />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};
