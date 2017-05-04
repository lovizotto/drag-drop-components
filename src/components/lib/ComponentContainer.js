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

    static defaultProps = {
        onAddBefore: () => {},
        onAddAfter: () => {},
        onDelete: () => {},
    }


    handleAddBefore(e) {
        this.props.onAddBefore(e);
    }

    handleAddAfter(e) {
        this.props.onAddAfter(e);
    }

    handleDelete(e) {
        this.props.onDelete(e);
    }

    render() {
        const {
            children,
            name,
            html,
            isDragging,
            connectDragSource
        } = this.props;

        const opacity = isDragging ? 0.4 : 1;

        const style = getStyles(this.props);

        return connectDragSource(
            <div style={{opacity}}>
                <div style={{}} onClick={this.handleDelete.bind(this)}/>
                <div style={{}} onClick={this.handleAddBefore.bind(this)}/>
                {children}
                <div style={{}} onClick={this.handleAddAfter.bind(this)}/>
            </div>,);
    }
}

const getStyles = (props) => {
    return ({
        addArea: {
            width: "100%",
            backgroundColor: "#C5E0FF",
            height: 0,

            hovered: {
                height: 50,
            }
        }
    });
}