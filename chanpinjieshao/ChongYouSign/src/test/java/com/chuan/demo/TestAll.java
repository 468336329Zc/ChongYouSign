package com.chuan.demo;

import com.chuan.demo.Util.JDBCUtil;
import org.junit.Test;

import java.sql.Connection;


/**
 * @Author 张川
 * @博客 https://blog.csdn.net/weixin_43919632
 * @Date 2020-12-13-14:54
 */
public class TestAll {

    @Test
    public void JDBCTest() throws Exception {
        Connection cnn= JDBCUtil.getConnection ();
        System.out.println (cnn);

    }










}

