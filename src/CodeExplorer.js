import React, {Component} from "react";
import "./CodeExplorer.css";

export class CodeExplorer extends Component {

	render() {
		const currentInstructionCounter = this.props.dump.internal_state.instruction_counter;
		return <div className="code-explorer">
			{
				this.props.code.map((line, index) => {
						const currentClass = (index === currentInstructionCounter) ? "current" : "";
						return <p className={`code-explorer-item ${currentClass}`}>{line}</p>;
				})
			}
		</div>;
	}
}
