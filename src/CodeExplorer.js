import React, {Component} from "react";
import "./CodeExplorer.css";

export class CodeExplorer extends Component {

	isBreakpointEnabledOn = (line) => {
		return this.props.breakpoints.indexOf(line) !== -1;
	}

	onBreakpointClick = (e) => {
		const lineNumber = Number(e.target.parentElement.parentElement.dataset.index);
		this.props.toggleBreakpoint(lineNumber);
	}

	render() {
		const currentInstructionCounter = this.props.dump.internal_state.instruction_counter;
		return <div className="code-explorer">
			{
				this.props.code.map((line, index) => {
						const currentClass = (index === currentInstructionCounter) ? "current" : "";
						const breakpointClass = this.isBreakpointEnabledOn(index) ? "breakpoint-enabled": "";
						return <div className="code-explorer-line">
							<div data-index={index} onClick={this.onBreakpointClick}>
								<svg viewBox="0 0 10 10" height={20} width={20} xmlns="http://www.w3.org/2000/svg">
									<circle cx="5" cy="5" r="5" className={`breakpoint ${breakpointClass}`}/>
								</svg>
							</div>
							<p className={`code-explorer-item ${currentClass}`}>{line}</p>
						</div>;
				})
			}
		</div>;
	}
}
