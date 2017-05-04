import React, { Component } from 'react';

class Button extends Component {

    render() {
        const style = getStyles(this.props);

        return (
            <button className="c-button" type="button">
                <div className="c-button__text">{{text}}</div>
                <div className="c-button__icon▾">{{icon}}</div>
            </button>
        );
    }
}

export default Button;
