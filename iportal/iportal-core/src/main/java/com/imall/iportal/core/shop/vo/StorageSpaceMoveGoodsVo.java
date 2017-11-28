package com.imall.iportal.core.shop.vo;

/**
 * Created by wsh on 2017/7/25.
 */
public class StorageSpaceMoveGoodsVo {
    /**
     * 原货位名称
     */
    private String sourceStorageSpaceNm;
    /**
     * 目标货位名称
     */
    private String targetStorageSpaceNm;
    /**
     * 移动数量
     */
    private Long quantity;
    /**
     * 库存
     */
    private Long currentStock;
    /**
     * 商品编码
     */
    private String goodsCode;
    /**
     * 商品名称
     */
    private String goodsNm;
    /**
     * 商品通用名称
     */
    private String goodsCommonNm;
    /**
     * 规格
     */
    private String spec;
    /**
     * 单位
     */
    private String unit;
    /**
     * 剂型
     */
    private String dosageForm;
    /**
     * 生产厂商
     */
    private String produceManufacturer;
    /**
     * 批准文号
     */
    private String approvalNumber;
    /**
     * 批次
     */
    private String batch;
    /**
     * 生产日期
     */
    private String produceDateString;
    /**
     * 有效期
     */
    private String validDateString;

    public String getSourceStorageSpaceNm() {
        return sourceStorageSpaceNm;
    }

    public void setSourceStorageSpaceNm(String sourceStorageSpaceNm) {
        this.sourceStorageSpaceNm = sourceStorageSpaceNm;
    }

    public String getTargetStorageSpaceNm() {
        return targetStorageSpaceNm;
    }

    public void setTargetStorageSpaceNm(String targetStorageSpaceNm) {
        this.targetStorageSpaceNm = targetStorageSpaceNm;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Long getCurrentStock() {
        return currentStock;
    }

    public void setCurrentStock(Long currentStock) {
        this.currentStock = currentStock;
    }

    public String getGoodsCode() {
        return goodsCode;
    }

    public void setGoodsCode(String goodsCode) {
        this.goodsCode = goodsCode;
    }

    public String getGoodsNm() {
        return goodsNm;
    }

    public void setGoodsNm(String goodsNm) {
        this.goodsNm = goodsNm;
    }

    public String getGoodsCommonNm() {
        return goodsCommonNm;
    }

    public void setGoodsCommonNm(String goodsCommonNm) {
        this.goodsCommonNm = goodsCommonNm;
    }

    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getDosageForm() {
        return dosageForm;
    }

    public void setDosageForm(String dosageForm) {
        this.dosageForm = dosageForm;
    }

    public String getProduceManufacturer() {
        return produceManufacturer;
    }

    public void setProduceManufacturer(String produceManufacturer) {
        this.produceManufacturer = produceManufacturer;
    }

    public String getApprovalNumber() {
        return approvalNumber;
    }

    public void setApprovalNumber(String approvalNumber) {
        this.approvalNumber = approvalNumber;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public String getProduceDateString() {
        return produceDateString;
    }

    public void setProduceDateString(String produceDateString) {
        this.produceDateString = produceDateString;
    }

    public String getValidDateString() {
        return validDateString;
    }

    public void setValidDateString(String validDateString) {
        this.validDateString = validDateString;
    }
}
