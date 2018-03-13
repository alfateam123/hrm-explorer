import React, {Component} from "react";
import './Stepper.css';

export class CodeStepDashboard extends Component {
	render() {
		return <div id="code-step-dashboard">
			<div id="prev" onClick={this.props.showPrev}>PREV</div>
			<div id="next" onClick={this.props.showNext}>NEXT</div>
			<div id="reset" onClick={this.props.reset}>RESET</div>
			<div id="run" onClick={this.props.run}>RUN</div>
		</div>;
	}
}
