import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import './App.css';
import 'normalize.css';
import LeftPanel from "./components/LeftPanel";
import Canvas from "./components/Canvas";
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ComponentContainer from "./components/lib/ComponentContainer";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasComponents: false,
        }
    }

    getComponents() {
        return [
            {
                description: "Botão Responsivo",
                name: "button",
                thumb: "button.png",
                file: "button.html"
            }
        ];
    }

    handleDrop(e) {

        fetch("/components/" + e.name + "/" + e.name + '.html',
            {
                headers: new Headers({
                    'Content-Type': 'text/html'
                })
            })
            .then( resp => resp.text() )
            .then(
                comp => {
                    document.getElementById('dropzone').innerHTML += comp;
                }
            );

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

        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <div className="App">
                    <LeftPanel>
                        <ul style={style.leftPanelList}>
                            {components}
                        </ul>
                    </LeftPanel>
                    <Canvas onDrop={this.handleDrop.bind(this)}
                            hasComponents={this.state.hasComponents}
                            ref={canvas => this.canvas = canvas}/>

                </div>
            </DragDropContextProvider>
        );
    }
}

export default App;

const getStyles = (props) => ({
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
    }
});