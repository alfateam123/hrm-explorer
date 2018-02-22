import React, {Component} from "react";

export class CodeLoader extends Component {

  constructor(props) {
		super(props);
		this.code = null;
		this.dumps = null;
	}

	dejsonifyCode() {
		const json_code = this.codeTextArea.value;
		return this.dejsonify(json_code);
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
			console.log("parse_dump_line breaks here", line);
			return null;
		}
	}

	readCode = (evt) => {
		let file = evt.target.files[0];
		let reader = new FileReader();
		var self = this;
		reader.onload = (e) => {
			const orig = e.target.result;
			self.code = this.dejsonify(orig);
		}
		reader.readAsText(file);
	}

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

	render() {
		return <div>
			<div onClick={this.onLoadClicked}><p>LOAD > </p></div>
			<div>
			{/*<textarea ref={(elem) => this.codeTextArea = elem } id="loader-code"></textarea>*/}
			<input type="file" id="code-file" name="codeFile"
		         ref={(elem) => this.codeFileDom = elem } onChange={this.readCode} />
			<input type="file" id="dump-file" name="dumpFile"
		         ref={(elem) => this.dumpFileDom = elem } onChange={this.readDump} />
			{/*<textarea ref={(elem) => this.dumpTextArea = elem } id="loader-dump"></textarea>*/}
			</div>
		</div>;
	}
}
