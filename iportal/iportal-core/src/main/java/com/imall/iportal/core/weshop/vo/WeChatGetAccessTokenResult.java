package com.imall.iportal.core.weshop.vo;

/**
 * Created by lxh on 2017/8/9.
 */
public class WeChatGetAccessTokenResult extends WeChatBaseResult{
    private Integer expires_in;
    private String access_token;

    public Integer getExpires_in() {
        return expires_in;
    }

    public void setExpires_in(Integer expires_in) {
        this.expires_in = expires_in;
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }
}
