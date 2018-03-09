/**
 * Created by Administrator on 2017/1/2.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){
    $scope.user_group={
        area01:{value:"ZSA1",text:"ZSA1",selected:1},
        area02:{value:"ZSA2",text:"ZSA2"},
        area03:{value:"ZSA3",text:"ZSA3"},
        area04:{value:"ZSA4",text:"ZSA4"},
        area05:{value:"others",text:"others"}
    };

    $scope.user = {};
    $scope.to_back = function(){
        window.location.href="users_list.html";
        // window.location.reload();
    };

    $scope.submit = function(){
        if ($scope.user.job_no==""||$scope.user.job_no==undefined||$scope.user.job_no==null){
            dhx_alert("enter user job_no！")
        }else if($scope.user.name==""||$scope.user.name==undefined||$scope.user.name==null){
            dhx_alert("enter user name！")
        }else if($scope.user.mobile==""||$scope.user.mobile==undefined||$scope.user.mobile==null){
            dhx_alert("enter user mobile！")
        }else if($scope.user.emial==""||$scope.user.email==undefined||$scope.user.email==null){
            dhx_alert("enter user email！")
        }else if($scope.user.psw==""||$scope.user.psw==undefined||$scope.user.psw==null){
            dhx_alert("enter inital password！")
        }else if($scope.user.group==""||$scope.user.group==undefined||$scope.user.group==null){
            dhx_alert("select user group！")
        }else{
            $http({
                method:'post',
                url:basePath+"api/v1.0/user/register",
                params:{
                    "job_no":$scope.user.job_no,
                    "password":$scope.user.psw,
                    "name":$scope.user.name,
                    "email":$scope.user.email,
                    "scope":"normal",
                    "group":$scope.user.group.value,
                    "mobile":$scope.user.mobile,
                }
            }).success(function(res){
                if(res.response.success==1){
                    dhx_alert("user add succeed!",function(){
                        window.location.href="login.html"
                    })
                }else{
                    dhx_alert(res.response.return_code)
                }
            })
        }
    }

});
