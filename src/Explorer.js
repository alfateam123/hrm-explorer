import React, {Component} from "react";
import {CodeStepDashboard} from "./Stepper";
import {CodeStateViewer} from "./CodeStateViewer";
import {CodeExplorer} from "./CodeExplorer";

import "./Explorer.css";

class Explorer extends Component {
	constructor(props) {
		super(props);

		this.dumps = props.dumps;
		this.state = {
			currentDump: this.dumps[0],
			index: 0,
			breakpoints: []
		}
	}

    getError = (dump) => {
        return dump.ended_with_error ? dump.error_reason : null;
    };

	showPrev = () => {
		if(this.state.index <= 0) return;
		this.setState({
			error: this.getError(this.dumps[this.state.index-1]),
			currentDump: this.dumps[this.state.index-1],
			index: this.state.index-1
		});
	};

	showNext = () => {
		if(this.state.index+1 === this.dumps.length) return;
		this.setState({
            error: this.getError(this.dumps[this.state.index+1]),
			currentDump: this.dumps[this.state.index+1],
			index: this.state.index+1
		});
	};

	reset = () => {
		this.setState({
			error: null,
			currentDump: this.dumps[0],
			index: 0
		});
	}

	isBreakpointEnabledOn = (line) => {
		return this.state.breakpoints.indexOf(line) !== -1;
	}

	toggleBreakpoint = (lineNumber) => {
		let newBreakpoints = null;
		if(this.isBreakpointEnabledOn(lineNumber)){
			newBreakpoints = this.state.breakpoints.filter((ln) => ln !== lineNumber);
		}
		else {
			newBreakpoints = this.state.breakpoints;
			newBreakpoints.push(lineNumber);
		}
		this.setState({
			breakpoints: newBreakpoints
		});
	};

	run = () => {
		try {
			// index+1 to make RUN work when a breakpoint is enabled
			// on the current instruction counter
			let index = this.state.index+1;
			let currentDump = this.dumps[index];
			let ic = currentDump.internal_state.instruction_counter;

			let noMoreDumps = false;
			while(!this.isBreakpointEnabledOn(ic) && !noMoreDumps) {
				currentDump = this.dumps[index+1];

				if(currentDump) {
                    index += 1;
                    ic = currentDump.internal_state.instruction_counter;
				}
				else {
					noMoreDumps = true;
				}
			}

			this.setState({
				currentDump: this.dumps[index],
				index: index,
                error: this.getError(this.dumps[index])
			});
		} catch (e) {
			this.setState({
				error: "Reached the end of the execution without hitting any breakpoint! Click Reset to start again, and then set a breakpoint"
			});
		}
	};

	render() {
		return <div className="explorer-container">
			<CodeExplorer code={this.props.code} dump={this.state.currentDump}
				breakpoints={this.state.breakpoints}
				toggleBreakpoint={this.toggleBreakpoint} />
			<div className="display">
				<CodeStepDashboard
					showPrev={this.showPrev}
					showNext={this.showNext}
					reset={this.reset}
					run={this.run}/>
				<CodeStateViewer errors={this.state.error} dump={this.state.currentDump} />
			</div>
		</div>;
	}
}

export default Explorer;
