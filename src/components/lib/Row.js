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
            minHeight: 200,
            display: "flex",
            margin: 10,
            paddingTop: 60,
            paddingLeft: 30,
            paddingRight: 30,
            paddingBottom: 60,
            backgroundColor: "#fff",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignContent: "center"
        },
    });
};