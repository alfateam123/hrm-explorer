import React, {Component} from "react";

export class CodeStateViewer extends Component {

	renderValue(rawValue){
		if(!rawValue) return "None";

		if(rawValue.hasOwnProperty("Number")) return `Number(${rawValue.Number.value})`;
		if(rawValue.hasOwnProperty("Character")) return `Character(${rawValue.Character.value})`;
	}

	render() {
		const state = this.props.dump.internal_state;
		const memory = state.memory.map((memcell, _index) => <div className="memory-cell" key={this.renderValue(memcell)+_index}>{this.renderValue(memcell)}</div>);
		const input_tape = state.input_tape.map((input, _index) => <li key={_index}>{this.renderValue(input)}</li>);
		const output_tape = state.output_tape.map((output, _index) => <li key={_index}>{this.renderValue(output)}</li>);
		return <div>
			{this.props.errors?
				<div className="error-space">{this.props.errors}</div>
			: null}
			<div className="code-state">
			<div>
				<p>Input Tape</p>
				<ul>{input_tape}</ul>
			</div>
			<div>
				<div>Register: {this.renderValue(state.register)}</div>
				<div>Counter: {state.instruction_counter}</div>
				<div className="memory-layout">{memory}</div>
			</div>
			<div>
				<p>Output Tape</p>
				<ul>{output_tape}</ul>
			</div>
			</div>
		</div>;
	}
}
