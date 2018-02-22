import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Explorer from "./Explorer";
import {CodeLoader} from "./CodeLoader";

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			showExplorer: false
		};
	}

	showExplorer =  (code, dumps) => {
		this.setState({
			showExplorer: true,
			code: code,
			dumps: dumps
		});
	}

  render() {
    return (
      <div className="App">
			  {this.state.showExplorer?
          <Explorer code={this.state.code} dumps={this.state.dumps} />
        : <CodeLoader onLoad={this.showExplorer} />
				}
      </div>
    );
  }
}

export default App;
