package com.imall.iportal.core.main.repository.impl;

import com.imall.commons.base.util.CommonUtil;
import com.imall.iportal.core.main.entity.SysExceptionCode;
import com.imall.iportal.core.main.repository.SysExceptionCodeRepositoryCustom;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by ygw on 2015/12/31.
 */
public class SysExceptionCodeRepositoryImpl implements SysExceptionCodeRepositoryCustom {

    @Resource
    private EntityManager entityManager;

    @Override
    public Page<SysExceptionCode> query(Pageable pageable, String code, String exceptionMsg) {
        StringBuilder sql = new StringBuilder();
//        sql.append(" from t_pt_sys_exception_code a where 1=1 ");
        Map<String, Object> paramMap = new HashMap<String, Object>();
        if (StringUtils.isNotBlank(code)) {
            sql.append(" and a.CODE LIKE :code ");
            paramMap.put(SysExceptionCode.CODE, "%" + code + "%");
        }
        if (StringUtils.isNotBlank(exceptionMsg)) {
            sql.append(" and a.EXCEPTION_MSG LIKE :exceptionMsg");
            paramMap.put(SysExceptionCode.EXCEPTION_MSG, "%" + exceptionMsg + "%");
        }

        Query query = entityManager.createNativeQuery("SELECT * FROM T_PT_SYS_EXCEPTION_CODE a where 1=1" + sql, SysExceptionCode.class);
        CommonUtil.formatQueryParameter(query, paramMap);
        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());
        List<SysExceptionCode> resultList = query.getResultList();

        Query totalQuery = entityManager.createNativeQuery("SELECT COUNT(*) FROM T_PT_SYS_EXCEPTION_CODE a WHERE 1=1" + sql);
        CommonUtil.formatQueryParameter(totalQuery, paramMap);
        int total = ((BigInteger)totalQuery.getSingleResult()).intValue();
        return new PageImpl<SysExceptionCode>(resultList, pageable, total);
    }
}
