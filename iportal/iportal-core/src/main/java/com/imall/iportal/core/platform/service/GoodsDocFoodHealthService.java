package com.imall.iportal.core.platform.service;


import com.imall.iportal.core.platform.entity.GoodsDocFoodHealth;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

/**
 * (服务层类)
 * @author by imall core generator
 * @version 1.0.0
 */
@Validated
public interface GoodsDocFoodHealthService{

    GoodsDocFoodHealth save(GoodsDocFoodHealth goodsDocFoodHealth);

    /**
     * 通过商品档案ID查找
     * @param id
     * @return
     */
    GoodsDocFoodHealth findByGoodsDocId(@NotNull Long id);

    void delete(Long id);
}
