package com.chuan.demo.controller;

import com.chuan.demo.dao.DataApis;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * @Author 张川
 * @博客 https://blog.csdn.net/weixin_43919632
 * @Date 2020-12-11-0:00
 */
@RestController
public class Apis {
    private static DataApis dataApis=new DataApis () ; //持久层数据库接口层


    /*
    小程序主页需要的数据
     */


   @RequestMapping(value = "/page-data")
    public List pageData(HttpServletResponse response) throws Exception {
        List imageLists = dataApis.getImage ();//获得图片数据
        for (Object imageList : imageLists) {
            System.out.println (imageList);
        }

        response.setHeader ("Access-Control-Allow-Origin", "*");//解决跨段请求
        return imageLists;

    }


}
