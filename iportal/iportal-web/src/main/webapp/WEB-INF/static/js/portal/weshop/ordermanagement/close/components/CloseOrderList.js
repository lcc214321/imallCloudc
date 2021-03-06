import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import OrderList from '../../order/components/OrderList';

class CloseOrderList extends Component{
    render() {
        const {actions}=this.props;

        return(
            <div>
                <OrderList actions={actions} orderStateCode="CLOSE" />
            </div>
        );
    }
}

CloseOrderList.propTypes = {
    actions: PropTypes.object.isRequired
};

CloseOrderList.contextTypes = {
    store: React.PropTypes.object
};

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CloseOrderList);