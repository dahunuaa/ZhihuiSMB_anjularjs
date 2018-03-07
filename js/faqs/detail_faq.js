/**
 * Created by Administrator on 2017/1/6 0006.
 */
var app =angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){
    var url=window.location.href;
    if(url.split('?').length==2){
        var back=url.split('?')[1];
        $scope._id = back;

    }
    init();
    var comment_data = new Array();

    function init(){
        if(localStorage.getItem("token") == undefined||localStorage.getItem("token")==null){
            window.localStorage.href = "../login.html"
        }else {
            $http.get(basePath+"api/v1.0/ptos/"+$scope._id+"?access_token="+localStorage.getItem("token"))
                .success(function(res){
                    if(res.response.success ==1){
                        $scope.data = res.response.data;
                        $scope.img1 = res.response.data.images[0];
                        $scope.img2 = res.response.data.images[1];
                        $scope.img3 = res.response.data.images[2];
                        comment_show();
                    }else {
                        dhx_alert(res.response.return_code)
                    }
                })
        }
    }

    function comment_show(){
        $http.get(basePath+"api/v1.0/comment?access_token="+localStorage.getItem('token')+"&comment_status=father&comment_type=ptos&text_id="+$scope._id)
            .success(function(res){
                if(res.response.success==1){
                    comment_data=res.response.data;
                    comment_list = document.getElementById("comment_gridbox")
                    angular.forEach(comment_data,function(data,index,array){
                        var li = document.createElement("dt")
                        li.setAttribute("to_user_id",array[index].user_id)
                        li.setAttribute("to_user_name",array[index].add_user_name)
                        li.setAttribute("father_comment_id",array[index]._id)
                        li.setAttribute("comment_id",array[index]._id)
                        li.setAttribute("_like_amounts",array[index].like_amounts)
                        li.setAttribute("_like_users",array[index].like_users)
                        li.setAttribute("comment_text",array[index].text)
                        li.setAttribute("comment_add_time",array[index].add_time)
                        li.innerHTML="<span id='com_name' style='font-size: 20px'>"+array[index].add_user_name+"</span>"+"&nbsp;&nbsp;&nbsp;"+"<span id='com_time'>"+array[index].add_time
                            +"</span>"+"&nbsp;&nbsp;&nbsp;"+"<button id='reply' ng-click='reply()' class='reply_btn' style='color: green;'>"+"reply" +"</button>"+"&nbsp;&nbsp;"+
                            "<img src='../icons/icons_material/zan.png' style='margin-left: 10px;width: 2%' id='like' class='like_btn'>"+"<span id='dianzan'>"+array[index].like_amounts+"</span>"
                            +"<br>"+"<span id='com_text 'style='font-size: 20px;'>"+array[index].text+"</span>"+"<p></p>"+"<hr style='width: 60%'/>";
                        comment_list.appendChild(li)

                        angular.forEach(array[index].childen_comment_ids,function(data,index,array){
                            var li = document.createElement("dt")
                            li.style.backgroundColor='#D3D3D3'
                            li.innerHTML="<span id='com_name' style='font-size: 20px'>"+array[index].add_user_name+"@"+array[index].to_user_name+"</span>"+"&nbsp;&nbsp;&nbsp;"+"<span id='com_time'>"+array[index].add_time.split('.')[0]
                                +"</span>"+"&nbsp;&nbsp;&nbsp;"+"<button id='reply' ng-click='reply()' style='color: green;'>"+"reply" +"</button>"+"<br>"+"<span id='com_text 'style='font-size: 20px;'>"+array[index].text+"</span>"+"<p></p>"+"<hr style='width: 60%'/>";
                            comment_list.appendChild(li)
                        })
                    })
                }else{
                    dhx_alert(res.response.return_code)
                }
            })
    }
//提交父评论
    $scope.add_comment = function(){
        comment_content = document.getElementById("com_text").value
        if(comment_content==""){
            dhx_alert("please enter comment")
        }else{
            $http({
                method:'post',
                url:basePath+"api/v1.0/comment",
                params:{
                    "access_token":localStorage.getItem("token"),
                    "comment_type":"ptos",
                    "text_id":$scope._id,
                    "user_id":localStorage.getItem("job_no"),
                    "text":comment_content,
                    "comment_status":"father",
                }
            }).success(function(res){
                if(res.response.success=="1"){
                    dhx_alert("comment succeed",function(){
                        window.location.reload()
                    })
                }
            })
        }
    }

    // $scope.reply = function(){
    //     dhx.alert("111")
    // }

// 增加回复
    $("#comment_gridbox").on('click','.reply_btn',function (){
        var to_user_id_f = this.parentNode.getAttribute("to_user_id")
        var to_user_name_f = this.parentNode.getAttribute("to_user_name")
        var father_comment_id_f = this.parentNode.getAttribute("father_comment_id")
        var messageStr = "ZhihuiSMB";
        var defaultStr = "";
      //如果什么都不写 并 点击确定的话，返回一个空字符串
        var content = window.prompt(messageStr, defaultStr);
        if(content==""||content==null){

        }else{
            $http({
                method:'post',
                url:basePath+"api/v1.0/comment",
                params:{
                    "access_token":localStorage.getItem("token"),
                    "comment_type":"ptos",
                    "text_id":$scope._id,
                    "user_id":localStorage.getItem("job_no"),
                    "text":content,
                    "to_user_id":to_user_id_f,
                    "to_user_name":to_user_name_f,
                    "father_comment_id":father_comment_id_f,
                    "comment_status":"kid",
                }
            }).success(function(res){
                if(res.response.success=="1"){
                    dhx_alert("comment succeed",function(){
                        window.location.reload()
                    })
                }
            })
        }
        // document.write(content);
    })

    //点赞
    $("#comment_gridbox").on('click','.like_btn',function(e){
        var like_comment_id = this.parentNode.getAttribute("comment_id")
        var user_name = this.parentNode.getAttribute("to_user_name")
        var comment_text = this.parentNode.getAttribute("comment_text")
        var like_users = this.parentNode.getAttribute("_like_users")
        var like_amounts = this.parentNode.getAttribute("_like_amounts")
        var comment_add_time = this.parentNode.getAttribute("comment_add_time")
        var amounts_like =parseInt(like_amounts)+1
        if(like_users.indexOf(localStorage.getItem("job_no"))>=0){
            dhx_alert("Allow only one agreement")
        }else{
            var obj=this;//保存当前this对象
            $http({
                method:'put',
                url:basePath+"api/v1.0/comment/like_amount",
                params:{
                    "access_token":localStorage.getItem("token"),
                    "user_id":localStorage.getItem("job_no"),
                    "comment_id":like_comment_id,
                    "type":"1",
                }
            }).success(function(res){
                if(res.meta.code=="200"){
                    obj.parentNode.innerHTML="<span id='com_name' style='font-size: 20px'>"+user_name+"</span>"+"&nbsp;&nbsp;&nbsp;"+"<span id='com_time'>"+comment_add_time
                        +"</span>"+"&nbsp;&nbsp;&nbsp;"+"<button id='reply' ng-click='reply()' class='reply_btn' style='color: green;'>"+"reply" +"</button>"+"&nbsp;&nbsp;"+
                        "<img src='../icons/icons_material/zan.png' style='margin-left: 10px;width: 2%' id='like' class='like_btn'>"+"<span id='dianzan'>"+amounts_like+"</span>"
                        +"<br>"+"<span id='com_text 'style='font-size: 20px;'>"+comment_text+"</span>"+"<p></p>"+"<hr style='width: 60%'/>";
                }else{
                    if(data.response.exception.indexOf("Allow only one agreement")){
                        mui.toast("Allow only one agreement")
                    }else{
                        dhx_alert("server error")
                    }
                }
            })
        }

    });


})