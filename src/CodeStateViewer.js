import React, {Component} from "react";
/*
InternalState { register: None, 
  input_tape: [Number { value: 5 }, Number { value: 5 }, Number { value: 5 }, Number { value: 1 }],
output_tape: [], memory: [None, None, None, None, None, None, None, N
None, None, None, Some(Number { value: 0 }), Some(Number { value: 4 })], instruction_counter: 1 }
*/

export class CodeStateViewer extends Component {
/*
	renderRegister(rawRegister) {
		if(!rawRegister) return "None";

		if(rawRegister.hasOwnProperty("Number")) return rawRegister.Number;
		if(rawRegister.hasOwnProperty("Character")) return rawRegister.Character;
	}
*/
	renderValue(rawValue){
		if(!rawValue) return "None";

		if(rawValue.hasOwnProperty("Number")) return `Number(${rawValue.Number.value})`;
		if(rawValue.hasOwnProperty("Character")) return `Character(${rawValue.Character.value})`;
	}

	render() {

		const state = this.props.dump.internal_state;
		const memory = state.memory.map(memcell => <div className="memory-cell">{this.renderValue(memcell)}</div>);
		return <div className="code-state">
			<div>
				<p>Input Tape</p>
				<ul>
					<li>Number(5)</li>
					<li>Number(5)</li>
				</ul>
			</div>
			<div>
				<div>Register: {this.renderValue(state.register)}</div>
				<div>Counter: {state.instruction_counter}</div>
				<div className="memory-layout">{memory}</div>
			</div>
			<div>
				<p>Output Tape</p>
				<ul>
					<li>Number(5)</li>
				</ul>
			</div>
		</div>;
	}
}
