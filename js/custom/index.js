/**
 * Created by Administrator on 2016/12/30 0030.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl', function($scope,$http){
    var url =window.location.href;
    if(url.split('?').length==2){

    }else {
        init();
        var myTabbar;

        var mySidebar_1;
        var mySidebar_2;
        var mySidebar_3;
        var mySidebar_4;
        var mySidebar_5;



        function init() {
            // $scope.name="admin"
            $scope.name = localStorage.getItem("name");
            if (localStorage.getItem("token") == "undefined" || localStorage.getItem("token") == "" || localStorage.getItem("token") == null) {
                window.location.href = "../../../../mui workspace/miniui/login.html"
            } else {
                create();
            }

            function create() {
                //声明导航栏
                if(localStorage.getItem("scope")=="admin"){
                    myTabbar = new dhtmlXTabBar({
                        parent: "tabbarObj",
                        tabs: [
                            {id: "placeholder", text: '', active:1 ,width: 160},
                            {id: "faqs", text: "FAQs", active:1 ,width: 160},
                            {id: "infor_share", text: "informations-share",width: 180},
                            {id: "report_download", text: "download", width: 160},
                            {id: "self_setting", text: "self_setting", width: 160},
                            {id: "admin", text: "user management", width: 160}
                        ]
                    });

                    var mySidebar_6;

                    mySidebar_6 = myTabbar.tabs("admin").attachSidebar({
                        width: 200,
                        icons_path: "icons/icons_material/",
                        json: "admin/admin.json",
                        onload: function () {
                            mySidebar_6.cells("users_list").attachURL("admin/users_list.html");
                        }
                    });
                    mySidebar_6.attachEvent("onSelect",function(id){
                        if(id =="add_user"){
                            mySidebar_6.cells("add_user").attachURL("admin/add_user.html");
                        }
                    });
                }else{
                    myTabbar = new dhtmlXTabBar({
                        parent: "tabbarObj",
                        tabs: [
                            {id: "placeholder", text: '', active:1 ,width: 160},
                            {id: "faqs", text: "FAQs", active:1 ,width: 160},
                            {id: "infor_share", text: "informations-share",width: 180},
                            {id: "report_download", text: "download", width: 160},
                            {id: "self_setting", text: "self_setting", width: 160},
                        ]
                    });
                }

                //导航栏的分区

                mySidebar_5 = myTabbar.tabs("placeholder").attachSidebar({
                    width: 200,
                    icons_path: "icons/icons_material/",
                    json: "faqs/faq.json",
                    onload: function () {
                        mySidebar_5.cells("add_faq").attachURL("faqs/add_faq.html");
                    }
                });

                mySidebar_1 = myTabbar.tabs("faqs").attachSidebar({
                    width: 200,
                    icons_path: "icons/icons_material/",
                    json: "faqs/faq.json",
                    onload: function () {
                        mySidebar_1.cells("faq_list").attachURL("faqs/faq_list.html");
                    }
                });
                mySidebar_1.attachEvent("onSelect",function(id){
                    if(id=="add_faq"){
                        mySidebar_1.cells("add_faq").attachURL("faqs/add_faq.html");
                    }else if(id =="like"){
                        mySidebar_1.cells("like").attachURL("faqs/like.html");
                    }
                })

                mySidebar_2 = myTabbar.tabs("infor_share").attachSidebar({
                    width: 200,
                    icons_path: "icons/icons_material/",
                    json: "infor_share/infor_share.json",
                    onload: function () {
                        mySidebar_2.cells("infor_share_list").attachURL("infor_share/infor_share_list.html");
                    }
                });
                mySidebar_2.attachEvent("onSelect",function(id){
                    if(id=="add_infor_share"){
                        mySidebar_2.cells("add_infor_share").attachURL("infor_share/add_infor_share.html");
                    }else if (id == "like"){
                        mySidebar_2.cells("like").attachURL("infor_share/like.html");
                    }
                })


                // mySidebar_2 = myTabbar.tabs("notice").attachSidebar({
                //     width: 200,
                //     icons_path: "icons/icons_material/",
                //     json: "notice/notice.json",
                //     onload: function () {
                //         mySidebar_2.cells("add_notice").attachURL("notice/add_notice.html");
                //     }
                // });

                mySidebar_3 = myTabbar.tabs("report_download").attachSidebar({
                    width: 200,
                    icons_path: "icons/icons_material/",
                    json: "report/report.json",
                    onload: function () {
                        mySidebar_3.cells("report_download").attachURL("report/report_download.html");
                    }
                });
                mySidebar_3.attachEvent("onSelect",function(id){
                    if(id =="images_files_download"){
                        mySidebar_3.cells("images_files_download").attachURL("report/images_files_download.html");
                    }

                });

                mySidebar_4 = myTabbar.tabs("self_setting").attachSidebar({
                    width: 200,
                    icons_path: "icons/icons_material/",
                    json: "self_setting/self_setting.json",
                    onload: function () {
                        mySidebar_4.cells("changepsw").attachURL("self_setting/changepsw.html");
                    }
                });
                mySidebar_4.attachEvent("onSelect",function(id){
                    if(id =="feedback"){
                        mySidebar_4.cells("feedback").attachURL("self_setting/add_feedback.html");
                    }else if(id=="self_infor"){
                        mySidebar_4.cells("self_infor").attachURL("self_setting/self_infor.html");
                    }

                });

            }
        }
    }
    $scope.login_out = function(){
        setCookie("token","");
        window.location.href="login.html"
    }

})