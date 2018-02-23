import React, {Component} from "react";
import {CodeStepDashboard} from "./Stepper";
import {CodeStateViewer} from "./CodeStateViewer";
import {CodeExplorer} from "./CodeExplorer";

import "./Explorer.css";

class Explorer extends Component {
	constructor(props) {
		super(props);

		console.log("aaaaa");
		this.dumps = props.dumps;

		this.state = {
			currentDump: this.dumps[0],
			index: 0
		}
	}

	showPrev = () => {
		if(this.state.index <= 0) return;
		this.setState({
			currentDump: this.dumps[this.state.index-1],
			index: this.state.index-1
		});
	}

	showNext = () => {
		if(this.state.index === this.dumps.length) return;
		console.log(this.dumps[this.state.index+1]);
		this.setState({
			currentDump: this.dumps[this.state.index+1],
			index: this.state.index+1
		});
	}

	reset = () => {
		this.setState({
			currentDump: this.dumps[0],
			index: 0
		});
	}

	render() {
		return <div className="explorer-container">
			<CodeExplorer code={this.props.code} dump={this.state.currentDump} />
			<div className="display">
				<CodeStepDashboard
					showPrev={this.showPrev}
					showNext={this.showNext}
					reset={this.reset}
		 	/>
				<CodeStateViewer dump={this.state.currentDump} />
			</div>
		</div>;
	}
}

export default Explorer;
