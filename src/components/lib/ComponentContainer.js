import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const boxSource = {
    beginDrag(props) {
        return {
            name: props.html,
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if (dropResult) {
            //alert(dropResult);
        }
    },
};

@DragSource('componentContainer', boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
export default class ComponentContainer extends Component {

    render() {
        const {
            children,
            name,
            html,
            isDragging,
            connectDragSource
        } = this.props;

        const opacity = isDragging ? 0.4 : 1;

        return connectDragSource(
            <div style={{opacity}}>
                {children}
            </div>,);
    }
}