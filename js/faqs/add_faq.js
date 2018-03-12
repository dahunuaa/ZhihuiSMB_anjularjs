/**
 * Created by Administrator on 2017/1/2.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){

    $scope.ptos_type = {
        type011 : {value: "machine design",text: "machine design"},
        type012 : {value: "machine assembly", text: "machine assembly"},
        type013 : {value: "projects", text: "projects"},
        type021 : {value: "others", text: "others"},
    };


    $scope.ptos = {};

    var img1='';
    var img2='';
    var img3='';

    $scope.m1='';
    $scope.m2='';
    $scope.m3='';
    $scope.images=[$scope.m1,$scope.m2,$scope.m3]

    //上传图片
    $(".uploaddiv").click(function(){
        selectimgindex = $(".uploaddiv").index(this);
        $(".uploadimg")[selectimgindex].click();
    });

    $(".uploadimg").change(function(){
        var myfile = this.files[0];
        $(".uploaddiv").each(function(index){
            if(index==selectimgindex){
                $(this).find('img').attr("src",getURL(myfile));
                return false;
            }
        });

        if( myfile.size > 100*1024*1024 ){  //用size属性判断文件大小不能超过100M
            dhx_alert( "file too large！" )
        }else {
            var reader = new FileReader();
            reader.readAsDataURL(myfile);
            reader.onload = function (e) {
                var res = this.result;

                res = res.split(',')[1];
                if (selectimgindex == 0) {
                    img1 = res;
                    $scope.m1 =img1;
                    $scope.images = [$scope.m1,$scope.m2,$scope.m3];
                } else if (selectimgindex == 1) {
                    img2 = res;
                    $scope.m2 =img2;
                    $scope.images = [$scope.m1,$scope.m2,$scope.m3];
                } else if(selectimgindex == 2){
                    img3 = res;
                    $scope.m3 =img3;
                    $scope.images = [$scope.m1,$scope.m2,$scope.m3];
                }
            }
        }
    });

    //get img url
    function getURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    }


    $scope.submit = function(){
        if ($scope.ptos.title==""||$scope.ptos.title==undefined||$scope.ptos.title==null){
            dhx_alert("enter title！")
        }else if($scope.ptos.type.text==""||$scope.ptos.type.text==undefined||$scope.ptos.type.text==null){
            dhx_alert("select category！")
        }else if($scope.ptos.text==""||$scope.ptos.text==undefined||$scope.ptos.text==null){
            dhx_alert("enter content！")
        }else{

            $.ajax({
                type: "post",
                url: basePath+"api/v1.0/ptos",
                data:{
                    "access_token":localStorage.getItem("token"),
                    "title":$scope.ptos.title,
                    "category":$scope.ptos.type.text,
                    "context":$scope.ptos.text,
                    "to_name":"all",
                    "to_no":"all",
                    "result":"unfinished",
                    "project_no":$scope.ptos.project,
                    "images_list":JSON.stringify($scope.images)
                },
                async: false,
                dataType:"json",//如果返回的是str，那么这个地方必须用text，用json报错
                success: function(data) {
                    if (data.response.success=="1")
                    {
                        dhx_alert("FAQ succeed!",function(){
                            window.location.reload()
                        })
                    }else{
                        dhx_alert(res.response.return_code)
                    }
                }
            });

            // $http({
            //     method:'post',
            //     url:basePath+"api/v1.0/ptos",
            //     params:{
            //         "access_token":localStorage.getItem("token"),
            //         "title":$scope.ptos.title,
            //         "category":$scope.ptos.type.text,
            //         "context":$scope.ptos.text,
            //         "to_name":"all",
            //         "to_no":"all",
            //         "result":"unfinished",
            //         "project_no":$scope.ptos.project,
            //         "images_list":JSON.stringify($scope.images)
            //     }
            // }).success(function(res){
            //     if(res.response.success==1){
            //         dhx_alert("FAQ succeed!",function(){
            //             window.location.reload()
            //         })
            //     }else{
            //         dhx_alert(res.response.return_code)
            //     }
            // })
        }
    }
    $scope.back=function(){
        window.location.href="faq_list.html"
    }
});
