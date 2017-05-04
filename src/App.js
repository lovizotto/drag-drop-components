import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';

import './assets/App.scss';
import './App.css';
import 'normalize.css';
import LeftPanel from "./components/LeftPanel";
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ComponentContainer from "./components/lib/ComponentContainer";
import Row from "./components/lib/Row";
import Col from "./components/lib/Col";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasComponents: false,
            dropzone: [],
            rows: [{numCols: 1},{numCols: 2},{numCols: 3}],
            numCols: 1,
            panelRowOpened: false,
            showCodePanel: false,
        }
    }

    /**
     * Lista de todos os components cadastrados
     * @return {[*,*]}
     */
    getComponents() {
        return [
            {
                description: "Botão Responsivo",
                name: "button",
                thumb: "button.png",
                file: "button.html"
            },
            {
                description: "Campo de Texto",
                name: "textfield",
                thumb: "textfield.png",
                file: "textfield.html"
            }
        ];
    }

    handleDrop(e, component) {

        const el = ReactDOM.findDOMNode(component);
        fetch("/components/" + e.name + "/" + e.name + '.html',
            {
                headers: new Headers({
                    'Content-Type': 'text/html'
                })
            })
            .then(resp => resp.text())
            .then(
                comp => {
                    el.innerHTML += comp;
                    el.setAttribute("contenteditable", true);
                    this.code.innerText = document.getElementById('dropzone').innerHTML;
                }
            );
    }

    handleDropContainer(e) {
        this.handleDrop(e);
    }

    handleNumCols(e) {
        this.setState({numCols: e.target.value});
    }

    handleAddRow(e) {
        e.preventDefault();
        this.setState({
            numCols: e.target.value,
            panelRowOpened:false
        });
    }

    openRow() {
        if (this.state.panelRowOpened) return false;
        this.setState(prevState => ({panelRowOpened: !prevState.panelRowOpened}))
    }

    exportHTML(e) {
        let elHtml = document.getElementById('dropzone').innerHTML;
        let link = document.createElement('a');

        link.setAttribute('download', 'index.html');
        link.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(elHtml));
        link.click();
    }

    handleShowCodePanel() {
        this.setState(prevState => ({showCodePanel: !prevState.showCodePanel}));
    }

    render() {

        const style = getStyles(this.props);

        const components = this.getComponents().map(
            (c, index) => <li key={index} style={style.item}>
                <ComponentContainer html={c.name}>
                    <img src={process.env.PUBLIC_URL + "/components/" + c.name + "/" + c.thumb}
                         style={{maxWidth: "100%"}} />
                    <h5 style={style.item.header}>{c.description}</h5>
                </ComponentContainer>
            </li>
        );

        const rows = this.state.rows.map(
            (r, index) => {
                let cols = [];
                for (let i = 0; i < r.numCols; i++) {
                    cols.push(<Col key={i} onDrop={this.handleDrop.bind(this)}/>);
                }
                return (
                    <Row key={index}>
                        {cols}
                    </Row>
                );
            }
        );

        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <div className="App" style={style.App}>
                    <LeftPanel>
                        <ul style={style.leftPanelList}>
                            {components}
                        </ul>
                        <button onClick={this.exportHTML.bind(this)}>Exportar</button>
                    </LeftPanel>
                    <div id="dropzone" style={style.contents} ref={dropzone => this.dropzone = dropzone}>
                        {rows}
                    </div>
                    <div className={"add-row " + (this.state.panelRowOpened ? "active" : "")}
                         onClick={this.openRow.bind(this)}>
                        <div className={"data " + (this.state.panelRowOpened ? "active" : "")}>
                            <h1 style={{color:"#C5E0FF", fontSize:"18px", marginTop:20}}>
                                Número de Colunas:
                            </h1>
                            <input type="number"
                                   onChange={this.handleNumCols.bind(this)}
                                   value={this.state.numCols} />
                            <button onClick={this.handleAddRow.bind(this)}>Adicionar</button>
                            <button onClick={this.handleAddRow.bind(this)}>Cancelar</button>
                        </div>
                    </div>
                    <div className={"code-panel " + (this.state.showCodePanel ? "opened" : "")}
                         onClick={this.handleShowCodePanel.bind(this)}>
                        <pre className="code" ref={code => this.code = code}/>
                    </div>
                </div>

            </DragDropContextProvider>
        );
    }
}

export default App;

const getStyles = (props) => ({
    App: {
        display: "flex",
        flexDirection: "row",
    },
    leftPanelList: {
        listStyle: "none",
        margin: 0,
        padding: 0
    },
    item: {
        padding: 20,
        header: {
            color: "white",
            fontWeight: "normal",
            margin: 5
        }
    },
    contents: {
        flex: 1,
        flexDirection: "col",
    }
});