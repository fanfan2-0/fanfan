// $("#newAdd").click{
//     window.location.href('')
// }
var obj = document.getElementById('newAdd');
obj.onclick=function(){ 
  window.location.href="./add.html"  ;rel="external nofollow" ;      
} 
$(document).ready(function(){
  $.ajax({
      type: "get",
      dataType: "Json",
      url: "https://www.kkknet.cn/culture",
      success: function(data){
          console.log(data);
          console.log(data.length);
          jsonData = getJsonData1(data.length,data);
          pageTo1(5,1);
      } 
  })
})
var jsonData = [];
      function getJsonData1(size,result) {
          var datas = [];
          for (var idx = 0; idx < size; idx++) {
              datas.push({
                  culTitle : result[idx].culTitle,　　//定义想要展示的内容及其他
                  culCon : result[idx].culCon,
                  culImg:result[idx].culImg
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
      function pageTo1(pageSize, curPage) {
          var dataSize = jsonData.length;
          //判断当前页数
          if (dataSize == 0) {
            cultureDiv.innerHTML = "<span class='no-content'>没有查询到任何数据！</span>";
              return;
          }
          var totalPage = Math.ceil(dataSize / pageSize);
          // html推送内容
          var datas = query(curPage, pageSize);
          var list = "";
          for (var index = 0; index < datas.length; index++) {
              var data = datas[index];
              var index2=index+1
              list+= '<div id="cultureList">\n'+
              '<div class="cultureContent ">'+index2+'</div>\n'+
              '<div class="cultureContent uoa" id="culTitle">'+data.culTitle+'</div>\n'+
              '<div class="cultureContent">\n'+
              '<img class="cultureImg" alt="头像" src="'+data.culImg+'">\n'+
              '</div>\n'+
              '<div class="cultureContent uob" title="'+data.culCon+'">'+data.culCon+'</div>\n'+
              '<div class="cultureContent" ><a href="#" id="deleteCul">'+"删除"+'</a></div>\n'+
          '</div>\n';
          }
          cultureDiv.innerHTML = list;
          //pager
          var phtml = "<div class='pager'>";
          if (curPage == 1) {
              phtml = phtml + "<a href='#' class='button no-page'>上一页</a>";
          }
          else {
              phtml = phtml + "<a href='#' class='button' onclick='pageTo1("+pageSize+","+(curPage-1)+")'>上一页</a>";
          }
          phtml = phtml + "<input class='toPage' type='text' onkeyup=\"value=value.replace(/[^0-3]/g,\'\')\" value='" + curPage + "' onkeypress='goto(this, " + pageSize+");'>";
          if (curPage == totalPage) {
              phtml = phtml + "<a href='#' class='button no-page'>下一页</a>";
          } 
          else {
              phtml = phtml + "<a href='#' class='button' onclick='pageTo1("+pageSize+","+(curPage+1)+")'>下一页</a>";
          }
          phtml = phtml + "&nbsp;共" + totalPage + "页," + dataSize + "条记录</div>";
          pager.innerHTML = phtml;
      }
      //回车跳转，注意控制输入数字
      function goto(obj, pageSize){
          if(event.keyCode == 13){
              pageTo1(pageSize, parseInt(obj.value));
          }
      }
    $("#cultureDiv").on("click","a",function(){
        console.log('0');
        console.log($(this).parent().siblings("#culTitle").html());
        var title=$(this).parent().siblings("#culTitle").html();
        var isDelete=confirm('确定删除'+title+'文化吗？')
        if (isDelete==true){
            $.ajax({
                type: 'post',
                url: "https://www.kkknet.cn/deleteCulture",
                data:{
                    title:$(this).parent().siblings("#culTitle").html()
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