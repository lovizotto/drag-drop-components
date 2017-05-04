import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const boxTarget = {
    drop(props, monitor) {
        props.onDrop(monitor.getItem());
    },
};

@DropTarget('componentContainer', boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))
export default class Canvas extends Component {

    render() {
        const style = getStyles(this.props);

        const {
            hasComponents,
            children,
            canDrop,
            isOver,
            connectDropTarget,
            lastDroppedItem
        } = this.props;

        const isActive = canDrop && isOver;

        console.log(lastDroppedItem);

        let backgroundColor = '#fcfcfc';
        if (isActive) {
            backgroundColor = 'darkgreen';
        } else if (canDrop) {
            backgroundColor = 'darkkhaki';
        }

        return connectDropTarget(
            <div style={style.panel}>
                <div id="dropzone" style={{...style.dropzone, backgroundColor}}>
                    {hasComponents &&
                    "-- Solte aqui seu componente! --"
                    }
                </div>
                <div style={{display: hasComponents ? "block" : "none"}}/>
            </div>
        ,);
    }
}

const getStyles = (props) => {
    return {
        panel: {
            position: "fixed",
            left: "200px",
            top: "0",
            width: "calc(100vw - 200px)",
            height: "100vh",
            backgroundColor: "#f0f0f0",
            overflowY: "auto",
            padding: "10px",
        },
        dropzone: {
            padding: "40px",
            width: "100%",
            boxSizing: "border-box",
            minHeight: 200,
            height: "auto",
            backgroundColor: "#cfcfcf",
            boxShadow: "0 1px 1px 1px rgba(0,0,0,.05)"
        }
    }
}