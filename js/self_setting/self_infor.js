/**
 * Created by Administrator on 2017/1/3 0003.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){
    init();

    function init(){
        $scope.user_name = localStorage.getItem("name");
        $scope.user_mobile = localStorage.getItem("mobile");
        $scope.user_job_no = localStorage.getItem("job_no");
        $scope.user_email = localStorage.getItem("email");
        $scope.user_group = localStorage.getItem("group");
        $scope.user_scope = localStorage.getItem("scope");

    }
});