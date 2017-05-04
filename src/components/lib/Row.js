import React, {Component} from 'react';
import '../../assets/Row.scss';

export default class Row extends Component {

    render() {
        const {
            children,
        } = this.props;

        const style = getStyles(this.props);

        return (
            <div className="Row" style={{...style.main}}>
                {children}
            </div>
        );
    }
}

const getStyles = (props) => {
    return ({
        main: {
            flex: 1,
            display: "flex",
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor: "#fff",
            flexDirection: "row",
            alignItems: "top",
            justifyContent: "space-between",
            alignContent: "center"
        },
    });
};