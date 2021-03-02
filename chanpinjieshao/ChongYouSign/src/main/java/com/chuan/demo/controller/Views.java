package com.chuan.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * @Author 张川
 * @博客 https://blog.csdn.net/weixin_43919632
 * @Date 2020-12-18-1:18
 */
@RestController
public class Views {

    @RequestMapping(path = "/",headers= "index.html")
    public ModelAndView index(){
        ModelAndView mv = new ModelAndView ();
        mv.setViewName ("index.html");
        return  mv;
    }

}
