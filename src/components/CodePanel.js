import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import '../CodePanelCode.css';
import Highlight from 'react-highlight';
import '../assets/CodePanel.scss';

class CodePanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showCodePanel: false,
        }
    }

    handleShowCodePanel() {
        this.code = document.getElementById('dropzone').innerHTML;
        const panel = ReactDOM.findDOMNode(this.panel);
        if (!panel.classList.contains('opened')) {
            panel.classList.add('opened');
        } else {
            panel.classList.remove('opened');
        }
        this.forceUpdate();
    }

    handleCopy() {
        const tempText = document.createElement('textarea');
        tempText.innerHTML = this.code;
        document.body.appendChild(tempText);
        tempText.select();
        document.execCommand('copy');
        tempText.remove();
    }

    render() {
        const {
            children
        } = this.props;

        const style = getStyles(this.props);

        return (
            <div className={"CodePanel " + (this.state.showCodePanel ? "opened" : "")}
                 onClick={this.handleShowCodePanel.bind(this)} ref={panel => this.panel = panel}>

                <Highlight className="code">
                    {this.code}
                </Highlight>

                <button style={style.btnCopy}
                        onClick={this.handleCopy.bind(this)}>Copiar Código</button>

            </div>

        );
    }
};

export default CodePanel;

const getStyles = (props) => {
    return ({
        btnCopy: {
            backgroundColor: "#666",
            color: "#81B2E2",
            padding: 10,
            border: "none",
            outline: "none",

        }
    })
}