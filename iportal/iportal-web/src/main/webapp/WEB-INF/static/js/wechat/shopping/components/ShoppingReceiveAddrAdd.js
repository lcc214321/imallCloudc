import React, {PropTypes, Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {validate, inputField, textareaField, hiddenField} from "../../../common/redux-form-ext-frontend";
import {selectZone, saveReceiveAddr} from "../actions/index";
import {
    QQ_MAP_KEY,
    QQ_MAP_PROJECT_NM,
    WEB_NAME,
    REGEXP_PHONE,
    ERROR_PHONE_FORMAT
} from "../../../common/common-constant";

const fields = [
    {
        field: 'receiverName',
        validate: {
            required: true,
            fieldNm: '收货人',
            maxlength: 32
        }
    },
    {
        field: 'contactTel',
        validate: {
            required: true,
            fieldNm: '电话',
            maxlength: 32,
            regx: REGEXP_PHONE,
            error: ERROR_PHONE_FORMAT
        }
    },
    {
        field: 'deliveryAddr',
        validate: {
            required: true,
            fieldNm: '地区',
            maxlength: 64
        }
    },
    {
        field: 'detailAddr',
        validate: {
            required: true,
            fieldNm: '详细地址',
            maxlength: 128
        }
    }
];

class ShoppingReceiveAddrAdd extends Component{

    componentWillMount(){
        document.title = WEB_NAME + "新增收货地址";
        const {change, selectZone} = this.props;
        selectZone(false);
        let oldViewportContent = document.getElementsByTagName('meta')['viewport'].content;
        window.addEventListener('message', function(event) {
            // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
            var loc = event.data;
            if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
                console.log('location', loc);
                change("deliveryAddr", loc.poiaddress);
                change("addrLat", loc.latlng.lat);
                change("addrLng", loc.latlng.lng);
                change("positionName", loc.poiname);
                change("cityName", loc.cityname);
                selectZone(false);
                if(oldViewportContent) {
                    document.getElementsByTagName('meta')['viewport'].setAttribute("content",oldViewportContent);
                }
            }
        }, false);
    }

    componentWillUnmount() {
        if(this.oldViewportContent) {
            document.getElementsByTagName('meta')['viewport'].setAttribute("content",this.oldViewportContent);
        }
    }

    showErrorMessage(){
        const {store} = this.context;
        const syncErrors = store.getState().form.receiveAddrAdd.syncErrors || {};
        if(syncErrors !== null){
            for(const i in syncErrors){
                showError(syncErrors[i]);
            }
        }
    }

    selectZone() {
        const {selectZone} = this.props;
        let viewport = document.getElementsByTagName('meta')['viewport'];
        this.oldViewportContent = viewport.content;
        viewport.setAttribute("content","width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no");
        selectZone(true);
    }

    render(){
        const {selectZone, handleSubmit, submitting, saveReceiveAddr} = this.props;
        const {store} = this.context;
        const {showSelectZone} = store.getState().shoppingTodos;
        const values = store.getState().form.receiveAddrAdd.values || {};
        const positionName = values.positionName || '';
        return(
            <div>
                {showSelectZone &&
                <iframe id="mapPage" width="100%" height="100%" frameBorder="0" src={"http://apis.map.qq.com/tools/locpicker?policy=1&search=1&type=1&key="+ QQ_MAP_KEY +"&referer=" + QQ_MAP_PROJECT_NM}>
                </iframe>}
                {!showSelectZone &&
                <div className="main-index add-address">
                    <form onSubmit={handleSubmit(data => saveReceiveAddr(data))}>
                        <Field id="positionName" name="positionName" component={hiddenField}/>
                        <Field id="cityName" name="cityName" component={hiddenField}/>
                        <Field id="receiverName" name="receiverName" label="收货人" placeholder="收货人姓名" type="text" component={inputField}/>
                        <Field id="contactTel" name="contactTel" label="电话" placeholder="收货人电话" maxLength="11" type="text" component={inputField}/>
                        <Field id="deliveryAddr" name="deliveryAddr" component={hiddenField}/>
                        <div onClick={this.selectZone.bind(this)} className="region">
                            <a href="javascript:;"><span>地区</span><i>{values.deliveryAddr}</i></a>
                            <em></em>
                        </div>
                        <Field id="detailAddr" name="detailAddr" placeholder="详细地址" rows="3" cols="20" component={textareaField}/>
                        <div className="submit">
                            <label><input disabled={submitting} onClick={() => this.showErrorMessage()} type="submit" value="确定"/></label></div>
                    </form>
                </div>
                }
            </div>
        );
    }
}

ShoppingReceiveAddrAdd.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};

ShoppingReceiveAddrAdd.contextTypes = {
  store: React.PropTypes.object
};

function mapStateToProps(state) {
    return {
        initialValues: {},
        state,
        fields
    };
}

ShoppingReceiveAddrAdd = reduxForm({
    form: "receiveAddrAdd",
    enableReinitialize: true,
    validate
})(ShoppingReceiveAddrAdd);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectZone, saveReceiveAddr}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingReceiveAddrAdd);