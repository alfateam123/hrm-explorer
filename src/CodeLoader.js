import React, {Component} from "react";
import AJAX from "./sa";
let HrmInterpreter = import("hrm-interpreter-wasm");

export class CodeLoader extends Component {

  constructor(props) {
		super(props);
		this.code = null;
		this.dumps = null;
	}

	dejsonify(json_code) {
		const parsed_code = JSON.parse(json_code);
		const code = parsed_code.map(line => {
			if(line.operand) {
				if(line.operation === "label") {
					return `${line.operand.Label}:`
				}
				else {
					return `${line.operation} ${line.operand[Object.keys(line.operand)[0]]}`;
				}
			}
			else {
				return `${line.operation}`;
			}
		});
		return code;
	}

	onLoadClicked = () => {
		if(this.code === null || this.dumps === null) {
			alert("you need to load both the code file and the dump file!");
		}
		else {
			this.props.onLoad(this.code, this.dumps);
		}
	}

    request = () => {
        var ajax = null;
        try {
            ajax = new AJAX("http://127.0.0.1:5000/");
        } catch (e) {
            // handle error (XMLHttpRequest object not supported)
        }

        ajax.post('http://127.0.0.1:5000/build', (jsonAssembledCode) => {
            let jsonInputFromTextDom = this.inputTextDom.value;
            HrmInterpreter.then((module) => {
                let jsonCode = JSON.stringify(JSON.parse(jsonAssembledCode).code);
                console.log("jsonAssembledCode", jsonCode);
                console.log("state", jsonInputFromTextDom);
                let interpr = module.InterpreterInterface.create(jsonCode, jsonInputFromTextDom);

                let error = false;
                let intermediate_steps = [];
                do {
                    let maybe_reason = interpr.next();
                    error = !!maybe_reason;
                    console.log("interpr - next", maybe_reason);
                    let jsonify = interpr.jsonify();
                    intermediate_steps.push(jsonify);
                    console.log("interpr - jsonify", jsonify);
                } while (!error);

                this.code = this.dejsonify(jsonCode);
                this.dumps = intermediate_steps.map(json_step => {
                    let step = JSON.parse(json_step);
                    return {
                        internal_state: step.state,
                        ended_with_error: step.ended_with_error,
                        error_reason: step.reason ? step.reason : ""
                    };
                });
                this.onLoadClicked();

            });
        }, function (statusCode) {
            console.log("build error: ", statusCode);
            alert("there was an error while compiling. syntax error, maybe?");
        }, JSON.stringify({code: this.codeTextDom.value}));

    };

	render() {
		return <div>
			<div>
                <textarea ref={elem => this.codeTextDom = elem} id="code-text"/>
				<textarea ref={elem => this.inputTextDom = elem} id="input-text"/>
			</div>
			<button onClick={this.request}>Compile and Run!</button>
		</div>;
	}
}
