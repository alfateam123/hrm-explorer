import React, {Component} from "react";

export class CodeExplorer extends Component {

	render() {
		const code = this.props.code || [];

		return <div className="code-explorer">
			<textarea readOnly={true}>{code.reduce(
				function(acc, item){
					return acc + "\n" + item
				}, ""
			)}</textarea>
		</div>;
	}
}
