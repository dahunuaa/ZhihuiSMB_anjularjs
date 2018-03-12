/**
 * Created by Administrator on 2017/1/2.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){

    $scope.guide_type = {
        type011 : {value: "machine design",text: "machine design"},
        type012 : {value: "machine assembly", text: "machine assembly"},
        type013 : {value: "project", text: "project"},
        type021 : {value: "creo", text: "creo"},
        type022 : {value: "sap&windchill", text: "sap&windchill"},
        type023 : {value: "others", text: "others"},

    };


    $scope.inforshare = {};

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
        if ($scope.inforshare.title==""||$scope.inforshare.title==undefined||$scope.inforshare.title==null){
            dhx_alert("enter title！")
        }else if($scope.inforshare.type.text==""||$scope.inforshare.type.text==undefined||$scope.inforshare.type.text==null){
            dhx_alert("select category！")
        }else if($scope.inforshare.text==""||$scope.inforshare.text==undefined||$scope.inforshare.text==null){
            dhx_alert("enter content！")
        }else{
            var  file = document.getElementById("file_upload").files[0];
            var formData = new FormData($("#uploadForm")[0]);
            formData.append("access_token",localStorage.getItem("token"))
            if(file!=""&&file!=undefined){
                $.ajax({
                    type:'post',
                    url:basePath+"api/v1.0/file/upload",
                    data:formData,
                    async: false,
                    contentType:false,
                    processData:false,
                    dataType:"json",
                    success:function(res){
                        dhx_alert("111")
                        window.filepath = res.response.data.file_path
                        window.filename = res.response.data.file_name
                        window.filesize = res.response.data.file_size
                    },
                    error:function(data){
                        plus.nativeUI.toast("upload failed！");
                    }
                })
            }

            $.ajax({
                type: "post",
                url: basePath+"api/v1.0/inforshare",
                data:{
                    "access_token":localStorage.getItem("token"),
                    "infor_title":$scope.inforshare.title,
                    "infor_type":$scope.inforshare.type.text,
                    "infor_text":$scope.inforshare.text,
                    "filename":window.filename,
                    "filepath":window.filepath,
                    "filesize":window.filesize,
                    "images_list":JSON.stringify($scope.images)
                },
                async: false,
                dataType:"json",//如果返回的是str，那么这个地方必须用text，用json报错
                success: function(data) {
                    if (data.response.success=="1")
                    {
                        dhx_alert("share succeed!",function(){
                            window.location.reload()
                            })
                    }else{
                        dhx_alert(res.response.return_code)
                    }
                }
            });

            // $http({
            //     method:'post',
            //     url:basePath+"api/v1.0/inforshare",
            //     params:{
            //         "access_token":localStorage.getItem("token"),
            //         "infor_title":$scope.inforshare.title,
            //         "infor_type":$scope.inforshare.type.text,
            //         "infor_text":$scope.inforshare.text,
            //         "filename":window.filename,
            //         "filepath":window.filepath,
            //         "filesize":window.filesize,
            //         "images_list":JSON.stringify($scope.images)
            //     }
            // }).success(function(res){
            //     if(res.response.success==1){
            //         dhx_alert(res.response.data)
            //         dhx_alert("share succeed!",function(){
            //             window.location.reload()
            //         })
            //     }else{
            //         dhx_alert(res.response.return_code)
            //     }
            // })
        }
    }
    $scope.back=function(){
        window.location.href="infor_share_list.html"
    }
});
