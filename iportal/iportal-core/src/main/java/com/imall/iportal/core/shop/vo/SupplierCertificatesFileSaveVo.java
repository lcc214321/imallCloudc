package com.imall.iportal.core.shop.vo;

import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;

/**
 * Created by ou on 2017/7/8.
 */
public class SupplierCertificatesFileSaveVo {


    /**
     * suppplierId
     */
    @NotNull
    private Long supplierId;
    /**
     * 分类
     */
    @NotBlank
    private String certificatesType;
    /**
     * 编号
     */
    private String certificatesNum;
    /**
     * 有效期
     */

    private String certificatesValidityString;

    public Long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
    }

    public String getCertificatesType() {
        return certificatesType;
    }

    public void setCertificatesType(String certificatesType) {
        this.certificatesType = certificatesType;
    }

    public String getCertificatesNum() {
        return certificatesNum;
    }

    public void setCertificatesNum(String certificatesNum) {
        this.certificatesNum = certificatesNum;
    }

    public String getCertificatesValidityString() {
        return certificatesValidityString;
    }

    public void setCertificatesValidityString(String certificatesValidityString) {
        this.certificatesValidityString = certificatesValidityString;
    }
}
