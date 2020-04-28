$(document).ready(function(){
    $.ajax({
        type: "get",
        dataType: "Json",
        url: "https://www.kkknet.cn/alluser",
        success: function(data){
            console.log(data);
            console.log(data.length);
            jsonData = getJsonData(data.length,data);
            pageTo(10,1);
        } 
    })
})
var jsonData = [];
        function getJsonData(size,result) {
            var datas = [];
            for (var idx = 0; idx < size; idx++) {
                datas.push({
                    nickname : result[idx].nickname,　　//定义想要展示的内容及其他
                    userImg : result[idx].userImg,
                    phone:result[idx].phone
                });
            }
            return datas;
        }
        //获取当前页数据
        function query(cur, size) {
            var begin = (cur - 1) * size;
            var end = cur * size;
            return jsonData.slice(begin, end);
        }

        //分页函数开始
        function pageTo(pageSize, curPage) {
            var dataSize = jsonData.length;
            //判断当前页数
            if (dataSize == 0) {
                userDiv.innerHTML = "<span class='no-content'>没有查询到任何数据！</span>";
                return;
            }
            var totalPage = Math.ceil(dataSize / pageSize);
            // html推送内容
            var datas = query(curPage, pageSize);
            var list = "";
            for (var index = 0; index < datas.length; index++) {
                var num=Math.floor(Math.random()*(5-1)+1);
                var data = datas[index];
                list+= '<div id="userList">\n'+
                '<div class="userContent uoa">\n'+
                '<img class="userImg" alt="头像" src="'+data.userImg+'">\n'+
                '</div>\n'+
                '<div class="userContent">'+data.nickname+'</div>\n'+
                '<div class="userContent" id="userid">'+data.phone+'</div>\n'+
                '<div class="userContent uoa" id="msgNum">'+num+'</div>\n'+
                '<div class="userContent"><a href="#" id="deleteUser">'+"删除"+'</a></div>\n'+
            '</div>\n';
            }
            userDiv.innerHTML = list;
            //pager
            var phtml = "<div class='pager'>";
            if (curPage == 1) {
                phtml = phtml + "<a href='#' class='button no-page'>上一页</a>";
            }
            else {
                phtml = phtml + "<a href='#' class='button' onclick='pageTo("+pageSize+","+(curPage-1)+")'>上一页</a>";
            }
            phtml = phtml + "<input class='toPage' type='text' onkeyup=\"value=value.replace(/[^0-9]/g,\'\')\" value='" + curPage + "' onkeypress='goto(this, " + pageSize+");'>";
            if (curPage == totalPage) {
                phtml = phtml + "<a href='#' class='button no-page'>下一页</a>";
            } 
            else {
                phtml = phtml + "<a href='#' class='button' onclick='pageTo("+pageSize+","+(curPage+1)+")'>下一页</a>";
            }
            phtml = phtml + "&nbsp;共" + totalPage + "页," + dataSize + "条记录</div>";
            pager.innerHTML = phtml;
        }
        //回车跳转，注意控制输入数字
        function goto(obj, pageSize){
            if(event.keyCode == 13){
                pageTo(pageSize, parseInt(obj.value));
            }
        }

$("#searchUser").click(function(){
    $.ajax({
        type: 'post',
        url: "https://www.kkknet.cn/searchuser",
        data:{
            userid:$("#search").val()
        },
        dataType: "Json",
        success: function(data){
            $("#userDiv").html('');
            $("#pager").css("display","none");
            var list='';
            var datas=data[0];
            var num=Math.floor(Math.random()*(5-1)+1);
            list= '<div id="userList">\n'+
                '<div class="userContent uoa">\n'+
                '<img class="userImg" alt="头像" src="'+datas.userImg+'">\n'+
                '</div>\n'+
                '<div class="userContent">'+datas.nickname+'</div>\n'+
                '<div class="userContent" id="userid">'+datas.phone+'</div>\n'+
                '<div class="userContent uoa">'+num+'</div>\n'+
                '<div class="userContent"><a href="#" id="deleteUser">'+"删除"+'</a></div>\n'+
            '</div>\n';
            $("#userDiv").html(list);
           console.log(data);
        }
      })
})

$("#userDiv").on("click","a",function(){
    console.log('0');
    console.log($(this).parent().siblings("#userid").html());
    var userId=$(this).parent().siblings("#userid").html();
    var isDelete=confirm('确定删除'+userId+'文化吗？')
    if (isDelete==true){
        $.ajax({
            type: 'post',
            url: "https://www.kkknet.cn/deleteUser",
            data:{
                userid:userId
            },
            dataType: "Json",
            success: function(data){
              alert(data.data)
            }
          })
    }else{
        return false;
    }
});