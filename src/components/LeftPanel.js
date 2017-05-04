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
}

export default LeftPanel;

const getStyles = (props) => {
    return {
        panel: {
            position: "fixed",
            left: "0",
            top: "0",
            width: "200px",
            height: "100vh",
            backgroundColor: "#333",
        }
    }
}