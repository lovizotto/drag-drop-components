import React, { Component } from 'react';

class LeftPanel extends Component {

    render() {
        const {
            children
        } = this.props;

        const style = getStyles(this.props);

        return (
            <div className="LeftPanel" style={style.panel}>
                {children}
            </div>
        );
    }
};

export default LeftPanel;

const getStyles = (props) => {
    return {
        panel: {
            width: "200px",
            height: window.innerHeight,
            backgroundColor: "#333",
        }
    }
}