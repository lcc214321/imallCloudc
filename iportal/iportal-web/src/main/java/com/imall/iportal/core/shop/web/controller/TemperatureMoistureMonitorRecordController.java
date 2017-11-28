package com.imall.iportal.core.shop.web.controller;

import com.imall.commons.base.web.BaseRestSpringController;
import com.imall.iportal.core.main.commons.ServiceManager;
import com.imall.iportal.core.main.vo.CurrUserVo;
import com.imall.iportal.core.shop.vo.TemperatureMoistureMonitorRecordSaveVo;
import com.imall.iportal.core.shop.vo.TemperatureMoistureMonitorRecordSearchParam;
import com.imall.iportal.shiro.bind.annotation.CurrUser;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/temperatureMoistureMonitorRecord")
public class TemperatureMoistureMonitorRecordController extends BaseRestSpringController {

	@RequestMapping(value = "/save",method = RequestMethod.POST)
	@ResponseBody
	public Object save(@RequestBody TemperatureMoistureMonitorRecordSaveVo temperatureMoistureMonitorRecordSaveVo, @CurrUser CurrUserVo currUserVo){
		temperatureMoistureMonitorRecordSaveVo.setShopId(currUserVo.getShopId());
		return ServiceManager.temperatureMoistureMonitorRecordService.save(temperatureMoistureMonitorRecordSaveVo);
	}

	@RequestMapping(value = "/query",method = RequestMethod.GET)
	@ResponseBody
	public Object query(ModelMap model, @PageableDefault(page = 0, size = 10) Pageable pageable, TemperatureMoistureMonitorRecordSearchParam temperatureMoistureMonitorRecordSearchParam, @CurrUser CurrUserVo currUserVo) {
		temperatureMoistureMonitorRecordSearchParam.setShopId(currUserVo.getShopId());
		return ServiceManager.temperatureMoistureMonitorRecordService.query(pageable, temperatureMoistureMonitorRecordSearchParam);
	}

}

