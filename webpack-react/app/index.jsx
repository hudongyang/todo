import '../node_modules/bootstrap/scss/bootstrap.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/search';
import Plist from './components/plist';


class App extends React.Component {
	constructor() {
		super();
		this.state = {keyword: ''};
		this.refreshKeyword = this.refreshKeyword.bind(this);
	}

	refreshKeyword(name) {
		this.setState({keyword: name});
	}

	render() {
		return (
			<div className="container">
	            <section className="jumbotron">
	            	<h3 className="jumbotron-heading">Search Github Users1</h3>
	            	<Search sendAction={this.refreshKeyword}/>
	            	<Plist keyword={this.state.keyword}/>
	            </section>
	        </div>
		);
	}
}


const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(<App />, app);