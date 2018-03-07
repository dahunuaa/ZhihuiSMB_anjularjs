/**
 * Created by Administrator on 2016/12/30 0030.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {
    init()
    function init() {
        $scope.user = {}
    }

    $scope.to_login = function () {
        if ($scope.user.name == undefined || $scope.user.name == "") {
            dhx_alert("请输入账号")
        }
        else if($scope.user.password == undefined || $scope.user.password==""){
            dhx_alert("请输入密码")
        }else {
            $http({
                method:'post',
                url:basePath+"api/v1.0/user/login",
                params:{
                    "job_no":$scope.user.name,
                    "password":$scope.user.password
                }
            }).success(function(res){
                if(res.response.success ==1){
                    // if(res.response.data.scope!=""){
                        setCookie("token",res.response.data.token);
                        localStorage.setItem("token",res.response.data.token);
                        localStorage.setItem("user_id",res.response.data._id);
                        localStorage.setItem("mobile",res.response.data.mobile);
                        localStorage.setItem("name",res.response.data.name);
                        localStorage.setItem("job_no",res.response.data.job_no);
                        localStorage.setItem("scope",res.response.data.scope);
                        setCookie("user_id",res.response.data._id);
                        window.location.href = "index.html";
                    // }else{
                    //     dhx_alert("您无权限登录！")
                    // }

                }else{
                    dhx_alert(res.response.return_code )
                }
            })
        }

    }
});