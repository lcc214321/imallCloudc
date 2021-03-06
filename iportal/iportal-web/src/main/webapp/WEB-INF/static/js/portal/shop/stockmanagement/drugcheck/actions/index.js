import * as types from "../constants/ActionTypes";
import "whatwg-fetch";
import {VALID_FORM_INIT} from "../../../../../common/validForm/constants/ActionTypes";
import {showErrorMsg} from '../../../../../common/common';
import {REGEXP_UNSIGNED_INT, REGEXP_SIGNLESS_INT} from "../../../../../common/common-constant";
import {formatData} from '../../../../../common/redux-form-ext';

/**
 * 设置搜索参数
 * @param params
 * @returns {Function}
 */
export function drugCheckSetSearchParams(params) {
    return function (dispatch) {
        dispatch({
            type: types.DRUG_CHECK_SEARCH_PARAMS,
            data: params
        })
    }
}

/**
 * 新增窗口显示与隐藏
 * @param isShowAdd
 * @returns {Function}
 */
export function showAddForm(isShowAdd, goods=[]){
    let goodsMap = new Map();
    goods.map((item)=>{
        goodsMap.set(item.goodsId, item);
    });

    return function (dispatch) {
        dispatch({
            type: types.DRUG_CHECK_ADD_MODULE,
            isShowAdd: isShowAdd,
            goods:goods,
            goodsMap:goodsMap
        });

        dispatch({
            type: types.DRUG_CHECK_GOODS_SELECT,
            checkGoodsIdMap: new Map(),
            isCheckAll:false
        });
    }
}

/**
 * 详情
 * @param id
 * @returns {Function}
 */
export function showDetail(isShowDetail, id={}){
    if(isShowDetail==true){
        let url = iportal + "/drugCheck/findById.json?id="+id;
        return function(dispatch){
            return fetch(url, {
                mode: 'cors',
                credentials: 'include',
                method: 'GET',
                redirect: 'follow',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                if (response.status >= 200 && response.status < 300) {
                    return response
                }else {
                    let error = new Error(response.statusText);
                    error.response = response;
                    throw error
                }
            }).then(function (response) {
                return response.json();
            }).then(function(json){
                dispatch({
                    type: types.DRUG_CHECK_DETAIL_MODULE,
                    isShowDetail: isShowDetail,
                    record: json
                });
            }).catch(function (ex) {
                dispatch(showErrorMsg(ex.response));
                console.log('parsing failed', ex);
            });
        }
    }else{
        return function(dispatch){
            dispatch({
                type: types.DRUG_CHECK_DETAIL_MODULE,
                isShowDetail: isShowDetail
            });
        }
    }
}

/**
 * 编辑窗口显示与隐藏
 * @param id
 * @returns {Function}
 */
export function showEditForm(isShowEdit, id={}){
    if(isShowEdit==true){
        let url = iportal + "/drugCheck/findById.json?id="+id;
        return function(dispatch){
            return fetch(url, {
                mode: 'cors',
                credentials: 'include',
                method: 'GET',
                redirect: 'follow',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                if (response.status >= 200 && response.status < 300) {
                    return response
                }else {
                    let error = new Error(response.statusText);
                    error.response = response;
                    dispatch(showErrorMsg(error.response));
                    console.log('parsing failed', error);
                }
            }).then(function (response) {
                return response.json();
            }).then(function(json){
                dispatch({
                    type: types.DRUG_CHECK_EDIT_MODULE,
                    isShowEdit: isShowEdit,
                    data: json
                });
            })
        }
    }else{
        return function(dispatch){
            dispatch({
                type: types.DRUG_CHECK_EDIT_MODULE,
                isShowEdit: isShowEdit
            });
        }
    }
}

/**
 * 新增或更新
 * @param data
 * @param actions
 * @param params
 * @returns {Function}
 */
export function saveOrUpdate(data, actions, params){
    let url;
    let isAdd;
    if(data.id==undefined){//新增
        url = iportal + "/drugCheck/save.json";
        isAdd = true;
    }else{//更新
        url = iportal + "/drugCheck/update.json";
        isAdd = false;
    }

    return function(dispatch){
        dispatch({type: VALID_FORM_INIT});
        return fetch(url, {
            mode: 'cors',
            credentials: 'include',
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formatData(data))
        }).then(function(response){
            if (response.status >= 200 && response.status < 300) {
                return response
            }else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error
            }
        }).then(function(json){
            if(isAdd){
                dispatch({
                    type: types.DRUG_CHECK_ADD_MODULE,
                    isShowAdd: false
                });
            }else{
                dispatch({
                    type: types.DRUG_CHECK_EDIT_MODULE,
                    isShowEdit: false
                });
            }

            actions.drugCheckList(params, params.page, params.size);
        }).catch(function (ex) {
            dispatch(showErrorMsg(ex.response));
            console.log('parsing failed', ex);
        });
    }
}

/**
 * 列表
 * @param params
 * @param page
 * @param size
 * @returns {Function}
 */
export function drugCheckList(params, page, size) {
    return function (dispatch) {
        return fetch(iportal + '/drugCheck/query.json?checkDocumentNum=' + params.checkDocumentNum + '&checkTypeCode=' + params.checkTypeCode + '&fromPlanCheckTimeString='
            + params.fromPlanCheckTimeString + '&toPlanCheckTimeString=' + params.toPlanCheckTimeString + '&page=' + page + '&size=' + size , {
            mode: 'cors',
            credentials: 'include',
            method: 'get'
        }).then(function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response
            } else {
                var error = new Error(response.statusText);
                error.response = response;
                throw error
            }
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            dispatch({
                type: types.DRUG_CHECK_LIST,
                data: json
            });
        }).catch(function (ex) {
            dispatch(showErrorMsg(ex.response));
            console.log('parsing failed', ex);
        });
    }
}

/**
 * 搜索组件回调固定方法
 * @param params
 * @returns {Function}
 */
export function drugCheckSearch(params) {
    return function (dispatch) {
        dispatch(drugCheckSetSearchParams(params));
        dispatch(drugCheckList(params, 0, params.size));
    }
}

/**
 * 删除商品
 * @param goodsIds
 * @param goodsMap
 */
export function removeGoods(checkGoodsIdMap, goodsMap) {
    for (var [key, value] of checkGoodsIdMap) {
        goodsMap.delete(key);
    }

    let goods = [];
    let index = 0;
    for (var [key, value] of goodsMap) {
        goods[index] = value;
        index = index + 1;
    }

    return function (dispatch) {
        dispatch({
            type: types.DRUG_CHECK_ADD_MODULE,
            isShowAdd: true,
            goods:goods,
            goodsMap:goodsMap
        });

        dispatch({
            type: types.DRUG_CHECK_GOODS_SELECT,
            checkGoodsIdMap: new Map(),
            isCheckAll:false
        });
    }
}

/**
 * 商品选中
 * @param checkGoodsIds
 * @returns {Function}
 */
export function checkGoods(checkGoodsIds, checkGoodsIdMap, goods){
    checkGoodsIds.map((goodsId)=>{
        checkGoodsIdMap.set(goodsId, goodsId);
    });

    let isCheckAll = false;
    if(checkGoodsIdMap.size==goods.length){
        isCheckAll = true;
    }

    return function (dispatch) {
        dispatch({
            type: types.DRUG_CHECK_GOODS_SELECT,
            checkGoodsIdMap: checkGoodsIdMap,
            isCheckAll: isCheckAll
        })
    }
}

/**
 * 商品取消选中
 * @param uncheckGoodsIds
 * @param checkGoodsIdMap
 * @returns {Function}
 */
export function uncheckGoods(uncheckGoodsIds, checkGoodsIdMap){
    uncheckGoodsIds.map((goodsId)=>{
        checkGoodsIdMap.delete(goodsId);
    });

    return function (dispatch) {
        dispatch({
            type: types.DRUG_CHECK_GOODS_SELECT,
            checkGoodsIdMap: checkGoodsIdMap,
            isCheckAll: false
        })
    }
}

/**
 * 编辑校验
 * @param values
 * @param props
 */
export const validateForEdit = (values, props) => {
    const errors = {};
    errors.responset = {status: 200};
    let approveManId = values.approveManId;

    if(isEmpty(approveManId)){
        props.errorValidMessageFunction("请进行审核");
        errors.approveManId = "请进行审核";
        return errors;
    }

    let items = values.drugCheckItemUpdateVoList;
    errors.drugCheckItemUpdateVoList = [];
    for (const index in items){
        const item = items[index];
        let checkQuantity = parseInt(item.checkQuantity);
        if(isEmpty(checkQuantity)){
            props.errorValidMessageFunction("请选择输入检查数量");
            errors.drugCheckItemUpdateVoList[index] = {checkQuantity: "请选择输入检查数量"};
            return errors;
        }

        if(!REGEXP_SIGNLESS_INT.test(checkQuantity)){
            props.errorValidMessageFunction("检查数量格式错误");
            errors.drugCheckItemUpdateVoList[index] = {checkQuantity: "检查数量格式错误"};
            return errors;
        }

        let currentStock = parseInt(item.currentStock);
        if(checkQuantity>currentStock){
            props.errorValidMessageFunction("检查数量不能大于库存");
            errors.drugCheckItemUpdateVoList[index] = {checkQuantity: "检查数量不能大于库存"};
            return errors;
        }

        let checkPrj = item.checkPrj;
        if(isOutofLimit(checkPrj)){
            props.errorValidMessageFunction("检查项目不能大于128个字符");
            errors.drugCheckItemUpdateVoList[index] = {checkPrj: "检查项目不能大于128个字符"};
            return errors;
        }

        let notQualifiedQuantity = parseInt(item.notQualifiedQuantity);
        if(isEmpty(notQualifiedQuantity)){
            props.errorValidMessageFunction("请选择输入不合格数量");
            errors.drugCheckItemUpdateVoList[index] = {notQualifiedQuantity: "请选择输入不合格数量"};
            return errors;
        }

        if(!REGEXP_UNSIGNED_INT.test(notQualifiedQuantity)){
            props.errorValidMessageFunction("不合格数量格式错误");
            errors.drugCheckItemUpdateVoList[index] = {notQualifiedQuantity: "不合格数量格式错误"};
            return errors;
        }

        if(notQualifiedQuantity>checkQuantity){
            props.errorValidMessageFunction("不合格数量不能大于检查数量");
            errors.drugCheckItemUpdateVoList[index] = {notQualifiedQuantity: "不合格数量不能大于检查数量"};
            return errors;
        }

        let processOpinion = item.processOpinion;
        if(isOutofLimit(processOpinion, 128)){
            props.errorValidMessageFunction("处理意见不能大于128个字符");
            errors.drugCheckItemUpdateVoList[index] = {processOpinion: "处理意见不能大于128个字符"};
            return errors;
        }

        let conclusion = item.conclusion;
        if(isOutofLimit(conclusion, 128)){
            props.errorValidMessageFunction("结论不能大于128个字符");
            errors.drugCheckItemUpdateVoList[index] = {conclusion: "结论不能大于128个字符"};
            return errors;
        }

        let remark = item.remark;
        if(isOutofLimit(remark, 256)){
            props.errorValidMessageFunction("备注不能大于256个字符");
            errors.drugCheckItemUpdateVoList[index] = {remark: "备注不能大于256个字符"};
            return errors;
        }
    }

    props.errorValidMessageFunction("");
    return errors
};

function isEmpty(obj){
    if(obj==undefined || obj==null || obj.toString().trim()==''){
       return true;
    }else{
        return false;
    }
}

function isOutofLimit(obj, maxLength){
    if(obj!=undefined && obj!=null && obj.toString().length>maxLength){
        return true;
    }else{
        return false;
    }
}