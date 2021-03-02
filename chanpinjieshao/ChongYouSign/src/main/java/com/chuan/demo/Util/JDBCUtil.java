package com.chuan.demo.Util;

/**
 * @Author zhangchuan
 * @Date 2020-05-27
 */


import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

/**
 * @Author zhangchuan
 * @Date 2020-05-19
 */

@Component
public class JDBCUtil  {



    private static String url="jdbc:mysql://localhost:3306/chongyousign" ;
    private static String user="root";
    private static String pwd="207141437" ;
    private static String driverName="com.mysql.jdbc.Driver";

    static {
        //1,加载驱动
        try {
            Class.forName ("com.mysql.jdbc.Driver");

        } catch (ClassNotFoundException e) {
            e.printStackTrace ();
        } catch (Exception e) {
            e.printStackTrace ();
        }

    }


    public static void getParam() throws Exception {
        Properties properties = new Properties ();
        InputStream inputStream = new FileInputStream (new File (".//src\\main\\resources\\application.properties"));
        properties.load (inputStream);
        url=properties.getProperty ("url");
        user=properties.getProperty ("user");
        pwd=properties.getProperty ("pwd");
        driverName=properties.getProperty ("driverName");
        System.out.println (url+" "+user+" "+pwd+" "+driverName);
    }
    //获取连接对象
    public static Connection getConnection() throws Exception{
        Connection cnn = null;

        try {
            cnn = DriverManager.getConnection (JDBCUtil.url, JDBCUtil.user, JDBCUtil.pwd);
        } catch (Exception e) {
            e.printStackTrace ();
        }
        //System.out.println ("数据库连接成功");
        return cnn;
    }


    /***
     * 释放资源
     * 1.结果资源  2.Statement通道资源  3.Connection  java与mysql数据库之间得连接资源
     */
    public static void close(ResultSet res, Statement st, Connection cnn) {
        if (res != null) {
            try {
                res.close ();
            } catch (SQLException e) {
                e.printStackTrace ();
            } finally {
                if (st != null)
                    try {
                        st.close ();
                    } catch (SQLException e) {
                        e.printStackTrace ();
                    }
                if (cnn != null) {
                    try {
                        cnn.close ();
                    } catch (SQLException e) {
                        e.printStackTrace ();
                    }
                }
            }
        }
    }


}



