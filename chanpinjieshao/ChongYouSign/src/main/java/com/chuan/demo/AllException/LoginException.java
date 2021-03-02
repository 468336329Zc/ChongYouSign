package com.chuan.demo.AllException;

/**
 * @Author 张川
 * @博客 https://blog.csdn.net/weixin_43919632
 * @Date 2020-12-11-0:46
 */
public class LoginException extends Exception {

    public LoginException() {
        System.out.println ("登录异常");
    }


    public LoginException(String message) {
        System.out.println (message + "登录异常");
    }





   
}

