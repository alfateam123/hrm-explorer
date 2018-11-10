import React, {Component} from "react";
import AJAX from "./sa";

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
		// const code = this.dejsonifyCode();
		// this.props.onLoad(code, this.dumps);
		if(this.code === null || this.dumps === null) {
			alert("you need to load both the code file and the dump file!");
		}
		else {
			this.props.onLoad(this.code, this.dumps);
		}
	}

	parse_dump_line = (line) => {
		try{
			return JSON.parse(line);
		}
		catch(e){
			console.log("parse_dump_line breaks here", line, e);
			return null;
		}
	}

	// readCode = (evt) => {
	// 	let file = evt.target.files[0];
	// 	let reader = new FileReader();
	// 	var self = this;
	// 	reader.onload = (e) => {
	// 		const orig = e.target.result;
	// 		self.code = this.dejsonify(orig);
	// 	}
	// 	reader.readAsText(file);
	// }

	readDump = (evt) => {
		let file = evt.target.files[0];
		let reader = new FileReader();
		var self = this;
		reader.onload = (e) => {
			const orig = e.target.result;
			const lines = orig.split("\n");
			const parsed_lines = lines.map(this.parse_dump_line).filter(line => !!line);
			self.dumps = parsed_lines;
		}
		reader.readAsText(file);
	}

    request = () => {
        var ajax = null;
        try {
            ajax = new AJAX("http://127.0.0.1:5000/");
        } catch (e) {
            // handle error (XMLHttpRequest object not supported)
        }

        ajax.post('http://127.0.0.1:5000/build', (jsonAssembledCode) => {
            ajax.post('http://127.0.0.1:5000/run', (executionStatesList) => {
                this.code = this.dejsonify(JSON.stringify(JSON.parse(jsonAssembledCode).code));
                this.dumps = JSON.parse(executionStatesList).states;
                this.onLoadClicked();
            }, function (statusCode) { // Handle failure
                console.log("run error: ", statusCode);
                alert("could not run the application!?!?!?!");
            }, JSON.stringify({
                code: JSON.parse(jsonAssembledCode).code,
                input: JSON.parse(this.inputTextDom.value)
            }));

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
