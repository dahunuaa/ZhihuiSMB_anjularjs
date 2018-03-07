/**
 * Created by Administrator on 2017/4/27.
 */
var app=angular.module('myApp',[])
app.controller('myCtrl',function($scope,$http){
    $scope.images_submit = function(){
        if(localStorage.getItem("scope")!="admin"){
            dhx_alert("no permission！")
        }else{
            window.location.href=basePath+"api/v1.0/file/download/images?access_token="+localStorage.getItem("token")
        }
    }
    $scope.files_submit = function(){
        if(localStorage.getItem("scope")!="admin"){
            dhx_alert("no permission！")
        }else{
            window.location.href=basePath+"api/v1.0/file/download/files?access_token="+localStorage.getItem("token")
        }
    }
})
