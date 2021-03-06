package com.imall.iportal.core.main.repository.impl;

import com.imall.commons.base.global.Global;
import com.imall.commons.base.util.CommonUtil;
import com.imall.iportal.core.main.entity.SysFileLib;
import com.imall.iportal.core.main.repository.SysFileLibRepositoryCustom;
import com.imall.iportal.core.main.vo.SysFileLibSearchParamVo;
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
 * Created by ZJC on 2016/1/4.
 */
public class SysFileLibRepositoryImpl implements SysFileLibRepositoryCustom {

    @Resource
    private EntityManager entityManager;

    @Override
    public Page<SysFileLib> query(Pageable pageable, SysFileLibSearchParamVo paramVo, Long orgId) {

        StringBuilder sql = new StringBuilder();
        Map<String, Object> paramMap = new HashMap<String, Object>();
        sql.append(" and a.ORG_ID =:orgId");
        paramMap.put(SysFileLib.ORG_ID, orgId);

        if(paramVo.getFileCategoryId()!= Global.TREE_DEFAULT_ID){
            sql.append(" and a.FILE_CATEGORY_ID =:fileCategoryId");
            paramMap.put(SysFileLib.FILE_CATEGORY_ID, paramVo.getFileCategoryId());
        }

        if (StringUtils.isNotBlank(paramVo.getFileTypeCode())) {
            sql.append(" and a.FILE_TYPE_CODE =:fileTypeCode");
            paramMap.put(SysFileLib.FILE_TYPE_CODE, paramVo.getFileTypeCode());
        }
        if (StringUtils.isNotBlank(paramVo.getSearchContent())) {
            sql.append(" and a.FILE_NM LIKE :fileNm");
            paramMap.put(SysFileLib.FILE_NM, "%"+paramVo.getSearchContent()+"%");
        }
        Query query = entityManager.createNativeQuery("SELECT * FROM T_PT_SYS_FILE_LIB a where 1=1" + sql + " ORDER BY A.ID DESC", SysFileLib.class);
        CommonUtil.formatQueryParameter(query, paramMap);
        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());
        List<SysFileLib> list = query.getResultList();

        Query totalQuery = entityManager.createNativeQuery("SELECT COUNT(*) FROM T_PT_SYS_FILE_LIB a WHERE 1=1" + sql);
        CommonUtil.formatQueryParameter(totalQuery, paramMap);
        int total = ((BigInteger)totalQuery.getSingleResult()).intValue();
        return new PageImpl<SysFileLib>(list, pageable, total);
    }
}
