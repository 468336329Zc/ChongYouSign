package com.chuan.demo.dao;

import com.chuan.demo.Util.JDBCUtil;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * @Author 张川
 * @博客 https://blog.csdn.net/weixin_43919632
 * @Date 2020-12-17-22:51
 */
@Repository
public class DataApis {
    private static Connection cnn=null;
    private PreparedStatement pst=null;



    //获得ChongYouSign的图片数据信息
    public ArrayList<Map> getImage() throws  Exception{

        ArrayList<Map> lists = new ArrayList<> ();
        HashMap<String, String> map=null;
        //1.获得链接
        Connection cnn= JDBCUtil.getConnection ();
        System.out.println ("获得链接对象++++++++++="+cnn);
        //2.建立statment管道
        String sql="select image,name from imagedata ";
        pst = cnn.prepareStatement (sql);
        //3.执行sql
        ResultSet rs = pst.executeQuery (sql);
        System.out.println (String.format ("执行SQL：%s", sql));
        while(rs.next ()){
            map = new HashMap<> ();
            map.put ("image", rs.getString ("image"));
            map.put ("name",rs.getString ("name"));
            lists.add (map);
        }
        System.out.println ("图片数据有:"+"+++++++++++++++++++++++++"+lists);
        return lists;
    }

}
