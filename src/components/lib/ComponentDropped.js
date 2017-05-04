import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const boxSource = {
    beginDrag(props) {
        return {
            name: props.name,
            id: props.id,
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if (dropResult) {
            props.onMove(props.id);
        }
    },
};

@DragSource('componentContainer', boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
export default class ComponentDropped extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            contentEditable: false
        }
    }

    static defaultProps = {
        onAddBefore: () => {},
        onAddAfter: () => {},
        onDelete: () => {},
    };

    componentWillReceiveProps(props) {
        //this.setState({contentEditable: props.contentEditable});
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

    turnOffEditable() {
        // this.setState(prevState => ({
        //     contentEditable: false
        // }));
    }

    handleTurnContentEditable() {
        // console.log(this.props.contentEditable);
        // this.setState(prevState => ({
        //     contentEditable: !prevState.contentEditable
        // }));
        this.props.onContentEditable({isEditable: this.state.contentEditable, id: this.props.id});
    }

    render() {
        const {
            children,
            name,
            html,
            id,
            isDragging,
            connectDragSource,
            dangerouslySetInnerHTML
        } = this.props;

        const opacity = isDragging ? 0.4 : 1;

        const style = getStyles(this.props);

        return connectDragSource(
            <div style={{opacity}}
                 onDoubleClick={this.handleTurnContentEditable.bind(this)}
                 onMouseLeave={this.turnOffEditable.bind(this)}
                 contentEditable={this.state.contentEditable}
            >
                <div style={{}} onClick={this.handleDelete.bind(this)}/>
                <div style={{}} onClick={this.handleAddBefore.bind(this)}/>
                <div dangerouslySetInnerHTML={{...dangerouslySetInnerHTML}}/>
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