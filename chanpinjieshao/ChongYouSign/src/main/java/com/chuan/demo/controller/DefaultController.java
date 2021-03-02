package com.chuan.demo.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @Author 张川
 * @博客 https://blog.csdn.net/weixin_43919632
 * @Date 2020-12-18-1:10
 */
@Configuration
public class DefaultController implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
      //
    }
}

