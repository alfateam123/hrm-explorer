import React, {Component} from "react";
import "./CodeExplorer.css";

export class CodeExplorer extends Component {

	onBreakpointClick = (e) => {
		const lineNumber = Number(e.target.parentElement.parentElement.dataset.index);
		this.props.toggleBreakpoint(lineNumber);
	}

	componentDidUpdate() {
		// make the current instruction visible
		const currentInstructionCounter = this.props.dump.internal_state.instruction_counter;
		const currentElement = this.codeExplorerDom.children[currentInstructionCounter];
		const newTopPos = currentElement.offsetTop;
		this.codeExplorerDom.scrollTop = newTopPos;
	}

	render() {
		const currentInstructionCounter = this.props.dump.internal_state.instruction_counter;
		return <div className="code-explorer" key="code-explorer"
			ref={(element) => this.codeExplorerDom = element}>
			{
				this.props.code.map((line, index) => {
						const currentClass = (index === currentInstructionCounter) ? "current" : "";
						const isBreakpointEnabled = this.props.breakpoints.indexOf(index) !== -1;
						const breakpointClass = isBreakpointEnabled ? "breakpoint-enabled": "";
						return <div className="code-explorer-line" key={index+breakpointClass}>
							<div data-index={index} onClick={this.onBreakpointClick}>
								<svg viewBox="0 0 10 10" height={20} width={20} xmlns="http://www.w3.org/2000/svg">
									<circle cx="5" cy="5" r="5" className={`breakpoint ${breakpointClass}`}/>
								</svg>
							</div>
							<p className={`code-explorer-item ${currentClass}`} title={line}>{line}</p>
						</div>;
				})
			}
		</div>;
	}
}
