/**
 * Created by Administrator on 2017/1/2.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){
    if(localStorage.getItem("job_no")=="admin"){
        $scope.user_type={
            area01:{value:"normal",text:"normal",selected:1},
            area02:{value:"backend",text:"backend"},
            area03:{value:"admin",text:"admin"}
        };
    }else{
        $scope.user_type={
            area01:{value:"normal",text:"normal",selected:1},
            area02:{value:"backend",text:"backend"}
        };
    }

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
        }else if($scope.user.psw==""||$scope.user.psw==undefined||$scope.user.psw==null){
            dhx_alert("enter inital password！")
        }else if($scope.user.type==""||$scope.user.type==undefined||$scope.user.type==null){
            dhx_alert("select user scope！")
        }else{
            $http({
                method:'post',
                url:basePath+"api/v1.0/user/register",
                params:{
                    "job_no":$scope.user.job_no,
                    "password":$scope.user.psw,
                    "name":$scope.user.name,
                    "scope":$scope.user.type.value,
                    "mobile":$scope.user.mobile,
                }
            }).success(function(res){
                if(res.response.success==1){
                    dhx_alert("user add succeed!",function(){
                        window.location.reload()
                    })
                }else{
                    dhx_alert(res.response.return_code)
                }
            })
        }
    }

    $scope.back=function(){
        window.location.href="users_list.html"
    }
});
