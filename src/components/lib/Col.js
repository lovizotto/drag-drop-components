import React, {Component} from 'react';
import { DropTarget } from 'react-dnd';
import '../../assets/Col.scss';

const boxTarget = {
    drop(props, monitor, component) {
        props.onDrop(monitor.getItem(), component);
    },
};

@DropTarget('componentContainer', boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    isOverCurrent: monitor.isOver({ shallow: true }),
}))
export default class Col extends Component {

    render() {
        const {
            canDrop,
            isOver,
            connectDropTarget,
        } = this.props;

        const isActive = canDrop && isOver;

        let backgroundColor = '#fff';
        if (isActive) {
            backgroundColor = 'lightgreen';
        } else if (canDrop) {
            backgroundColor = '#ccc';
        }

        const style = getStyles(this.props);

        return connectDropTarget(
            <div className="Col" style={{...style.col, backgroundColor}}/>,
        );
    }
}

const getStyles = (props) => {
    return ({
        col: {
            flex: 1,
            marginLeft: 15,
            marginRight: 15,
            minHeight: 200,
            height: "auto"
        }
    });
};