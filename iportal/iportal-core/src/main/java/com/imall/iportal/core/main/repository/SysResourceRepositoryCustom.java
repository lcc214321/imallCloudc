package com.imall.iportal.core.main.repository;

import com.imall.iportal.core.main.vo.SysResourceVo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Created by ygw on 2015/12/31.
 */
public interface SysResourceRepositoryCustom {

    Page<SysResourceVo> query(Pageable pageable, Long parentId , String resourceName, String permissionCode, String routerKey, String isAvailable);
}
