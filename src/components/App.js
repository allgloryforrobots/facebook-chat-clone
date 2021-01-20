import React, { Component } from 'react';
import { BrowserRouter as Router, Route, PropsRoute} from 'react-router-dom';

import Landing from './Landing';

class App extends Component {
	render() {
		return(
			<div className="container">
				<Landing/>
			</div>
		);
	}
}

export default App