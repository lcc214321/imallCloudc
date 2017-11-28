
package com.imall.iportal.core.shop.repository;

import com.imall.iportal.core.shop.entity.*;
import com.imall.commons.base.dao.IBaseRepository;
import com.imall.iportal.core.shop.vo.ReturnedPurchaseOrderVo;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;

/**
 * (JPA持久化层)
 * @author by imall core generator
 * @version 1.0.0
 */
public interface ReturnedPurchaseOrderRepository extends  IBaseRepository<ReturnedPurchaseOrder, Long>,ReturnedPurchaseOrderRepositoryCustom {

    ReturnedPurchaseOrder findByIdAndShopId(Long id, Long shopId);

    @Query("select count(*) from ReturnedPurchaseOrder r where r.createDate >= ?1 and r.createDate <= ?2 and r.shopId=?3")
    Long countByCreateDate(Date start, Date end, Long shopId);
}

