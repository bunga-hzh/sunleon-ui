1. 岗位发布，预览岗位
2. 根据条件导出
   1. 岗位发布，ok
   2. 简历筛选，ok
   3. 面试预约，ok
   4. 面试安排，ok
   5. 面试评分，ok
   
3. 简历预览效果 ok
4. 打印登记表 ok
5. 人员招聘情况汇总表 ok
6. 终面信息汇总表 ok
7. 终面人员评分结果表 ing
8. 岗位聘任汇总表  没有模板

---
http://192.168.187.121:2280/act/sysPostRelease/page
### 1.岗位发布，条件导出 exportId=670880742025097216
api请求url
##### http://127.0.0.1:5005/reports/zp_gw_publish/page?yearTime=${yearTime}&postNameId=${postNameId}

1.1 预览，包含上一页，下一页
#####http://192.168.187.121:9999/act/jmreport/view/670880742025097216?token=null&yearTime=2022&postNameId=

1.2 导出excel pdf
#####post  http://192.168.187.121:9999/act/jmreport/exportAllExcelStream   || exportAllExcel
#####post http://192.168.187.121:9999/act/jmreport/exportPdfStream  || exportPdf
data:
```json
{
    "excelConfigId":"670880742025097216",
    "queryParam":{
        "token":null,
        "yearTime":"2022",
        "postNameId":"",
        "pageNo":"1",
        "pageSize":10,
        "currentPageNo":"1",
        "currentPageSize":10
    }
}
```
1.3 打印
http://report.jeecg.com/2397211
---
###2.简历筛选，条件导出 exportId=670976870393475072
api请求url
##### http://127.0.0.1:5005/reports/zp_jl_filter/page?yearTime=${yearTime}&candidateName=${candidateName}&education=${education}&isShHousehold=${isShHousehold}&residencePermitSh=${residencePermitSh}&interviewNumber=${interviewNumber}&postNameIds=${postNameIds}

---
2.1 预览 如果需要postNameIds=1,2,5 数组形式
#####http://192.168.187.121:9999/act/jmreport/view/670976870393475072?token=null&yearTime=2022&candidateName=&education=&isShHousehold=&residencePermitSh=&interviewNumber=&postNameIds=

---
2.2 导出excel pdf

#####post  http://192.168.187.121:9999/act/jmreport/exportAllExcelStream   || exportAllExcel
#####post http://192.168.187.121:9999/act/jmreport/exportPdfStream  || exportPdf
data:
```json
{
    "excelConfigId":"670976870393475072",
    "queryParam":{
        "token":null,
        "yearTime":"2022",
        "candidateName":"",
        "education":"",
        "isShHousehold":"",
        "residencePermitSh":"",
        "interviewNumber":"",
        "postNameIds":"1,2,10",
        "pageNo":"1",
        "pageSize":1,
        "currentPageNo":"1",
        "currentPageSize":1
    }
}
```
###3.简历预约 条件导出 exportId=670976870393475072
api请求url
 ##### http://127.0.0.1:5005/reports/zp_jl_filter/page?yearTime=${yearTime}&candidateName=${candidateName}&education=${education}&isShHousehold=${isShHousehold}&residencePermitSh=${residencePermitSh}&interviewNumber=${interviewNumber}&postNameIds=${postNameIds}

##预览类：
###1. 简历预览效果  exportId=671004993319235584
1.1 预览
#####http://192.168.187.121:9999/act/jmreport/view/671004993319235584?token=null&user_id=1

---
1.2 导出pdf 需要urlencode
#####post http://192.168.187.121:9999/act/jmreport/exportPdfStream  || exportPdf
data:
```json
{
    "excelConfigId":"671004993319235584",
    "queryParam":{
        "token":null,
        "user_id":1,
        "pageNo":"1",
        "pageSize":10,
        "currentPageNo":"1",
        "currentPageSize":10
    }
}
```

---
###2. 应聘人员情况登记表  exportId=671355610982150144
2.1 预览
#####http://192.168.187.121:9999/act/jmreport/view/671355610982150144?token=null&user_id=1

2.2 导出pdf 需要urlencode
#####post http://192.168.187.121:9999/act/jmreport/exportPdfStream  || exportPdf
data:
```json
{
    "excelConfigId":"671355610982150144",
    "queryParam":{
        "token":null,
        "user_id":1,
        "pageNo":"1",
        "pageSize":10,
        "currentPageNo":"1",
        "currentPageSize":10
    }
}
```

---

###3. 终面信息汇总表  exportId=675878370374877184
api请求url
##### http://127.0.0.1:5005/reports/zp_end_face_form?yearTime=${yearTime}

3.1 预览
##### http://192.168.187.121:9999/act/jmreport/view/675878370374877184?yearTime=2022

3.2 导出pdf 需要urlencode
#####post http://192.168.187.121:9999/act/jmreport/exportPdfStream  || exportPdf
data:
```json
{
    "excelConfigId":"675878370374877184",
    "queryParam":{
        "token":null,
        "yearTime":"2022",
        "pageNo":"1",
        "pageSize":10,
        "currentPageNo":"1",
        "currentPageSize":10
    }
}
```
---

###4. 终面人员评分结果表  exportId=675878370374877184
api请求url
##### http://127.0.0.1:5005/reports/zp_score_form?yearTime=${yearTime}

4.1 预览
##### http://192.168.187.121:9999/act/jmreport/view/675878370374877184?yearTime=2022

4.2 导出pdf 需要urlencode
#####post http://192.168.187.121:9999/act/jmreport/exportPdfStream  || exportPdf
data:
```json
{
    "excelConfigId":"675878370374877184",
    "queryParam":{
        "token":null,
        "yearTime":"2022",
        "pageNo":"1",
        "pageSize":10,
        "currentPageNo":"1",
        "currentPageSize":10
    }
}
```

###5. 人员招聘情况汇总表 exportId=676423845679235072
api请求url
##### http://127.0.0.1:5005/reports/zp_stat?yearTime=${yearTime}

5.1 预览
##### http://192.168.187.121:9999/act/jmreport/view/676423845679235072?yearTime=2022

5.2 导出pdf 需要urlencode
#####  post http://192.168.187.121:9999/act/jmreport/exportPdfStream || exportPdf
data:
```json
{
   "excelConfigId":"676423845679235072", 
   "queryParam":{
      "pageNo":"1",
       "pageSize":10,
       "currentPageNo":"1",
        "currentPageSize":10,
        "yearTime":"2022"
   }
}
```


###6. 面试预约 exportId=676591499043233792
api请求url
##### http://127.0.0.1:5005/reports/appointment/page?yearTime=${yearTime}&candidateName=${candidateName}&interviewTime=${interviewTime}

6.1 预览
##### http://192.168.187.121:9999/act/jmreport/view/676591499043233792?token=null&yearTime=2022&candidateName=&interviewTime=

6.2 导出pdf 需要urlencode
#####  post http://192.168.187.121:9999/act/jmreport/exportPdfStream || exportPdf
data:
```json
{
   "excelConfigId": "676591499043233792",
   "queryParam": {
      "token": "null",
      "yearTime": "2022",
      "candidateName": "",
      "interviewTime": "",
      "pageNo": "1",
      "pageSize": 2,
      "currentPageNo": "1",
      "currentPageSize": 2
   }
}
```


###7. 面试安排 exportId=676648932415463424 
api请求url
##### http://127.0.0.1:5005/reports/arrange/page?yearTime=${yearTime}&candidateName=${candidateName}&interviewTime=${interviewTime}

7.1 预览
##### http://192.168.187.121:9999/act/jmreport/view/676648932415463424?token=null&yearTime=2022&candidateName=&interviewTime=

7.2 导出pdf 需要urlencode
#####  post http://192.168.187.121:9999/act/jmreport/exportPdfStream || exportPdf
data:
```json
{
   "excelConfigId": "676648932415463424",
   "queryParam": {
      "token": "null",
      "yearTime": "2022",
      "candidateName": "",
      "interviewTime": "",
      "pageNo": "1",
      "pageSize": 2,
      "currentPageNo": "1",
      "currentPageSize": 2
   }
}
```


###8. 面试评分 exportId=676668167468441600
api请求url
##### http://127.0.0.1:5005/reports/fraction/page?yearTime=${yearTime}&candidateName=${candidateName}&interviewTime=${interviewTime}

8.1 预览
##### http://192.168.187.121:9999/act/jmreport/view/676668167468441600?token=null&yearTime=2022&candidateName=&interviewTime=

8.2 导出pdf 需要urlencode
#####  post http://192.168.187.121:9999/act/jmreport/exportPdfStream || exportPdf
data:
```json
{
   "excelConfigId": "676668167468441600",
   "queryParam": {
      "token": "null",
      "yearTime": "2022",
      "candidateName": "",
      "interviewTime": "",
      "pageNo": "1",
      "pageSize": 2,
      "currentPageNo": "1",
      "currentPageSize": 2
   }
}
```


同步sysDict 到jmdict
JimuReportDict